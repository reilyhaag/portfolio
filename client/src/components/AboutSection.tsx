import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function AboutSection() {
  const sectionAnimation = useInViewAnimation<HTMLElement>({ delay: 0 });

  return (
    <section 
      id="about" 
      className="py-32 px-6"
      ref={sectionAnimation.elementRef}
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className="mb-20 reveal"
          data-revealed={sectionAnimation.isInView}
        >
          <h2 className="text-4xl font-medium text-foreground mb-8">About</h2>
        </div>

        <div className="max-w-2xl">
          <p 
            className="text-lg text-muted-foreground leading-relaxed mb-8 reveal"
            data-revealed={sectionAnimation.isInView}
            style={{ transitionDelay: "100ms" }}
          >
            Former art historian now building and running tech enabled businesses. I like people who make things.
          </p>
          
          <p 
            className="text-lg text-muted-foreground leading-relaxed reveal"
            data-revealed={sectionAnimation.isInView}
            style={{ transitionDelay: "200ms" }}
          >
            If you're making something cool, let's talk.
          </p>
        </div>
      </div>
    </section>
  );
}