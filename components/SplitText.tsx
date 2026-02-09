import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  triggerOnScroll?: boolean;
}

const SplitText: React.FC<SplitTextProps> = ({ children, className = '', triggerOnScroll = true }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const words = text.innerText.split(' ');
    text.innerHTML = words
      .map((word) => `<span style="display:inline-block; overflow:hidden;"><span style="display:inline-block;">${word}</span></span>`)
      .join(' ');

    const spans = text.querySelectorAll('span span');
    const ctx = gsap.context(() => {
      if (triggerOnScroll) {
        gsap.fromTo(
          spans,
          { y: 100, opacity: 0 },
          {
            scrollTrigger: {
              trigger: text,
              start: 'top 75%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out',
          }
        );
      } else {
        gsap.fromTo(
          spans,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'back.out' }
        );
      }
    });

    return () => ctx.revert();
  }, [triggerOnScroll]);

  return <div ref={textRef} className={className} />;
};

export default SplitText;
