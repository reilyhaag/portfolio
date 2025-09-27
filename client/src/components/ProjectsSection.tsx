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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects I've worked on, showcasing different technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="hover-elevate h-full" data-testid={`project-${project.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Badge variant="secondary" className="text-xs mb-3">
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
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleLiveDemo(project.id)}
                    data-testid={`demo-${project.id}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
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