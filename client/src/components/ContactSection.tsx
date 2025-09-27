import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export function ContactSection() {

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@alexjohnson.com",
      href: "mailto:hello@alexjohnson.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/alexjohnson",
      username: "alexjohnson",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/alexjohnson",
      username: "@alexjohnson",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/alexjohnson",
      username: "@alexjohnson",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-medium text-foreground mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I'm always interested in meaningful collaborations and new projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label}>
                  {item.href && item.href !== "#" ? (
                    <a 
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-md hover-elevate transition-all-smooth min-h-[44px]"
                      data-testid="link-email"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-2 min-h-[44px]">
                      <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-foreground">Follow Me</h3>
              <p className="text-muted-foreground text-sm">
                Connect with me on social media and professional platforms.
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    className="justify-start min-h-[44px] py-3"
                    asChild
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <a 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Connect with me on ${social.label}`}
                    >
                      <social.icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-sm text-muted-foreground">{social.username}</div>
                      </div>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}