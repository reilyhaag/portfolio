import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertProjectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Log the submission (in a real app, you'd send an email here)
      console.log("New contact form submission:", {
        id: contactMessage.id,
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon.",
        id: contactMessage.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Please check your input",
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Something went wrong. Please try again later."
        });
      }
    }
  });

  // Contact messages retrieval - disabled for security (unauthenticated access to sensitive data)
  // Enable only when proper admin authentication is implemented
  // app.get("/api/contact", async (req, res) => {
  //   try {
  //     const messages = await storage.getContactMessages();
  //     res.json(messages);
  //   } catch (error) {
  //     console.error("Error fetching contact messages:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Error fetching messages"
  //     });
  //   }
  // });

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
