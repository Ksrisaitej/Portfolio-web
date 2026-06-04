import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = ['projects', 'skills', 'about', 'contact', 'hero'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-md bg-lab-black/60' : ''
        }`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 py-5">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="font-body text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-kimono-white hover:text-lime-accent transition-colors duration-300"
          >
            Kadimi Sri Sai Tej
          </a>

          {/* Center Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`nav-link-underline font-body text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-kimono-white active'
                    : 'text-kimono-white/70 hover:text-kimono-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 border border-white/20 rounded-full font-body text-[11px] font-medium tracking-[0.15em] uppercase text-kimono-white hover:bg-lime-accent hover:text-lab-black hover:border-lime-accent transition-all duration-300"
            >
              Contact
              <span className="text-sm">→</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-kimono-white/70 hover:text-kimono-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-lab-black/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="font-body text-sm font-medium tracking-[0.18em] uppercase text-kimono-white/70 hover:text-kimono-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Right Edge Social Icons */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed right-5 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5"
      >
        <a
          href="https://github.com/Ksrisaitej"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white/30 hover:text-lime-accent transition-all duration-300"
          aria-label="GitHub"
        >
          <Github size={18} strokeWidth={1.5} />
        </a>
        <a
          href="https://www.linkedin.com/in/sri-sai-tej-434813370/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white/30 hover:text-lime-accent transition-all duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} strokeWidth={1.5} />
        </a>
      </motion.div>
    </>
  );
}
