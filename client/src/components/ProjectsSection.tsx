import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useInViewAnimation, getAnimationClasses } from "@/hooks/useInViewAnimation";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

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
          <Button
            variant="default"
            size="sm"
            className="flex-1 focus-visible-ring"
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
          <Button
            variant="outline"
            size="sm"
            className="flex-1 focus-visible-ring"
            asChild
            data-testid={`github-${project.id}`}
          >
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`View ${project.title} details`}
            >
              <Github className="h-4 w-4 mr-2" />
              Details
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const headerAnimation = useInViewAnimation<HTMLHeadingElement>({ delay: 100 });
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Brand Identity System",
      description: "Complete visual identity redesign for a sustainable fashion startup, including logo design, color palette, typography, and brand guidelines.",
      technologies: ["Brand Strategy", "Visual Design", "Identity Systems"],
      liveUrl: "https://example-brand.com",
      githubUrl: "https://github.com/alexjohnson/brand-project",
      featured: true,
    },
    {
      id: 2,
      title: "Digital Experience Platform",
      description: "User experience design and strategy for a fintech application focused on simplifying personal finance management.",
      technologies: ["UX Research", "Interaction Design", "Prototyping"],
      liveUrl: "https://fintech-demo.com",
      githubUrl: "https://github.com/alexjohnson/fintech-ux",
      featured: true,
    },
    {
      id: 3,
      title: "Creative Workshop Series",
      description: "Designed and facilitated a series of creative workshops for design thinking and innovation at a local design studio.",
      technologies: ["Workshop Design", "Facilitation", "Creative Strategy"],
      liveUrl: "https://workshop-series.com",
      githubUrl: "https://github.com/alexjohnson/workshop-materials",
      featured: false,
    },
    {
      id: 4,
      title: "Storytelling Platform",
      description: "Content strategy and visual design for a platform connecting storytellers with their audiences through immersive experiences.",
      technologies: ["Content Strategy", "Visual Storytelling", "User Journey"],
      liveUrl: "https://storytelling-platform.com",
      githubUrl: "https://github.com/alexjohnson/storytelling-project",
      featured: false,
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 
            ref={headerAnimation.elementRef}
            className={getAnimationClasses(
              headerAnimation.isInView,
              'fade-in-up',
              'text-4xl font-medium text-foreground mb-6'
            )}
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