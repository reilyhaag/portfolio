import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardAnimation = useInViewAnimation<HTMLDivElement>({ 
    delay: index * 100 
  });

  return (
    <Card 
      ref={cardAnimation.elementRef}
      className="hover-elevate hover-lift h-full transition-all-smooth reveal"
      data-revealed={cardAnimation.isInView}
      data-testid={`project-${project.id}`}
    >
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
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {(project.showLinks !== false) && project.liveUrl && (
            <Button
              variant="default"
              size="default"
              className="flex-1 min-h-[44px] focus-visible-ring"
              asChild
              data-testid={`demo-${project.id}`}
            >
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`View ${project.title} project`}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Project
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const headerAnimation = useInViewAnimation<HTMLHeadingElement>();
  
  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  if (isLoading) {
    return (
      <section id="work" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-medium text-foreground mb-6">
              Selected Work
            </h2>
          </div>
          <div className="text-center py-20">
            <div className="animate-pulse text-muted-foreground">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="work" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-medium text-foreground mb-6">
              Selected Work
            </h2>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">Error loading projects</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 
            ref={headerAnimation.elementRef}
            className="text-4xl font-medium text-foreground mb-6 reveal"
            data-revealed={headerAnimation.isInView}
          >
            Selected Work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="min-h-[44px]"
            asChild
            data-testid="view-all-projects"
          >
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}