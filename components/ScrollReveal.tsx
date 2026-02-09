import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, className = '' }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 100,
          filter: 'blur(20px)',
        },
        {
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            once: true,
          },
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          delay: delay,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
