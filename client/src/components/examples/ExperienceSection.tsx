import { ExperienceSection } from '../ExperienceSection';
import { ThemeProvider } from '../ThemeProvider';

export default function ExperienceSectionExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ExperienceSection />
    </ThemeProvider>
  );
}