// Script to set up Supabase database tables
import { supabase } from "./supabase";

async function setupSupabaseDatabase() {
  console.log("Setting up Supabase database...");
  
  try {
    // Create the projects table using SQL
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT,
        image_url TEXT,
        live_url TEXT,
        details_url TEXT,
        technologies TEXT[] NOT NULL,
        featured BOOLEAN DEFAULT false,
        sort_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      
      -- Enable RLS (Row Level Security)
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
      
      -- Create a policy to allow public read access
      CREATE POLICY "Public read access for projects" 
      ON projects FOR SELECT 
      USING (true);
      
      -- Create a policy to allow authenticated users to insert/update
      CREATE POLICY "Authenticated users can modify projects" 
      ON projects FOR ALL 
      USING (auth.role() = 'authenticated');
    `;
    
    // Use the SQL endpoint to create the table
    const response = await fetch(`${process.env.SUPABASE_ENDPOINT}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SECRET_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY!}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql: createTableSQL })
    });

    if (!response.ok) {
      console.log("SQL endpoint not available, table may need to be created manually in Supabase dashboard");
      console.log("Table SQL:", createTableSQL);
    } else {
      console.log("✅ Database table created successfully!");
    }

    // Try to seed some sample data
    await seedProjects();
    
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    console.log("\n📝 Manual setup required:");
    console.log("1. Go to your Supabase dashboard");
    console.log("2. Open SQL Editor");
    console.log("3. Run this SQL to create the projects table:\n");
    
    const manualSQL = `
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  live_url TEXT,
  details_url TEXT,
  technologies TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Public read access for projects" 
ON projects FOR SELECT 
USING (true);

-- Create a policy to allow authenticated users to insert/update  
CREATE POLICY "Authenticated users can modify projects" 
ON projects FOR ALL 
USING (auth.role() = 'authenticated');
    `;
    
    console.log(manualSQL);
  }
}

async function seedProjects() {
  console.log("Seeding sample projects...");
  
  const sampleProjects = [
    {
      title: "Creative Portfolio Redesign",
      description: "Complete visual identity and website redesign for a creative agency",
      long_description: "Led the comprehensive redesign of a creative agency's brand identity and digital presence. This project involved extensive user research, competitive analysis, and iterative design processes to create a modern, engaging experience that better reflects the agency's creative capabilities and attracts their ideal clients.",
      image_url: "/api/placeholder/600/400",
      live_url: "https://example.com/portfolio",
      details_url: "https://behance.net/project1",
      technologies: ["Figma", "Adobe Creative Suite", "Webflow", "Brand Strategy"],
      featured: true,
      sort_order: 1,
      status: "active"
    },
    {
      title: "E-commerce Mobile Experience", 
      description: "Mobile-first shopping experience with seamless checkout flow",
      long_description: "Designed and optimized a mobile shopping experience that increased conversion rates by 40%. The project focused on streamlining the user journey, implementing intuitive navigation patterns, and creating a frictionless checkout process. Conducted extensive user testing to validate design decisions and ensure accessibility across all user groups.",
      image_url: "/api/placeholder/600/400",
      live_url: null,
      details_url: "https://dribbble.com/shots/project2", 
      technologies: ["UI/UX Design", "Prototyping", "User Testing", "Mobile Design"],
      featured: true,
      sort_order: 2,
      status: "active"
    },
    {
      title: "SaaS Dashboard Design",
      description: "Data visualization platform for business analytics and insights",
      long_description: "Created an intuitive dashboard interface for a B2B analytics platform, focusing on data visualization and user workflow optimization. The design system includes comprehensive component libraries, interactive prototypes, and detailed documentation for the development team. The final product improved user engagement and reduced support tickets by 35%.",
      image_url: "/api/placeholder/600/400", 
      live_url: "https://example.com/dashboard",
      details_url: null,
      technologies: ["Data Visualization", "Dashboard Design", "Design Systems", "B2B UX"],
      featured: false,
      sort_order: 3,
      status: "active"
    },
    {
      title: "Brand Identity System",
      description: "Complete brand development for emerging fintech startup",
      long_description: "Developed a comprehensive brand identity system for a fintech startup, including logo design, color palettes, typography, and brand guidelines. The brand needed to convey trust, innovation, and accessibility while standing out in a competitive market. Delivered a complete brand book and digital asset library for consistent implementation across all touchpoints.",
      image_url: "/api/placeholder/600/400",
      live_url: null,
      details_url: "https://behance.net/project4",
      technologies: ["Brand Design", "Logo Design", "Typography", "Brand Guidelines"],
      featured: false,
      sort_order: 4,
      status: "active"
    }
  ];

  try {
    // Check if projects already exist
    const existingProjects = await supabase.get('projects', { 'limit': '1' });
    if (existingProjects.length > 0) {
      console.log("✅ Projects already exist in database, skipping seeding");
      return;
    }

    for (const project of sampleProjects) {
      await supabase.post('projects', project);
      console.log(`✅ Created project: ${project.title}`);
    }
    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    console.log("Details:", error);
  }
}

// Run the setup
setupSupabaseDatabase().then(() => {
  console.log("Setup complete!");
  process.exit(0);
}).catch((error) => {
  console.error("Setup failed:", error);
  process.exit(1);
});