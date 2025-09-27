import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const titleAnimation = useInViewAnimation<HTMLHeadingElement>();
  const subtitleAnimation = useInViewAnimation<HTMLParagraphElement>({ delay: 100 });
  const ctaAnimation = useInViewAnimation<HTMLDivElement>({ delay: 200 });

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 
          ref={titleAnimation.elementRef}
          className="text-6xl md:text-7xl font-medium text-foreground mb-8 leading-tight reveal"
          data-revealed={titleAnimation.isInView}
        >
          Reily Haag
        </h1>
        
        <p 
          ref={subtitleAnimation.elementRef}
          className="text-xl text-muted-foreground mb-12 leading-relaxed reveal"
          data-revealed={subtitleAnimation.isInView}
        >
          Ops @ SFR3 Fund | Formerly Founding team @ Lekko & Founder @ spring.art | Stanford B.A./M.A
        </p>

        <div 
          ref={ctaAnimation.elementRef}
          className="reveal"
          data-revealed={ctaAnimation.isInView}
        >
          <Button 
            size="lg" 
            className="px-8 py-3 min-h-[44px] focus-visible-ring"
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