import { ProjectsSection } from '../ProjectsSection';
import { ThemeProvider } from '../ThemeProvider';

export default function ProjectsSectionExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ProjectsSection />
    </ThemeProvider>
  );
}