import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ count = 30, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: radial-gradient(circle, rgba(0, 240, 255, 1), rgba(139, 0, 255, 0.5));
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(0, 240, 255, 0.5);
      `;
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        duration: Math.random() * 4 + 6,
        y: Math.random() * 200 - 100,
        x: Math.random() * 200 - 100,
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      particles.forEach(p => container.removeChild(p));
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        zIndex: 1,
      }}
    />
  );
};

export default ParticleField;
