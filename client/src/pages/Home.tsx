import { ExternalLink, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { projects, socialLinks, siteConfig } from "../data";

const iconMap: Record<string, typeof Mail> = {
  X: Twitter,
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Intro */}
        <header className="mb-16">
          <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            {siteConfig.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {siteConfig.bio}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {siteConfig.tagline}
          </p>
        </header>

        {/* Projects/Things */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            Things I've worked on
          </h2>
          
          <ul className="space-y-6">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium mb-1">
                      {project.url ? (
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-muted-foreground transition-colors inline-flex items-center gap-2"
                        >
                          {project.title}
                          <ExternalLink className="h-3.5 w-3.5 opacity-50" />
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {project.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <footer className="pt-8 border-t border-border">
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label] || Mail;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 text-sm"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            {siteConfig.location}
          </p>
        </footer>
      </main>
    </div>
  );
}
