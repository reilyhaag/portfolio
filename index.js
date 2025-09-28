// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";

// server/supabase.ts
var SupabaseClient = class {
  baseUrl;
  headers;
  constructor(endpoint, apiKey) {
    this.baseUrl = `${endpoint}/rest/v1`;
    this.headers = {
      "apikey": apiKey,
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    };
  }
  async get(table, filters = {}) {
    const url = new URL(`${this.baseUrl}/${table}`);
    Object.entries(filters).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers
    });
    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  async post(table, data) {
    const response = await fetch(`${this.baseUrl}/${table}`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result[0] : result;
  }
  async patch(table, id, data) {
    const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result[0] : result;
  }
  async delete(table, id) {
    const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: this.headers
    });
    return response.ok;
  }
};
var supabaseEndpoint = process.env.SUPABASE_ENDPOINT;
var supabaseKey = process.env.SUPABASE_SECRET_KEY;
if (!supabaseEndpoint || !supabaseKey) {
  throw new Error("SUPABASE_ENDPOINT and SUPABASE_SECRET_KEY are required");
}
var supabase = new SupabaseClient(supabaseEndpoint, supabaseKey);

// server/storage.ts
function mapProjectFromDB(dbProject) {
  return {
    id: dbProject.id,
    title: dbProject.title,
    description: dbProject.description,
    longDescription: dbProject.long_description,
    imageUrl: dbProject.image_url,
    technologies: dbProject.technologies,
    featured: dbProject.featured,
    showLinks: dbProject.show_links,
    liveUrl: dbProject.live_url,
    detailsUrl: dbProject.details_url,
    status: dbProject.status,
    sortOrder: dbProject.sort_order,
    createdAt: dbProject.created_at,
    updatedAt: dbProject.updated_at
  };
}
var MemStorage = class {
  users;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Supabase REST API project methods
  async getProjects() {
    const result = await supabase.get("projects", {
      "status": "eq.active",
      "order": "sort_order.asc,created_at.desc"
    });
    return result.map(mapProjectFromDB);
  }
  async getFeaturedProjects() {
    const result = await supabase.get("projects", {
      "featured": "eq.true",
      "status": "eq.active",
      "order": "sort_order.asc,created_at.desc"
    });
    return result.map(mapProjectFromDB);
  }
  async getProject(id) {
    const result = await supabase.get("projects", {
      "id": `eq.${id}`,
      "limit": "1"
    });
    return result[0] ? mapProjectFromDB(result[0]) : void 0;
  }
  async createProject(insertProject) {
    const result = await supabase.post("projects", {
      ...insertProject,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    return result;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching projects"
      });
    }
  });
  app2.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching featured projects"
      });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching project"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "../public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
