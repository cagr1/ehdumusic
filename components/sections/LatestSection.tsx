import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { renderGlitchChars, runGlitchBurst } from '../animations/glitch';

gsap.registerPlugin(ScrollTrigger);

const LatestSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - left to right (title is on the left)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            backgroundSize: '0% 3px',
            opacity: 0,
            x: -50,
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
          { opacity: 0, x: -30 },
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

      if (albumRef.current) {
        gsap.fromTo(
          albumRef.current,
          {
            opacity: 0,
            y: 56,
            scale: 0.94,
            clipPath: 'inset(18% 8% 20% 8% round 26px)',
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0% round 26px)',
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: albumRef.current,
              start: 'top 82%',
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

      gsap.fromTo(
        '.latest-social-item',
        { y: 24, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none play reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: 'Beatport', icon: 'simple-icons:beatport', url: 'https://www.beatport.com/artist/ehdu/928516' },
    { name: 'Spotify', icon: 'simple-icons:spotify', url: 'https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o?si=-DI8ipqRQzW_EcwaA5fEaw&nd=1&dlsi=969c082138f54b26' },
    { name: 'Soundcloud', icon: 'simple-icons:soundcloud', url: 'https://soundcloud.com/ehdumusic' },
  ];

  return (
    <section id="latest" ref={sectionRef} className="py-20 px-6 md:px-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <p
            ref={subtitleRef}
            className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4"
          >
            {t.latest.subtitle}
          </p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
            style={{
              backgroundSize: '0% 3px',
              backgroundPosition: 'left bottom',
            }}
          >
            {renderGlitchChars(t.latest.title)}
          </h2>
        </div>

        <div className="mt-12">
          <motion.div
            ref={albumRef}
            className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(139,0,255,0.15)] border border-white/10"
          >
            <iframe 
              data-testid="embed-iframe" 
              style={{ borderRadius: '0px', background: 'transparent' }} 
              src="https://open.spotify.com/embed/artist/5gKvdLCO9jxUgCqWNnpd4o?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {socialLinks.map((link, idx) => (
            <motion.a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15, y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="latest-social-item group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/10"
              data-reveal-item
              data-section="latest"
              style={{ willChange: 'transform, opacity' }}
              aria-label={link.name}
              title={link.name}
            >
              <div className="relative">
                <Icon icon={link.icon} width="48" height="48" className="text-cyan-400/80 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="absolute inset-0 blur-xl bg-cyan-400/0 group-hover:bg-cyan-400/30 transition-all duration-500 rounded-full" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-cyan-400 transition-colors duration-300">{link.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestSection;
