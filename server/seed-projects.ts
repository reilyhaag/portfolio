#!/usr/bin/env tsx

import { db } from "./db";
import { projects } from "@shared/schema";
import type { InsertProject } from "@shared/schema";

const projectData: InsertProject[] = [
  {
    title: "Brand Identity System",
    description: "Complete visual identity redesign for a sustainable fashion startup, including logo design, color palette, typography, and brand guidelines.",
    technologies: ["Brand Strategy", "Visual Design", "Identity Systems"],
    featured: true,
    liveUrl: "https://example-brand.com",
    detailsUrl: "https://github.com/alexjohnson/brand-project",
    status: "active",
    sortOrder: 1,
  },
  {
    title: "Digital Experience Platform",
    description: "User experience design and strategy for a fintech application focused on simplifying personal finance management.",
    technologies: ["UX Research", "Interaction Design", "Prototyping"],
    featured: true,
    liveUrl: "https://fintech-demo.com",
    detailsUrl: "https://github.com/alexjohnson/fintech-ux",
    status: "active",
    sortOrder: 2,
  },
  {
    title: "Creative Workshop Series",
    description: "Designed and facilitated a series of creative workshops for design thinking and innovation at a local design studio.",
    technologies: ["Workshop Design", "Facilitation", "Creative Strategy"],
    featured: false,
    liveUrl: "https://workshop-series.com",
    detailsUrl: "https://github.com/alexjohnson/workshop-materials",
    status: "active",
    sortOrder: 3,
  },
  {
    title: "Storytelling Platform",
    description: "Content strategy and visual design for a platform connecting storytellers with their audiences through immersive experiences.",
    technologies: ["Content Strategy", "Visual Storytelling", "User Journey"],
    featured: false,
    liveUrl: "https://storytelling-platform.com",
    detailsUrl: "https://github.com/alexjohnson/storytelling-project",
    status: "active",
    sortOrder: 4,
  },
];

async function seedProjects() {
  try {
    console.log("Starting project seeding...");
    
    // Check if projects already exist
    const existingProjects = await db.select().from(projects);
    if (existingProjects.length > 0) {
      console.log(`Found ${existingProjects.length} existing projects. Skipping seed.`);
      return;
    }

    // Insert all projects
    for (const project of projectData) {
      const result = await db.insert(projects).values({
        ...project,
        updatedAt: new Date(),
      }).returning();
      
      console.log(`✓ Created project: ${result[0].title}`);
    }
    
    console.log("✅ Project seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    process.exit(1);
  }
}

// Run the seed function
seedProjects();