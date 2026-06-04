import { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';

const TERMINAL_LINES = [
  'Kadimi Sri Sai Tej',
  'ML Engineer · IIT Kharagpur',
  'Building intelligent systems from scratch.',
  'Physics undergraduate · AI/ML · IIT KGP',
];

const STATS = [
  { value: '13+', label: 'Coding since Age 13' },
  { value: '2nd Yr', label: 'IIT KGP · Physics' },
  { value: 'RTX 4050', label: 'Local LLM Stack' },
  { value: '15+', label: 'Projects' },
  { value: '7+', label: 'Repositories' },
];

function NeuralGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  const initGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * 1.2 * dpr;
    ctx.scale(dpr, dpr);

    const nodeCount = 100;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 1.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight * 1.2);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight * 1.2) node.vy *= -1;

        // Mouse repulsion
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 2;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fill();
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cleanup = initGraph();

    const handleResize = () => {
      cleanup?.();
      initGraph();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [initGraph]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}

function TypewriterTerminal() {
  const { displayLines, isComplete } = useTypewriter({
    lines: TERMINAL_LINES,
    startDelay: 1400,
    charDelayMin: 30,
    charDelayMax: 60,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-2xl p-6 md:p-7 w-full max-w-[420px]"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
      </div>

      {/* Terminal Content */}
      <div className="font-mono text-sm leading-relaxed">
        {displayLines.map((line, i) => (
          <div key={i} className="mb-1">
            <span className="text-lime-accent mr-2">{'>'}</span>
            <span className="text-kimono-white/85">{line}</span>
            {i === displayLines.length - 1 && !isComplete && (
              <span className="animate-cursor-blink text-lime-accent ml-0.5">█</span>
            )}
          </div>
        ))}
        {isComplete && (
          <div>
            <span className="text-lime-accent mr-2">{'>'}</span>
            <span className="animate-cursor-blink text-lime-accent">█</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 + delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card px-5 py-4 min-w-[140px] md:min-w-[160px] cursor-default group hover:-translate-y-1.5 hover:border-electric-sky/20 hover:shadow-sky-glow transition-all duration-300"
    >
      <div className="font-display text-2xl md:text-[28px] font-bold text-kimono-white leading-none">
        {value}
      </div>
      <div className="font-body text-[11px] font-normal uppercase tracking-[0.08em] text-mouse-gray mt-1.5 leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const graphY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const tejY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const statX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      className="relative min-h-[110vh] overflow-hidden bg-lab-black"
      style={{ opacity: heroOpacity, isolation: 'isolate' }}
    >
      {/* Plane 2: Neural Graph — ABOVE TEJ to create overlap effect */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ y: graphY, willChange: 'transform' }}
      >
        <NeuralGraph />
      </motion.div>

      {/* Plane 1: Display Typography "TEJ" — BEHIND the graph */}
      <motion.div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none"
        style={{ y: tejY, top: '10%', willChange: 'transform' }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold uppercase text-outline text-center leading-[0.85]"
          style={{
            fontSize: 'clamp(180px, 25vw, 400px)',
            letterSpacing: '-0.02em',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          }}
        >
          TEJ
        </motion.h1>
      </motion.div>

      {/* Plane 3: Terminal Window */}
      <div className="absolute z-[3] top-[18vh] md:top-[20vh] right-[5vw] hidden md:block">
        <TypewriterTerminal />
      </div>

      {/* Mobile Terminal */}
      <div className="absolute z-[3] top-[22vh] left-6 right-6 md:hidden">
        <TypewriterTerminal />
      </div>

      {/* Plane 4: Stat Card Strip */}
      <motion.div
        className="absolute z-[4] bottom-[18vh] md:bottom-[16vh] left-6 md:left-10 lg:left-16 right-6"
        style={{ x: statX, willChange: 'transform' }}
      >
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </motion.div>

      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-[4] bottom-[6vh] left-6 md:left-10 lg:left-16 flex gap-4"
      >
        <button
          onClick={() => scrollTo('projects')}
          className="pill-cream px-7 py-3 font-body text-[13px] font-medium tracking-[0.08em] uppercase text-kimono-white transition-colors duration-300"
        >
          View Projects →
        </button>
        <a
          href="https://drive.google.com/file/d/1DJX1O1jxw2aslxUfhbpqcUD3K_4fxV3R/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 border border-white/20 rounded-full font-body text-[13px] font-medium tracking-[0.08em] uppercase text-kimono-white hover:bg-lime-accent hover:text-lab-black hover:border-lime-accent transition-all duration-300"
        >
          Download Resume
        </a>
      </motion.div>
    </motion.section>
  );
}
