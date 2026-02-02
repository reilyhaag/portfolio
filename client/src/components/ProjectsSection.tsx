import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, RefreshCw } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { memo } from "react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  const cardAnimation = useInViewAnimation<HTMLDivElement>({ 
    delay: 0 
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
});

export function ProjectsSection() {
  
  const { data: projects = [], isLoading, error, refetch } = useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });

  if (isLoading) {
    return (
      <section id="work" className="py-32 px-6" aria-busy="true">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-medium text-foreground mb-6">
              Projects
            </h2>
          </div>
          <div className="text-center py-20" role="status" aria-live="polite">
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
              Projects
            </h2>
          </div>
          <div className="text-center py-20" role="alert" aria-live="assertive">
            <div className="text-destructive mb-4">Unable to load projects.</div>
            <Button 
              variant="outline" 
              onClick={() => refetch()}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-medium text-foreground mb-6">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
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
