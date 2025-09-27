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
        <h1 className="text-6xl md:text-7xl font-medium text-foreground mb-8 leading-tight">
          Alex Johnson
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Creative professional focused on meaningful experiences.
        </p>

        <Button 
          size="lg" 
          className="px-8 rounded-full"
          onClick={() => scrollToSection("contact")}
          data-testid="cta-contact"
        >
          Get In Touch
        </Button>
      </div>
    </section>
  );
}