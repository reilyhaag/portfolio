import { Navigation } from '../Navigation';
import { ThemeProvider } from '../ThemeProvider';

export default function NavigationExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 p-8">
          <h1 className="text-2xl font-bold">Navigation Example</h1>
          <p className="text-muted-foreground">Try clicking the navigation links and theme toggle.</p>
        </div>
      </div>
    </ThemeProvider>
  );
}