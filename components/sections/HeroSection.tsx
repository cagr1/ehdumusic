import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

// Hero images
const LOGO_IMAGE = "images/logohero.png";
const HERO_BG_IMAGE = "Cover/gallery2.webp";


const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
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
    <section id="hero" ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <motion.img
        src={HERO_BG_IMAGE}
        alt="EHDU live set"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[20%_40%] sm:object-[30%_38%] md:object-[55%_30%] lg:object-[65%_30%]"
        style={{ opacity: bgOpacity }}
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/35 to-black/75" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(139,0,255,0.22),transparent_50%)]" />
      
      <motion.div 
        style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
        className="relative z-10 w-full px-4 md:px-12 flex flex-col items-center pt-4 sm:pt-6 md:pt-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group cursor-pointer w-full flex justify-center -translate-y-12 sm:-translate-y-14 md:-translate-y-16 lg:-translate-y-20 lg:-translate-x-12"
        >
          {/* Logo – responsive sizing that matches the intro loader logo */}
          <img
            src={LOGO_IMAGE}
            alt="EHDU - Melodic Techno Artist Logo"
            className="logo-glow transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_60px_rgba(0,0,0,0.65)] w-full max-w-[600px] lg:max-w-[520px]"
            style={{
              height: 'auto',
              objectFit: 'contain',
            }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
        
        {/* Separator Bar - separates Too Many Rules | Polyptych */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="h-px w-full max-w-xl mt-2 mb-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #00F0FF 20%, #00F0FF 80%, transparent)',
            boxShadow: '0 0 10px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.5)',
          }}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-8"
        >
          <motion.h2 
            className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-wider md:tracking-widest text-cyan-400 mb-4 font-black hero-subtitle whitespace-nowrap px-2"
            whileHover={{ 
              scale: 1.05,
            }}
          >
            {t.hero.subtitle}
          </motion.h2>
          
          {/* Primary CTA - Book for Events */}
          <motion.a
            href="/contact"
            onClick={() => {
              // Track hero CTA click
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'hero_booking_click', { event_category: 'conversion' });
              }
              console.log('hero_booking_click');
            }}
            className="inline-block bg-cyan-400 text-black text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 md:px-10 md:py-4 rounded-md hover:rounded-full hover:bg-cyan-300 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/30 border border-cyan-300/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {language === 'es' ? 'Reservar para Eventos' : 'Book for Events'}
          </motion.a>
          
          {/* Secondary CTA - Listen Now */}
          <motion.a
            href="https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'listen_click', { event_category: 'engagement' });
              }
              console.log('listen_click');
            }}
            className="inline-block ml-2 sm:ml-4 md:ml-6 mt-3 sm:mt-0 text-[10px] sm:text-xs md:text-sm text-white/40 uppercase tracking-wider px-3 sm:px-4 py-2 rounded-full border border-white/10 hover:border-cyan-400/30 hover:text-cyan-400/60 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {language === 'es' ? 'Escuchar en Spotify' : 'Listen Now'}
          </motion.a>
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
