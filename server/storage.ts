import { type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { randomUUID } from "crypto";
import { supabase } from "./supabase";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }


  // Supabase REST API project methods
  async getProjects(): Promise<Project[]> {
    const result = await supabase.get('projects', {
      'status': 'eq.active',
      'order': 'sort_order.asc,created_at.desc'
    });
    return result;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const result = await supabase.get('projects', {
      'featured': 'eq.true',
      'status': 'eq.active', 
      'order': 'sort_order.asc,created_at.desc'
    });
    return result;
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await supabase.get('projects', {
      'id': `eq.${id}`,
      'limit': '1'
    });
    return result[0];
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const result = await supabase.post('projects', {
      ...insertProject,
      updated_at: new Date().toISOString()
    });
    return result;
  }
}

export const storage = new MemStorage();
