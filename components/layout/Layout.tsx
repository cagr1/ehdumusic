import React, { useState, useRef, useEffect, useMemo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { Icon } from '@iconify/react';
import { CustomCursor, DynamicBackground, IntroAnimation, SmoothScroll } from '../animations';
import { LanguageSwitcher, ScrollProgress } from '../ui';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
  showIntro?: boolean;
  isLiteMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showIntro = true, isLiteMode = false }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('latest');
  const navRef = useRef<HTMLDivElement>(null);

  // Detect lite mode
  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateLiteMode = () => {
      // This is handled by parent, but we keep detection here for nav styling
    };

    updateLiteMode();
    touchQuery.addEventListener('change', updateLiteMode);
    motionQuery.addEventListener('change', updateLiteMode);
    window.addEventListener('resize', updateLiteMode);

    return () => {
      touchQuery.removeEventListener('change', updateLiteMode);
      motionQuery.removeEventListener('change', updateLiteMode);
      window.removeEventListener('resize', updateLiteMode);
    };
  }, []);

  // Nav scroll effect
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

  const navItems = useMemo(() => [
    { name: t.nav.latest, path: '/' },
    { name: t.nav.tour, path: '/tour' },
    { name: t.nav.media, path: '/media' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.contact, path: '/#contact' },
  ], [t.nav.latest, t.nav.tour, t.nav.media, t.nav.gallery, t.nav.contact]);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const socialLinks = [
    { name: 'Beatport', icon: 'simple-icons:beatport', url: 'https://www.beatport.com/artist/ehdu/928516' },
    { name: 'Spotify', icon: 'simple-icons:spotify', url: 'https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o' },
    { name: 'Soundcloud', icon: 'simple-icons:soundcloud', url: 'https://soundcloud.com/ehdumusic' },
    { name: 'Instagram', icon: 'simple-icons:instagram', url: 'https://www.instagram.com/ehdumusic' },
    { name: 'Facebook', icon: 'simple-icons:facebook', url: 'https://www.facebook.com/ehdumusician' },
    { name: 'TikTok', icon: 'simple-icons:tiktok', url: 'https://www.tiktok.com/@ehdumusic' },
    { name: 'Youtube', icon: 'simple-icons:youtube', url: 'https://www.youtube.com/@ehdumusic' },
  ];

  return (
    <div className="relative text-white selection:bg-cyan-400/30">
      <ScrollProgress />
      {showIntro && <IntroAnimation />}
      {!isLiteMode && <DynamicBackground />}
      {!isLiteMode && <CustomCursor />}
      <LanguageSwitcher />
      {!isLiteMode && <div className="noise-overlay" />}

      {/* Sticky Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 transition-all duration-300 backdrop-blur-sm bg-black/0"
      >
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter z-50 relative"
          >
            EHDU
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.div key={item.path} className="relative">
                <Link
                  to={item.path}
                  className={`relative text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] transition-colors pb-2 ${
                    isActive(item.path) ? 'text-cyan-400' : 'text-white'
                  } hover:text-cyan-400`}
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400"
                    initial={{ scaleX: isActive(item.path) ? 1 : 0 }}
                    animate={{ scaleX: isActive(item.path) ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
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
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`text-4xl font-black uppercase tracking-tighter ${
                      isActive(item.path) ? 'text-cyan-400' : 'text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
