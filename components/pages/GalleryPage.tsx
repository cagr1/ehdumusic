import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PHOTO_GALLERY } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { renderGlitchChars, runGlitchBurst } from '../animations/glitch';

gsap.registerPlugin(ScrollTrigger);

// Image preload utility
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Preload all gallery images
  useEffect(() => {
    const preloadGallery = async () => {
      const criticalImages = PHOTO_GALLERY.slice(0, 4).map(p => preloadImage(p.src));
      await Promise.all(criticalImages);
      
      const remainingImages = PHOTO_GALLERY.slice(4).map(p => preloadImage(p.src));
      Promise.all(remainingImages).catch(() => {});
    };

    preloadGallery();
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { backgroundSize: '0% 3px', opacity: 0, x: -50 },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
            backgroundSize: '100% 3px',
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
          }
        );

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isMobile && !reducedMotion) {
          ScrollTrigger.create({
            trigger: titleRef.current,
            start: 'top 85%',
            onEnter: () => {
              if (titleRef.current) runGlitchBurst(titleRef.current);
            },
            onEnterBack: () => {
              if (titleRef.current) runGlitchBurst(titleRef.current);
            },
          });
        }
      }

      gsap.fromTo(
        '.gallery-photo-item',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none play reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 md:px-20 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4"
          >
            {t.media.subtitle}
          </motion.p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
            style={{
              backgroundSize: '0% 3px',
              backgroundPosition: 'left bottom',
            }}
          >
            {renderGlitchChars(t.media.photos)}
          </h2>
        </div>

        {/* Photo Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PHOTO_GALLERY.map((photo, idx) => (
            <motion.div
              key={photo.id}
              className="gallery-photo-item relative overflow-hidden group cursor-pointer rounded-2xl"
              onClick={() => setSelectedPhoto(photo.src)}
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              style={{
                boxShadow: hoveredPhoto === photo.id
                  ? '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(139, 0, 255, 0.1)'
                  : '0 0 20px rgba(0, 0, 0, 0.35)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="text-cyan-400 drop-shadow-lg" size={24} />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-base font-bold tracking-wide">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Background noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />
            
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 z-10"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <X size={24} />
            </motion.button>
            
            {/* Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={selectedPhoto}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              style={{
                boxShadow: '0 0 100px rgba(0, 240, 255, 0.15), 0 0 200px rgba(139, 0, 255, 0.1)',
              }}
            />
            
            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-400/30 rounded-br-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPage;
