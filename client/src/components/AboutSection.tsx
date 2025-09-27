import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express",
    "Python", "Django", "PostgreSQL", "MongoDB", "AWS", "Docker",
    "Git", "Figma", "Tailwind CSS", "GraphQL"
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience 
              building web applications that users love. I specialize in creating 
              scalable, maintainable solutions using modern technologies.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or sharing my knowledge 
              through technical writing and mentoring.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What I Do</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Frontend Development with React & TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Backend API Development with Node.js & Python
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Cloud Infrastructure & DevOps
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  UI/UX Design & Prototyping
                </li>
              </ul>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="text-sm hover-elevate"
                    data-testid={`skill-${skill.toLowerCase()}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}