import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroSection } from '@/sections/HeroSection';
import { AboutSection } from '@/sections/AboutSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ContactSection } from '@/sections/ContactSection';
import { FooterSection } from '@/sections/FooterSection';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
