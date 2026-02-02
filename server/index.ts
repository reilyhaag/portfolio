import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isDev = process.env.NODE_ENV === "development";

function log(message: string) {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${time} [express] ${message}`);
}

// Serve static files in production
function serveStatic() {
  const distPath = path.resolve(__dirname, "../dist/public");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

async function startServer() {
  const server = createServer(app);

  if (isDev) {
    // In development, use Vite
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
    log("Vite dev server configured");
  } else {
    // In production, serve static files
    serveStatic();
  }

  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
}

startServer().catch(console.error);

// Export for Vercel serverless
export default app;
