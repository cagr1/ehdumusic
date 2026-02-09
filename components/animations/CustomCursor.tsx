import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          boxShadow: `0 0 40px rgba(0, 240, 255, ${isHovering ? '0.8' : '0.3'})`,
          duration: 0.2,
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isHovering]);

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor hidden md:block fixed pointer-events-none"
      style={{
        left: springX,
        top: springY,
        width: isHovering ? '56px' : '32px',
        height: isHovering ? '56px' : '32px',
        scale: isHovering ? 1 : 1,
        backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
        border: isHovering ? '1.5px solid rgba(0, 240, 255, 0.8)' : '1px solid rgba(0, 240, 255, 0.4)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isHovering 
          ? '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.1)' 
          : '0 0 20px rgba(0, 240, 255, 0.2)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CustomCursor;
