import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IMAGES = [
  '/Cover/loader1.webp',
  '/Cover/loader8.webp',
  '/Cover/loader4.webp',
  '/Cover/loader5.webp',
  '/Cover/loader6.webp',
  '/Cover/loader7.webp',
  '/Cover/loader3.webp',
  '/Cover/loader2.webp',
];

const CARD_HOLD = 0.12;
const CARD_FADE = 0.18;
const TOTAL_FLASH = IMAGES.length * CARD_HOLD; // ~0.96s
const IMPACT_DURATION = 0.95;
const LOGO_OFFSET_Y = -22;

interface IntroAnimationProps {
  onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const logo = logoRef.current;
    const logoWrap = logoWrapRef.current;
    const container = containerRef.current;

    if (!cards.length || !logo || !container || !logoWrap) {
      return;
    }

    gsap.set(cards, { opacity: 0, scale: 0.98, rotate: 0 });
    gsap.set(logoWrap, { opacity: 0, scale: 0.9, y: LOGO_OFFSET_Y });
    gsap.set(logo, { opacity: 1, scale: 1 });
    gsap.set(container, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });
    tlRef.current = tl;

    // Act 1: stack covers (stay visible)
    cards.forEach((card, i) => {
      const jitter = (i % 2 === 0 ? 1 : -1) * (2 + (i % 3));
      tl.to(
        card,
        { opacity: 1, scale: 1.02, rotate: jitter, y: i * -1, zIndex: i + 1, duration: CARD_FADE, ease: 'power1.out' },
        i * CARD_HOLD
      );
    });

    // Act 2: clear photos first, then logo impact (no overlap)
    tl.to(
      cards,
      {
        opacity: 0,
        scale: 0.94,
        y: 18,
        duration: 0.32,
        ease: 'power2.inOut',
        stagger: 0.015,
      },
      TOTAL_FLASH + 0.05
    );

    // Logo enters after photos are gone
    tl.to(
      logoWrap,
      { opacity: 1, scale: 1.02, y: LOGO_OFFSET_Y, duration: 0.45, ease: 'power3.out' },
      TOTAL_FLASH + 0.35
    );
    tl.to(
      logoWrap,
      { scale: 1.0, y: LOGO_OFFSET_Y, duration: 0.6, ease: 'power3.out' },
      TOTAL_FLASH + 0.6
    );
    // Act 3: fade out (so Hero feels continuous)
    tl.to(
      container,
      { opacity: 0, duration: 0.65, ease: 'power2.out' },
      TOTAL_FLASH + IMPACT_DURATION + 0.15
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  const handleSkip = () => {
    tlRef.current?.kill();
    setVisible(false);
    onComplete?.();
  };

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#050505',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background matches HeroSection */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(to bottom, rgba(88,28,135,0.2), rgba(0,0,0,1))',
          opacity: 1,
        }}
      />

      {/* Cards stack */}
      {IMAGES.map((src, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            width: 'clamp(200px, 26vw, 380px)',
            aspectRatio: '3/4',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            opacity: 0,
            boxShadow: '0 28px 72px rgba(0,0,0,0.85)',
            transformStyle: 'preserve-3d',
            zIndex: 4,
          }}
        />
      ))}

      {/* Logo */}
      <div
        ref={logoWrapRef}
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          paddingRight: 'clamp(16px, 4vw, 48px)',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <img
          ref={logoRef}
          src="/images/logohero.png"
          alt="EHDU"
          className="logo-glow"
          style={{
            width: '100%',
            maxWidth: '700px',
            height: 'auto',
            opacity: 1,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Skip */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          cursor: 'pointer',
        }}
      >
        Skip
      </button>
    </div>
  );
};

export default IntroAnimation;
