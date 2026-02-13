import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      progress.set(Math.min(Math.max(ratio, 0), 1));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [progress]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: smoothProgress,
          background:
            'linear-gradient(90deg, rgba(0,240,255,0.95) 0%, rgba(139,0,255,0.75) 55%, rgba(255,255,255,0.9) 100%)',
          boxShadow: '0 0 12px rgba(0, 240, 255, 0.45)',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
