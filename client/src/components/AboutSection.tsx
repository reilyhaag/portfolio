import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
    "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Docker",
    "Git", "Figma", "Tailwind CSS", "GraphQL"
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-medium text-foreground mb-8 animate-fade-in-up">About</h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in-up animate-delay-200">
            Former art historian now building and running tech enabled businesses. I like people who make things.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up animate-delay-300">
            If you're making something cool, let's talk.
          </p>
        </div>
      </div>
    </section>
  );
}