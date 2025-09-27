import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Led development of customer-facing applications serving 100K+ users. Improved performance by 40% and reduced loading times significantly.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      current: true,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "InnovateLab",
      location: "Remote",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications using modern stack. Collaborated with design and product teams to deliver pixel-perfect user experiences.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "AWS"],
      current: false,
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      period: "2019 - 2020",
      description: "Developed responsive web applications from mockups to deployment. Worked closely with UX designers to implement interactive components.",
      technologies: ["JavaScript", "React", "SASS", "Webpack", "Jest"],
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey building innovative solutions and leading development teams.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="hover-elevate" data-testid={`experience-${exp.id}`}>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-lg text-primary font-medium">{exp.company}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                      {exp.current && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}