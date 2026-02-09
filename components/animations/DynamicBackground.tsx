import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DynamicBackgroundProps {
  className?: string;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ className = '' }) => {
  const orb1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orb1Ref.current, {
        duration: 15,
        x: 100,
        y: 100,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        zIndex: 0,
      }}
    >
      <div
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, rgba(139, 0, 255, 0.3) 50%, transparent 70%)',
          top: '-15%',
          left: '-10%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[80px] animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(139, 0, 255, 0.5) 0%, rgba(0, 240, 255, 0.2) 50%, transparent 70%)',
          bottom: '-10%',
          right: '-5%',
          animationDuration: '8s',
        }}
      />
    </div>
  );
};

export default DynamicBackground;
