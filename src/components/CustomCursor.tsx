import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices and narrow viewports
    const isTouchDevice = !window.matchMedia('(hover: hover)').matches;
    if (isTouchDevice || window.innerWidth < 768) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Hide system cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover], input, textarea')) {
        setIsHovering(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsVisible(false);
        document.body.style.cursor = '';
      } else {
        setIsVisible(true);
        document.body.style.cursor = 'none';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    let rafId: number;
    const animate = () => {
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        width: isHovering ? 32 : 8,
        height: isHovering ? 32 : 8,
        backgroundColor: isHovering ? 'transparent' : '#D4F87A',
        borderWidth: isHovering ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '50%',
        borderColor: '#D4F87A',
        borderStyle: 'solid',
      }}
    />
  );
}
