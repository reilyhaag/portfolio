# Personal Portfolio Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern portfolio sites like Linear, Notion, and GitHub's professional interfaces. The design prioritizes clean aesthetics with sophisticated dark mode implementation.

## Core Design Elements

### Color Palette
**Dark Mode Primary (Default Experience)**:
- Background: 12 8% 8% (deep charcoal)
- Surface: 12 6% 12% (elevated dark surface)
- Primary text: 0 0% 95% (near white)
- Secondary text: 0 0% 70% (muted gray)
- Accent: 210 100% 60% (modern blue)
- Borders: 0 0% 20% (subtle gray borders)

**Light Mode (Secondary)**:
- Background: 0 0% 98% (soft white)
- Surface: 0 0% 100% (pure white)
- Primary text: 0 0% 10% (near black)
- Secondary text: 0 0% 40% (medium gray)

### Typography
- **Primary Font**: Inter or Geist (Google Fonts CDN)
- **Code Font**: JetBrains Mono for technical content
- **Hierarchy**: 
  - Hero: text-5xl font-bold
  - Section headers: text-3xl font-semibold
  - Body: text-base font-normal
  - Captions: text-sm text-secondary

### Layout System
**Tailwind Spacing Units**: 4, 8, 12, 16, 24
- Container max-width: max-w-4xl
- Section spacing: py-24
- Component spacing: p-8
- Element gaps: gap-8

### Component Library

**Navigation**: 
- Fixed header with blur backdrop
- Logo/name on left, navigation links on right
- Smooth scroll indicators

**Hero Section**:
- Full viewport height with centered content
- Large typography with gradient text effects
- Professional headshot (circular, 200px)
- Subtle particle/dot grid background animation

**Experience Timeline**:
- Vertical timeline with company logos
- Card-based layout with hover elevations
- Technology tags with pill styling

**Projects Grid**:
- 2-column grid on desktop, single column mobile
- Project cards with subtle borders and hover states
- Live demo and GitHub buttons with outline variants
- Technology stack badges

**Contact Section**:
- Centered layout with social media icons
- Contact form with modern input styling
- Success/error states with smooth transitions

### Images
**Hero Image**: Professional headshot (circular crop, subtle border)
**Project Screenshots**: Mockups or actual screenshots in cards
**Company Logos**: Small, monochrome logos in experience timeline

### Animations
- Minimal, purposeful animations only
- Fade-in on scroll for sections
- Subtle hover states on interactive elements
- No autoplay or looping animations

## Key Design Principles
1. **Content First**: Clear hierarchy prioritizing work and projects
2. **Professional Elegance**: Sophisticated without being flashy
3. **Performance**: Fast loading with minimal animation overhead
4. **Accessibility**: High contrast ratios maintained in dark mode
5. **Mobile Excellence**: Touch-friendly interfaces with proper spacing

This design creates a modern, professional presence that showcases technical expertise while maintaining visual sophistication through restrained use of color and animation.