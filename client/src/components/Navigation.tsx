import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [location, navigate] = useLocation();

  // Handle hash fragments when page loads
  useEffect(() => {
    if (location === "/" && window.location.hash) {
      const sectionId = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  const handleNavClick = (sectionId: string) => {
    if (location === "/") {
      // If we're on the homepage, just scroll to the section
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we're on another page, navigate to home then scroll
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm transition-all-smooth">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="text-lg font-medium text-foreground transition-colors-smooth">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              AJ
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick("work")}
              data-testid="nav-work"
              className="text-muted-foreground hover:text-foreground transition-colors-smooth focus-visible-ring"
            >
              Work
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick("about")}
              data-testid="nav-about"
              className="text-muted-foreground hover:text-foreground transition-colors-smooth focus-visible-ring"
            >
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavClick("contact")}
              data-testid="nav-contact"
              className="text-muted-foreground hover:text-foreground transition-colors-smooth focus-visible-ring"
            >
              Contact
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="theme-toggle"
              className="text-muted-foreground hover:text-foreground transition-colors-smooth focus-visible-ring"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}