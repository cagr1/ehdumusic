
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
}

const Section: React.FC<SectionProps> = ({ children, id, className, title, subtitle }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { backgroundSize: '0% 2px' },
          {
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              once: true,
            },
            backgroundSize: '100% 2px',
            duration: 1.2,
            ease: 'power2.inOut',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full"
      >
        {(title || subtitle) && (
          <div className="mb-16">
            {subtitle && (
              <motion.p 
                ref={subtitleRef}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-cyan-400 font-bold tracking-[0.3em] text-xs uppercase mb-2"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <motion.h2 
                ref={titleRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent bg-no-repeat bg-bottom"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
