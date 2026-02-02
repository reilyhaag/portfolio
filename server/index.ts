import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isDev = process.env.NODE_ENV === "development";

// Security middleware
app.use(helmet({
  contentSecurityPolicy: isDev ? false : undefined, // Disable CSP in dev for Vite HMR
}));

app.use(cors({
  origin: isDev ? true : process.env.ALLOWED_ORIGINS?.split(',') || true,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Body parsing with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Simple logging function
function log(message: string) {
  console.log(`[express] ${message}`);
}

// Serve static files in production
function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "../dist/public");
  app.use(express.static(distPath));
  
  // Catch-all handler for SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize the app
let server: any;
let isInitialized = false;

async function initializeApp() {
  if (isInitialized) return;
  
  try {
    server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = isDev ? err.message : "Internal Server Error";

      console.error("[express] Error:", err);
      res.status(status).json({ message });
    });

    // Use Vite in development, static serving in production
    if (isDev) {
      const { setupVite } = await import("./vite");
      await setupVite(app, server);
      log("Vite dev server configured");
    } else {
      serveStatic(app);
    }

    isInitialized = true;
  } catch (error) {
    console.error("Failed to initialize app:", error);
    throw error;
  }
}

// For Vercel, initialize immediately
if (process.env.VERCEL) {
  initializeApp().catch(console.error);
} else {
  // Local development - start the server
  (async () => {
    await initializeApp();
    const port = parseInt(process.env.PORT || '5000', 10);
    server.listen({
      port,
      host: "0.0.0.0",
    }, () => {
      log(`serving on port ${port}`);
    });
  })();
}

// Export the app for Vercel
export default app;
