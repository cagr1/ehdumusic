import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../i18n/LanguageContext';
import ParticleText from '../ParticleText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LatestSection: React.FC = () => {
  const { t } = useLanguage();
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { backgroundSize: '0% 2px' },
          {
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: 'top 85%',
              once: false,
            },
            backgroundSize: '100% 2px',
            duration: 1.8,
            ease: 'power2.inOut',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: 'Beatport', icon: 'simple-icons:beatport', url: 'https://www.beatport.com/artist/ehdu/928516' },
    { name: 'Spotify', icon: 'simple-icons:spotify', url: 'https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o?si=-DI8ipqRQzW_EcwaA5fEaw&nd=1&dlsi=969c082138f54b26' },
    { name: 'Soundcloud', icon: 'simple-icons:soundcloud', url: 'https://soundcloud.com/ehdumusic' },
  ];

  return (
    <section id="latest" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.p
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-left bg-repeat-x"
            style={{
              backgroundSize: '0% 2px',
              backgroundPosition: 'left bottom',
              width: 'fit-content',
            }}
          >
            {t.latest.subtitle}
          </motion.p>
          <ParticleText
            text={t.latest.title}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter"
            particleCount={80}
            particleSize={4}
            particleSpeed={0.3}
          />
        </div>

        <div className="mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 border border-transparent hover:border-white/10"
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
