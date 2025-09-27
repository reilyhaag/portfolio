import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import headshot from "@assets/generated_images/Professional_developer_headshot_portrait_1f9cea77.png";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <img
            src={headshot}
            alt="Professional headshot"
            className="w-48 h-48 rounded-full border-2 border-border object-cover"
            data-testid="hero-image"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Badge variant="secondary" className="text-sm">
            Available for new opportunities
          </Badge>
          
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Alex Johnson
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Full-stack developer passionate about creating exceptional user experiences 
            and building scalable applications with modern technologies.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["React", "TypeScript", "Node.js", "Python", "AWS", "PostgreSQL"].map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
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