import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-foreground">
            AJ
          </div>
          
          <div className="flex items-center gap-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("work")}
              data-testid="nav-work"
              className="text-muted-foreground hover:text-foreground"
            >
              Work
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("about")}
              data-testid="nav-about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("contact")}
              data-testid="nav-contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}