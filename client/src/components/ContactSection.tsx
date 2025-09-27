import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "alex.johnson@email.com",
      href: "mailto:alex.johnson@email.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
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
      icon: Github,
      label: "GitHub",
      href: "#",
      username: "@alexjohnson",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      username: "alex-johnson-dev",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      username: "@alexcodes",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-medium text-foreground mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            I'm always interested in new opportunities and meaningful collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-foreground">Send a Message</h3>
              <p className="text-muted-foreground text-sm">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-fade-in animate-delay-100">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="transition-colors-smooth focus-visible-ring"
                    data-testid="contact-name"
                  />
                </div>
                
                <div className="animate-fade-in animate-delay-200">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="transition-colors-smooth focus-visible-ring"
                    data-testid="contact-email"
                  />
                </div>
                
                <div className="animate-fade-in animate-delay-300">
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={4}
                    className="transition-colors-smooth focus-visible-ring"
                    data-testid="contact-message"
                  />
                </div>
                
                <div className="animate-fade-in animate-delay-400">
                  <Button 
                    type="submit" 
                    className="w-full transition-all-smooth hover-lift focus-visible-ring"
                    data-testid="contact-submit"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

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
                      className="justify-start hover-elevate"
                      onClick={() => console.log(`Opening ${social.label}`)}
                      data-testid={`social-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-sm text-muted-foreground">{social.username}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Currently open to new opportunities
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}