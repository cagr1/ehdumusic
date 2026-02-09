import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StaggerListProps {
  children: React.ReactNode[];
  delay?: number;
  duration?: number;
  className?: string;
}

const StaggerList: React.FC<StaggerListProps> = ({ children, delay = 0, duration = 0.8, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('[data-stagger]');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: duration,
            stagger: 0.1,
            delay: delay,
            ease: 'power3.out',
          }
        );
      }
    });

    return () => ctx.revert();
  }, [delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, idx) => (
        <div key={idx} data-stagger>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggerList;
