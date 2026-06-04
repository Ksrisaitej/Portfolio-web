import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeadingProps {
  number: string;
  title: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ number, title, align = 'left' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-body text-sm font-semibold tracking-[0.12em] uppercase text-lime-accent">
          [{number}]
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/12 origin-left flex-1 max-w-[120px]"
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-bold uppercase text-kimono-white mt-4"
        style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.9, letterSpacing: '-0.01em' }}
      >
        {title}
      </motion.h2>
      {align === 'left' && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/12 origin-left mt-6"
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
}
