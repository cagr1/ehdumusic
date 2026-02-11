import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

// Hero logo image
const LOGO_IMAGE = "images/logohero.png";

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
        className="relative z-10 w-full px-4 md:px-12 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group cursor-pointer w-full flex justify-center"
        >
          {/* Logo – responsive sizing that matches the intro loader logo */}
          <img
            src={LOGO_IMAGE}
            alt="EHDU - Melodic Techno Artist Logo"
            className="logo-glow transition-all duration-700 ease-out group-hover:scale-105"
            style={{
              width: '100%',
              maxWidth: '700px',
              height: 'auto',
              objectFit: 'contain',
            }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
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
