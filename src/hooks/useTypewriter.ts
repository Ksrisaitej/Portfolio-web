import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  lines: string[];
  startDelay?: number;
  charDelayMin?: number;
  charDelayMax?: number;
  lineDelay?: number;
}

interface UseTypewriterReturn {
  displayLines: string[];
  currentLineIndex: number;
  isTyping: boolean;
  isComplete: boolean;
}

export function useTypewriter({
  lines,
  startDelay = 1200,
  charDelayMin = 30,
  charDelayMax = 60,
  lineDelay = 50,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    clearAllTimeouts();
    setDisplayLines([]);
    setCurrentLineIndex(-1);
    setIsTyping(false);
    setIsComplete(false);

    const startTimeout = window.setTimeout(() => {
      setIsTyping(true);
      setCurrentLineIndex(0);
      setDisplayLines(['']);
    }, startDelay);

    timeoutsRef.current.push(startTimeout);

    return clearAllTimeouts;
  }, [lines.join('|'), startDelay]);

  useEffect(() => {
    if (currentLineIndex < 0 || currentLineIndex >= lines.length || isComplete) return;

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;
    const currentDisplay = displayLines[currentLineIndex] || '';

    if (currentDisplay.length >= currentLine.length) {
      if (currentLineIndex < lines.length - 1) {
        const nextLineTimeout = window.setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setDisplayLines(prev => [...prev, '']);
        }, lineDelay);
        timeoutsRef.current.push(nextLineTimeout);
      } else {
        setIsTyping(false);
        setIsComplete(true);
      }
      return;
    }

    const typeNextChar = () => {
      if (charIndex < currentLine.length) {
        charIndex++;
        setDisplayLines(prev => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.slice(0, charIndex);
          return updated;
        });

        const delay = charDelayMin + Math.random() * (charDelayMax - charDelayMin);
        const timeout = window.setTimeout(typeNextChar, delay);
        timeoutsRef.current.push(timeout);
      } else {
        if (currentLineIndex < lines.length - 1) {
          const nextLineTimeout = window.setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setDisplayLines(prev => [...prev, '']);
          }, lineDelay);
          timeoutsRef.current.push(nextLineTimeout);
        } else {
          setIsTyping(false);
          setIsComplete(true);
        }
      }
    };

    const delay = charDelayMin + Math.random() * (charDelayMax - charDelayMin);
    const timeout = window.setTimeout(typeNextChar, delay);
    timeoutsRef.current.push(timeout);

    return () => {
      // Only clear timeouts created in this effect run
    };
  }, [currentLineIndex, isComplete]);

  return { displayLines, currentLineIndex, isTyping, isComplete };
}
