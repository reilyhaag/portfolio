import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Alex Johnson
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Creative professional passionate about building meaningful experiences 
            and bringing innovative ideas to life.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => scrollToSection("projects")}
            data-testid="cta-projects"
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8"
            onClick={() => scrollToSection("contact")}
            data-testid="cta-contact"
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="ghost" size="icon" data-testid="social-github">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="social-linkedin">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="social-email">
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => scrollToSection("about")}
            data-testid="scroll-indicator"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}