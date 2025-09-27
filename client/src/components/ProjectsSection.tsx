import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "A comprehensive admin dashboard for managing online store operations with real-time analytics, inventory management, and order processing capabilities.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with drag-and-drop kanban boards, team collaboration features, and deadline tracking.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Forecast App",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and customizable alerts for weather conditions.",
      technologies: ["React Native", "Redux", "OpenWeather API", "Maps"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics platform for social media managers to track engagement, audience insights, and content performance across platforms.",
      technologies: ["Vue.js", "D3.js", "Express", "MongoDB", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const handleLiveDemo = (projectId: number) => {
    console.log(`Opening live demo for project ${projectId}`);
  };

  const handleGithub = (projectId: number) => {
    console.log(`Opening GitHub repo for project ${projectId}`);
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-medium text-foreground mb-6">Selected Work</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`hover-elevate hover-lift h-full transition-all-smooth animate-fade-in-up animate-delay-${(index + 1) * 100}`} 
              data-testid={`project-${project.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Badge variant="secondary" className="text-xs mb-3 animate-scale-in">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className={`text-xs animate-fade-in animate-delay-${(techIndex + 1) * 100}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 transition-all-smooth hover-lift focus-visible-ring"
                    onClick={() => handleLiveDemo(project.id)}
                    data-testid={`demo-${project.id}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 transition-all-smooth hover-lift focus-visible-ring"
                    onClick={() => handleGithub(project.id)}
                    data-testid={`github-${project.id}`}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => console.log("View all projects clicked")}
            data-testid="view-all-projects"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}