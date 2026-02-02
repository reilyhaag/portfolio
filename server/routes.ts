import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import { z } from "zod";

// Validation schemas
const projectIdSchema = z.string().min(1).max(100);

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Projects API endpoints
  app.get("/api/projects", async (req, res) => {
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

  app.get("/api/projects/featured", async (req, res) => {
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

  app.get("/api/projects/:id", async (req, res) => {
    try {
      // Validate project ID
      const idResult = projectIdSchema.safeParse(req.params.id);
      if (!idResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid project ID format"
        });
      }

      const project = await storage.getProject(idResult.data);
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

  // Project creation endpoint - disabled for security (unauthenticated write access)
  // Enable only when proper authentication is implemented
  // app.post("/api/projects", async (req, res) => {
  //   try {
  //     const validatedData = insertProjectSchema.parse(req.body);
  //     const project = await storage.createProject(validatedData);
  //     res.status(201).json(project);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       res.status(400).json({
  //         success: false,
  //         message: "Please check your input",
  //         errors: error.errors.map(e => ({
  //           field: e.path.join('.'),
  //           message: e.message
  //         }))
  //       });
  //     } else {
  //       console.error("Project creation error:", error);
  //       res.status(500).json({
  //         success: false,
  //         message: "Something went wrong creating the project."
  //       });
  //     }
  //   }
  // });

  const httpServer = createServer(app);

  return httpServer;
}
