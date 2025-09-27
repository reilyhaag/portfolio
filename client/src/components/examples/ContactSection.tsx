import { ContactSection } from '../ContactSection';
import { ThemeProvider } from '../ThemeProvider';

export default function ContactSectionExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ContactSection />
    </ThemeProvider>
  );
}