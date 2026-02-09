
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { Icon } from '@iconify/react';

import { CustomCursor, DynamicBackground, PageLoader } from './components/animations';
import { Section, LanguageSwitcher } from './components/ui';
import { TourSection, LatestSection, MediaSection, HeroSection } from './components/sections';
import { useLanguage } from './i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let scrollTimeout: NodeJS.Timeout;
      
      const handleScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (navRef.current) {
            const scrolled = window.scrollY;
            gsap.to(navRef.current, {
              backdropFilter: scrolled > 50 ? 'blur(20px)' : 'blur(8px)',
              backgroundColor: scrolled > 50 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        }, 10);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    });

    return () => ctx.revert();
  }, []);

  const navItems = [
    { name: t.nav.latest, id: 'latest' },
    { name: t.nav.tour, id: 'tour' },
    { name: t.nav.media, id: 'media' },
    { name: t.nav.contact, id: 'contact' },
  ];

  const socialLinks = [
    { name: 'Beatport', icon: 'simple-icons:beatport', url: 'https://www.beatport.com/artist/ehdu/928516' },
    { name: 'Spotify', icon: 'simple-icons:spotify', url: 'https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o?si=-DI8ipqRQzW_EcwaA5fEaw&nd=1&dlsi=969c082138f54b26' },
    { name: 'Soundcloud', icon: 'simple-icons:soundcloud', url: 'https://soundcloud.com/ehdumusic' },
    { name: 'Instagram', icon: 'simple-icons:instagram', url: 'https://www.instagram.com/ehdumusic' },
    { name: 'Facebook', icon: 'simple-icons:facebook', url: 'https://www.facebook.com/ehdumusician' },
    { name: 'TikTok', icon: 'simple-icons:tiktok', url: 'https://www.tiktok.com/@ehdumusic' },
    { name: 'Youtube', icon: 'simple-icons:youtube', url: 'https://www.youtube.com/@ehdumusic' },
  ];

  return (
    <div className="relative text-white selection:bg-cyan-400/30">
      <PageLoader />
      <DynamicBackground />
      <CustomCursor />
      <LanguageSwitcher />
      <div className="noise-overlay" />

      {/* Sticky Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference backdrop-blur-sm transition-all duration-300">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-black tracking-tighter hover:text-cyan-400 transition-colors"
        >
          EHDU
        </motion.a>
        
        <div className="hidden md:flex gap-10">
          {navItems.map((item, idx) => (
            <motion.a 
              key={item.id}
              href={`#${item.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{
                color: '#00F0FF',
                textShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
              }}
              className="text-sm uppercase tracking-widest font-bold transition-all"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black p-10 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">EHDU</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black tracking-tight"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {socialLinks.map((link, idx) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ 
                    scale: 1.2,
                    color: '#00F0FF',
                    filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.6))',
                  }}
                  className="text-white/40 transition-colors"
                >
                  <Icon icon={link.icon} width="24" height="24" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <HeroSection />

        {/* LATEST RELEASE */}
        <LatestSection />

        {/* TOUR DATES */}
        <TourSection />

        {/* MEDIA */}
        <MediaSection />

        {/* CONTACT / FOOTER */}
        <Section id="contact" subtitle={t.contact.subtitle} title={t.contact.title} reverseLayout={true}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="md:order-2">
              <p className="text-xl text-white/60 mb-8 max-w-md md:ml-auto md:text-right">
                {t.contact.description}
              </p>

              <div className="space-y-6 md:text-right">
                <motion.div
                  className="group"
                  whileHover={{ x: -10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1">{t.contact.bookings}</p>
                  <motion.a
                    href="mailto:booking@ehdu.com"
                    className="text-2xl md:text-3xl font-bold transition-all cursor-pointer inline-block"
                    style={{
                      color: '#ffffff',
                    }}
                    whileHover={{
                      color: '#00F0FF',
                    }}
                  >
                    booking@ehdu.com
                  </motion.a>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-12 md:order-1">
              <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
                {socialLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name}
                    href={link.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.4,
                      color: '#00F0FF',
                      filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))',
                      rotate: 15,
                      y: -5,
                    }} 
                    className="text-white/40 transition-all flex justify-center"
                    title={link.name}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon icon={link.icon} width="32" height="32" />
                  </motion.a>
                ))}
              </div>
              
              <div className="text-[10px] uppercase tracking-widest text-white/20 space-y-2">
                <p>&copy; {new Date().getFullYear()} EHDU PRODUCTIONS. ALL RIGHTS RESERVED.</p>
                <p>MADE BY CARLOS GALLARDO.</p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* MARQUEE FOOTER */}
      <div className="w-full overflow-hidden bg-black py-12 border-t border-white/5 relative group hover:border-cyan-400/30 transition-colors">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex items-center gap-20 select-none group-hover:pause"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.1, color: '#00F0FF' }}
              className="text-[15vw] font-black tracking-tighter opacity-10 group-hover:opacity-30 group-hover:text-cyan-400 transition-all duration-700 cursor-pointer"
            >
              EHDU
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* FINAL FOOTER STRIP */}
      <footer className="py-10 bg-black px-12 text-center text-white/10 text-[10px] tracking-[0.5em] uppercase">
        {t.contact.footer}
      </footer>
    </div>
  );
};

export default App;
