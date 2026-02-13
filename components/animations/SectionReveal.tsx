import React, { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right';
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  direction = 'left',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const revealFrom = direction === 'left'
        ? 'inset(0% 100% 0% 0% round 18px)'
        : 'inset(0% 0% 0% 100% round 18px)';

      gsap.fromTo(
        wrapperRef.current,
        {
          clipPath: revealFrom,
          opacity: 0,
          y: 56,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 18px)',
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 82%',
            toggleActions: 'play none play reverse',
          },
        }
      );

      const childNodes = wrapperRef.current.querySelectorAll('[data-reveal-item]');
      if (!childNodes.length) return;

      gsap.fromTo(
        childNodes,
        { y: 24, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 76%',
            toggleActions: 'play none play reverse',
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default SectionReveal;
