import { useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

// Simple dark-mode only theme provider
export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Always apply dark mode
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);

  return <>{children}</>;
}