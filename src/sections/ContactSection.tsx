import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Github, Linkedin, Copy, Check, ArrowDown } from 'lucide-react';

const CODE_FRAGMENTS = [
  'import torch',
  'def forward(self, x):',
  '@torch.jit.script',
  'nn.Linear(512, 256)',
  'optimizer.step()',
  'F.cross_entropy(out, y)',
  'model.train()',
  'torch.cuda.is_available()',
  'torch.no_grad()',
  'nn.Conv2d(3, 64, 3)',
  'F.relu(x)',
  'torch.save(model, path)',
  'DataLoader(dataset)',
  'nn.BatchNorm2d(64)',
  'F.softmax(x, dim=1)',
  'torch.tensor([...])',
  'nn.Dropout(0.5)',
  'wandb.log({"loss": l})',
];

function BokehBackground() {
  const fragments = useMemo(() => {
    return CODE_FRAGMENTS.map((text, i) => ({
      text,
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 15,
      color: ['rgba(56,189,248,', 'rgba(212,248,122,', 'rgba(250,250,250,', 'rgba(136,192,208,'][i % 4],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fragments.map((frag, i) => (
        <div
          key={i}
          className="absolute font-mono text-xs animate-float-up"
          style={{
            left: `${frag.x}%`,
            animationDelay: `${frag.delay}s`,
            animationDuration: `${frag.duration}s`,
            color: `${frag.color}0.03)`,
          }}
        >
          {frag.text}
        </div>
      ))}
    </div>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('srisaitej999@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = 'srisaitej999@gmail.com';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-lab-black py-[clamp(80px,12vh,160px)] overflow-hidden"
    >
      <BokehBackground />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Number */}
        <ScrollReveal>
          <span className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-lime-accent mb-10 block">
            [04]
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column — Contact Form */}
          <ScrollReveal direction="right">
            <div className="glass-form rounded-2xl p-8 md:p-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:srisaitej999@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
                }}
                className="space-y-5"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-kimono-white placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent/50 focus:ring-1 focus:ring-lime-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email or Phone"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-kimono-white placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent/50 focus:ring-1 focus:ring-lime-accent/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 font-body text-sm text-kimono-white placeholder:text-mouse-gray focus:outline-none focus:border-lime-accent/50 focus:ring-1 focus:ring-lime-accent/20 transition-all duration-300 resize-none min-h-[140px]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full pill-cream py-3.5 font-body text-sm font-medium tracking-[0.08em] uppercase text-kimono-white transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Right Column — Contact Info */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="lg:pl-8">
              <h3
                className="font-serif font-light text-kimono-white leading-[1.2]"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
              >
                Let's connect
              </h3>

              <p className="font-body text-base leading-[1.7] text-kimono-white/70 mt-5">
                Open to internships and research roles in ML/AI. If you're building something interesting or hiring — I'd love to hear from you.
              </p>

              {/* Email */}
              <div className="mt-8 flex items-center gap-3">
                <span className="font-body text-base font-medium text-kimono-white">
                  srisaitej999@gmail.com
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-mouse-gray hover:text-lime-accent transition-colors duration-300 relative"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 font-body text-[10px] text-lime-accent whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                </button>
              </div>
              <p className="font-body text-xs text-mouse-gray mt-1">Reply within 24h</p>

              {/* Social Links */}
              <div className="mt-8 flex items-center gap-6">
                <a
                  href="https://github.com/Ksrisaitej"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-kimono-white hover:text-lime-accent transition-colors duration-300"
                >
                  <Github size={16} strokeWidth={1.5} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sri-sai-tej-434813370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-kimono-white hover:text-lime-accent transition-colors duration-300"
                >
                  <Linkedin size={16} strokeWidth={1.5} />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Download Resume CTA */}
              <div className="mt-8">
                <a
                  href="https://drive.google.com/file/d/1DJX1O1jxw2aslxUfhbpqcUD3K_4fxV3R/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 rounded-full font-body text-[13px] font-medium tracking-[0.08em] uppercase text-kimono-white hover:bg-lime-accent hover:text-lab-black hover:border-lime-accent transition-all duration-300"
                >
                  Download Resume
                  <ArrowDown size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
