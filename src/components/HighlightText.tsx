import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface HighlightTextProps {
  children: string;
  delay?: number;
}

export function HighlightText({ children, delay = 0 }: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [phase, setPhase] = useState<'idle' | 'active' | 'settled'>('idle');

  useEffect(() => {
    if (isInView && phase === 'idle') {
      const t1 = setTimeout(() => setPhase('active'), delay);
      const t2 = setTimeout(() => setPhase('settled'), delay + 2500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isInView, delay, phase]);

  return (
    <span
      ref={ref}
      className="relative inline px-1 rounded-sm transition-all duration-500"
      style={{
        background:
          phase === 'active'
            ? 'linear-gradient(90deg, #D4F87A 0%, #D4F87A 100%)'
            : phase === 'settled'
            ? 'linear-gradient(90deg, rgba(212,248,122,0.15) 0%, rgba(212,248,122,0.15) 100%)'
            : 'transparent',
        backgroundSize: phase !== 'idle' ? '100% 100%' : '0% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        color:
          phase === 'active'
            ? '#0A0A0F'
            : phase === 'settled'
            ? '#FAFAFA'
            : 'inherit',
        transition: 'background-size 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease',
      }}
    >
      {children}
    </span>
  );
}
