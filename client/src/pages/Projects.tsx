import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { useInViewAnimation, getAnimationClasses } from "@/hooks/useInViewAnimation";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardAnimation = useInViewAnimation<HTMLDivElement>({ 
    delay: index * 200 
  });

  return (
    <Card 
      ref={cardAnimation.elementRef}
      className={getAnimationClasses(
        cardAnimation.isInView,
        'fade-in-up',
        'hover-elevate hover-lift h-full transition-all-smooth'
      )} 
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

export default function Projects() {
  const headerAnimation = useInViewAnimation<HTMLHeadingElement>({ delay: 100 });
  const backButtonAnimation = useInViewAnimation<HTMLDivElement>({ delay: 300 });

  // Ensure page loads at top position
  useEffect(() => {
    // Prevent scroll restoration and ensure page starts at top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-muted-foreground">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading projects</div>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
        <div 
          ref={backButtonAnimation.elementRef}
          className={getAnimationClasses(
            backButtonAnimation.isInView,
            'fade-in-up',
            'mb-8'
          )}
        >
          <Button variant="ghost" asChild data-testid="back-to-home">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-20">
          <h1 
            ref={headerAnimation.elementRef}
            className={getAnimationClasses(
              headerAnimation.isInView,
              'fade-in-up',
              'text-5xl font-medium text-foreground mb-8'
            )}
          >
            All Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive collection of my creative work, spanning brand identity, 
            user experience design, creative facilitation, and storytelling projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              index={index}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No projects found.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}