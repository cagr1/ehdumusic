import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });

      timeline
        .to(containerRef.current, {
          duration: 0.05,
          skewY: 10,
          x: 10,
        }, 0)
        .to(containerRef.current, {
          duration: 0.05,
          skewY: -10,
          x: -10,
        }, 0.05)
        .to(containerRef.current, {
          duration: 0.05,
          skewY: 0,
          x: 0,
        }, 0.1);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        textShadow: '2px 2px 0px rgba(0, 240, 255, 0.5), -2px -2px 0px rgba(139, 0, 255, 0.5)',
      }}
    >
      {text}
    </div>
  );
};

export default GlitchText;
