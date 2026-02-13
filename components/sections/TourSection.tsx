import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TOUR_DATES } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParallaxLayer } from '../animations';
import { renderGlitchChars, runGlitchBurst } from '../animations/glitch';

gsap.registerPlugin(ScrollTrigger);

const TourSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - right to left (title is on the right)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            backgroundSize: '0% 3px',
            opacity: 0,
            x: 50,
          },
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
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, x: 30 },
          {
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll('[data-tour-item]'),
          {
            opacity: 0,
            y: 36,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none play reverse',
              // Performance optimizations
              fastScrollEnd: true,
              preventOverlaps: true,
            },
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

    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="tour" ref={sectionRef} className="py-20 px-6 md:px-20 relative overflow-hidden">
      <ParallaxLayer
        className="absolute -left-24 bottom-12 z-[0] w-[24vw] max-w-[320px]"
        speed={0.42}
        yRange={220}
        opacity={0.1}
        imageSrc="/Cover/gallery6.webp"
        imageAlt=""
        imageClassName="w-full rounded-[20px] object-cover grayscale blur-[0.8px] mix-blend-screen"
      />
      <ParallaxLayer
        className="absolute -right-20 top-[18%] z-[0] w-[22vw] max-w-[300px]"
        speed={0.28}
        yRange={180}
        opacity={0.09}
        imageSrc="/Cover/gallery3.webp"
        imageAlt=""
        imageClassName="w-full rounded-[20px] object-cover grayscale blur-[0.8px] mix-blend-screen"
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-16 text-right">
          <p
            ref={subtitleRef}
            className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4"
          >
            {t.tour.subtitle}
          </p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
            style={{
              backgroundSize: '0% 3px',
              backgroundPosition: 'left bottom',
            }}
          >
            {renderGlitchChars(t.tour.title)}
          </h2>
        </div>

        <div ref={listRef} className="flex flex-col gap-1 border-t border-white/10">
          {TOUR_DATES.map((tour, idx) => (
            <motion.div
              key={tour.id}
              data-tour-item
              onClick={() => setSelectedTourId(selectedTourId === tour.id ? null : tour.id)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group cursor-pointer border-b border-white/10 py-8 px-4 relative hover:bg-white/[0.02] transition-colors duration-500"
              viewport={{ once: false }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-bold tracking-widest text-white/40 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 px-3 py-1 rounded-full">
                    {tour.date}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase group-hover:text-cyan-400 transition-colors duration-500">
                    {tour.city}
                  </h3>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                  <span className="text-sm md:text-xs uppercase tracking-widest text-white/50">{tour.venue}</span>
                  <button className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 ${tour.status === 'Sold Out' ? 'border border-white/10 text-white/20' : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'}`}>
                    {tour.status === 'Sold Out' ? t.tour.soldOut : t.tour.tickets}
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {selectedTourId === tour.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.tickets}</p>
                        <a href={tour.link} className="hover:text-cyan-400 flex items-center gap-2 transition-colors duration-300">{t.tour.vendor} <ChevronRight size={14} /></a>
                      </div>
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.support}</p>
                        <p>Tale of Us, Maceo Plex, Mind Against</p>
                      </div>
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.info}</p>
                        <p>{t.tour.doors}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourSection;
