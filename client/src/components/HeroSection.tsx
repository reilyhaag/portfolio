import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-medium text-foreground mb-8 leading-tight animate-fade-in-up">
          Alex Johnson
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up animate-delay-200">
          Creative professional focused on meaningful experiences.
        </p>

        <div className="animate-fade-in-up animate-delay-400">
          <Button 
            size="lg" 
            className="px-8 rounded-full transition-all-smooth hover-lift focus-visible-ring"
            onClick={() => scrollToSection("contact")}
            data-testid="cta-contact"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}