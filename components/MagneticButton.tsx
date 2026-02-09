import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveMagnet = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = ((clientX - centerX) / 5) * 0.5;
      const distY = ((clientY - centerY) / 5) * 0.5;

      gsap.to(button, {
        x: distX,
        y: distY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const resetPosition = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out',
      });
    };

    window.addEventListener('mousemove', moveMagnet);
    window.addEventListener('mouseleave', resetPosition);

    return () => {
      window.removeEventListener('mousemove', moveMagnet);
      window.removeEventListener('mouseleave', resetPosition);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
