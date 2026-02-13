import React from 'react';
import gsap from 'gsap';

export const renderGlitchChars = (text: string) =>
  Array.from(text).map((char, idx) => (
    <span key={`${char}-${idx}`} className="glitch-char inline-block will-change-transform">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

export const runGlitchBurst = (element: HTMLElement) => {
  const chars = element.querySelectorAll<HTMLElement>('.glitch-char');
  if (!chars.length) return;

  gsap.killTweensOf(chars);

  gsap.fromTo(
    chars,
    {
      x: 0,
      y: 0,
      opacity: 1,
      color: '#ffffff',
      textShadow: '0 0 0 rgba(0,0,0,0)',
    },
    {
      x: () => gsap.utils.random(-2, 2),
      y: () => gsap.utils.random(-1, 1),
      color: (index) => (index % 2 === 0 ? '#00F0FF' : '#8B00FF'),
      textShadow: '0 0 10px rgba(0, 240, 255, 0.55)',
      duration: 0.08,
      ease: 'steps(2)',
      stagger: {
        each: 0.016,
        from: 'random',
      },
      yoyo: true,
      repeat: 1,
      clearProps: 'x,y,color,textShadow',
    }
  );
};
