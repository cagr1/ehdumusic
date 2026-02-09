
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
import { TourSection, LatestSection, MediaSection, HeroSection, FooterSection } from './components/sections';
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
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 transition-all duration-300 backdrop-blur-sm bg-black/0"
      >
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <a href="#latest" className="text-2xl md:text-3xl font-black uppercase tracking-tighter z-50 relative">
            EHDU
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="relative text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] hover:text-cyan-400 transition-colors pb-2"
                whileHover={{ color: '#00F0FF' }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-4xl font-black uppercase tracking-tighter"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8">
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

        {/* CONTACT SECTION */}
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
                    style={{ color: '#ffffff' }}
                    whileHover={{ color: '#00F0FF' }}
                  >
                    booking@ehdu.com
                  </motion.a>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-8 md:order-1">
              <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
                {socialLinks.map((link) => (
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
            </div>
          </div>
        </Section>
      </main>

      {/* FOOTER SECTION - Separate but visually connected */}
      <FooterSection />
    </div>
  );
};

export default App;
