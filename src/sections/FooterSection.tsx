import { Github, Linkedin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function FooterSection() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neural-dark">
      {/* Hairline Rule */}
      <div className="h-px bg-white/[0.08]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-10">
        {/* Three Column Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <p className="font-body text-xs text-mouse-gray text-center md:text-left">
            Kadimi Sri Sai Tej · ML Engineer · IIT KGP · 2026
          </p>

          {/* Center Nav */}
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-body text-xs font-medium tracking-[0.12em] uppercase text-kimono-white/50 hover:text-kimono-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ksrisaitej"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mouse-gray hover:text-kimono-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/sri-sai-tej-434813370/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mouse-gray hover:text-kimono-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="mt-6 pt-6 border-t border-white/[0.05] text-center">
          <p className="font-body text-[11px] text-mouse-gray/50">
            © 2026 Kadimi Sri Sai Tej. Built with React & Vite. IIT Kharagpur · India
          </p>
        </div>
      </div>
    </footer>
  );
}
