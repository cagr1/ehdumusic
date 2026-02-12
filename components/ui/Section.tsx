import React, { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  reverseLayout?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className, title, subtitle, reverseLayout = false }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with direction based on layout
      if (titleRef.current) {
        const isRightAligned = reverseLayout;
        gsap.fromTo(
          titleRef.current,
          {
            backgroundSize: '0% 3px',
            opacity: 0,
            x: isRightAligned ? 50 : -50, // Right to left if right-aligned, left to right if left-aligned
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
        const isRightAligned = reverseLayout;
        gsap.fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            x: isRightAligned ? 30 : -30,
          },
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
    });

    return () => ctx.revert();
  }, [reverseLayout]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {title && (
          <motion.div 
            className={`mb-16 ${reverseLayout ? 'text-right' : 'text-left'}`}
            initial={{ opacity: 0, x: reverseLayout ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            {subtitle && <p ref={subtitleRef} className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">{subtitle}</p>}
            <h2
              ref={titleRef}
              className="text-3xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
              style={{
                backgroundSize: '0% 3px',
                backgroundPosition: 'left bottom',
              }}
            >
              {title}
            </h2>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
