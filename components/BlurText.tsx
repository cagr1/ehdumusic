import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '', delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('span');
      
      gsap.fromTo(
        chars,
        { 
          filter: 'blur(10px)',
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          delay: delay,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, idx) => (
        <span key={idx}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </div>
  );
};

export default BlurText;
