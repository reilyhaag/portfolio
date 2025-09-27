import { AboutSection } from '../AboutSection';
import { ThemeProvider } from '../ThemeProvider';

export default function AboutSectionExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AboutSection />
    </ThemeProvider>
  );
}