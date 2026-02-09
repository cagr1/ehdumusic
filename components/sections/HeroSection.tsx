import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const LOGO_IMAGE = "images/Logo_2.png";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const logoScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 0]);

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/20 to-black">
      </motion.div>
      
      <motion.div 
        style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
        className="relative z-10 w-full max-w-4xl px-12 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative group cursor-pointer"
        >
          <img
            src={LOGO_IMAGE}
            alt="EHDU - Melodic Techno Artist Logo"
            className="w-full h-auto logo-glow transition-all duration-700 ease-out group-hover:scale-105"
            width="800"
            height="400"
            loading="eager"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center mt-8"
        >
          <motion.h2 
            className="text-sm md:text-xl uppercase tracking-[0.6em] text-cyan-400 mb-4 font-black hero-subtitle"
            whileHover={{ 
              scale: 1.05,
            }}
          >
            {t.hero.subtitle}
          </motion.h2>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        
      </motion.div>
    </section>
  );
};

export default HeroSection;
