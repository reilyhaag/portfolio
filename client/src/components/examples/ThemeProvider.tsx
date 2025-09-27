import { ThemeProvider } from '../ThemeProvider';
import { Button } from "@/components/ui/button";
import { useTheme } from '../ThemeProvider';

function ThemeToggleExample() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="p-4">
      <p>Current theme: {theme}</p>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </Button>
    </div>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ThemeToggleExample />
    </ThemeProvider>
  );
}