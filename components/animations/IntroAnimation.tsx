import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete?: () => void;
}

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

// All 8 loader images
const LOADER_IMAGES = [
  '/Cover/loader1.webp',
  '/Cover/loader2.webp',
  '/Cover/loader3.webp',
  '/Cover/loader4.webp',
  '/Cover/loader5.webp',
  '/Cover/loader6.webp',
  '/Cover/loader7.webp',
  '/Cover/loader8.webp',
];

const getDeviceTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (width <= 820 || (isCoarsePointer && width <= 900)) {
    return 'mobile';
  }

  if (width <= 1280) {
    return 'tablet';
  }

  return 'desktop';
};

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [deviceTier, setDeviceTier] = useState<DeviceTier>(getDeviceTier);

  useEffect(() => {
    const updateTier = () => setDeviceTier(getDeviceTier());
    updateTier();
    window.addEventListener('resize', updateTier);
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  // How many images to show per tier
  const visibleImageCount = useMemo(() => {
    if (deviceTier === 'mobile') return 4;   // Show 4 images on mobile
    if (deviceTier === 'tablet') return 6;   // Show 6 images on tablet
    return 8;                                 // Show all 8 on desktop
  }, [deviceTier]);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Find the hero logo for handoff calculation
    const getLogoHandoffTarget = () => {
      const loaderLogo = containerRef.current?.querySelector('.logo-grid-item') as HTMLElement | null;
      const heroLogo = document.querySelector(
        'img[src*="logohero"], img[src*="EHDU-LOGO-CROMADO"], img[src*="LOGO-CROMADO"]'
      ) as HTMLElement | null;

      if (!loaderLogo || !heroLogo) {
        const fallbackScale = deviceTier === 'desktop' ? 10 : deviceTier === 'tablet' ? 7 : 4.5;
        return { x: 0, y: 0, scale: fallbackScale };
      }

      const from = loaderLogo.getBoundingClientRect();
      const to = heroLogo.getBoundingClientRect();

      if (!from.width || !from.height || !to.width || !to.height) {
        const fallbackScale = deviceTier === 'desktop' ? 10 : deviceTier === 'tablet' ? 7 : 4.5;
        return { x: 0, y: 0, scale: fallbackScale };
      }

      const x = (to.left + to.width / 2) - (from.left + from.width / 2);
      const y = (to.top + to.height / 2) - (from.top + from.height / 2);

      const scaleFromWidth = to.width / from.width;
      const maxScale = deviceTier === 'desktop' ? 14 : deviceTier === 'tablet' ? 10 : 6;
      const scale = gsap.utils.clamp(1, maxScale, scaleFromWidth);

      return { x, y, scale };
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      if (prefersReducedMotion) {
        tl.fromTo('.loader-img',
          { opacity: 0 },
          { opacity: 0.95, duration: 0.45, stagger: 0.03, ease: 'power1.out' },
          0
        );
        tl.to(containerRef.current, {
          opacity: 0, duration: 0.25, ease: 'power1.inOut',
          onComplete: () => { setIsVisible(false); onComplete?.(); },
        }, '+=0.45');
        return;
      }

      // ── PHASE 1: Progressive tile reveal (all tiers) ──
      if (deviceTier !== 'mobile') {
        tl.fromTo('.loader-img',
          {
            opacity: 0,
            scale: 1,
            filter: deviceTier === 'desktop'
              ? 'brightness(0.35) saturate(0.6) blur(14px)'
              : 'brightness(0.5) saturate(0.8) blur(8px)',
            clipPath: deviceTier === 'desktop'
              ? 'inset(48% 48% 48% 48% round 12px)'
              : 'inset(45% 45% 45% 45% round 8px)',
          },
          {
            opacity: 0.94,
            scale: 1,
            filter: 'brightness(0.92) saturate(1.15) blur(0px)',
            clipPath: 'inset(0% 0% 0% 0% round 8px)',
            duration: deviceTier === 'desktop' ? 1.1 : 0.9,
            stagger: {
              each: deviceTier === 'desktop' ? 0.065 : 0.06,
              from: 'random',
            },
            ease: 'expo.out',
          },
          0
        );

        // Subtle breathing
        tl.to('.loader-img', {
          scale: 1.015,
          duration: deviceTier === 'desktop' ? 1.8 : 1.2,
          stagger: { each: 0.04, repeat: 1, yoyo: true },
          ease: 'sine.inOut',
        }, deviceTier === 'desktop' ? 0.6 : 0.5);
      }

      // Mobile: show images with a simpler reveal
      if (deviceTier === 'mobile') {
        tl.fromTo('.loader-img',
          {
            opacity: 0,
            scale: 1,
            filter: 'brightness(0.5) saturate(0.8) blur(6px)',
            clipPath: 'inset(40% 40% 40% 40% round 8px)',
          },
          {
            opacity: 0.9,
            scale: 1,
            filter: 'brightness(0.9) saturate(1.1) blur(0px)',
            clipPath: 'inset(0% 0% 0% 0% round 8px)',
            duration: 0.7,
            stagger: { each: 0.08, from: 'random' },
            ease: 'power3.out',
          },
          0
        );
      }

      // Logo reveal (all tiers)
      tl.fromTo('.logo-grid-item',
        { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: deviceTier === 'mobile' ? 0.6 : 0.5,
          ease: 'power3.out',
        },
        deviceTier === 'mobile' ? 0.15 : 0.3
      );

      // ── PHASE 2: Transition ──
      const transLabel = 'transition';
      tl.addLabel(transLabel, deviceTier === 'mobile' ? '+=0.25' : '+=0.1');

      // Blur overlay
      tl.to('.loader-bg-overlay', {
        backdropFilter: deviceTier === 'desktop' ? 'blur(25px)' : deviceTier === 'tablet' ? 'blur(20px)' : 'blur(15px)',
        backgroundColor: deviceTier === 'desktop' ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.65)',
        duration: deviceTier === 'desktop' ? 0.7 : 0.55,
        ease: 'power2.inOut',
      }, transLabel);

      // Fade out images
      tl.to('.loader-img', {
        opacity: 0,
        filter: 'brightness(0.35) saturate(0.6) blur(15px)',
        duration: deviceTier === 'desktop' ? 0.55 : 0.45,
        stagger: { each: 0.02, from: 'edges' },
        ease: 'power2.inOut',
      }, transLabel);

      // Logo handoff
      tl.set('.logo-grid-item', {
        zIndex: 60,
        transformOrigin: '50% 50%',
        force3D: true,
      });

      tl.to('.logo-grid-item', {
        x: () => getLogoHandoffTarget().x,
        y: () => getLogoHandoffTarget().y,
        scale: () => getLogoHandoffTarget().scale,
        duration: deviceTier === 'desktop' ? 0.7 : 0.6,
        ease: 'expo.inOut',
      }, `${transLabel}+=0.1`);

      // Final fade
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power1.in',
        onComplete: () => { setIsVisible(false); onComplete?.(); },
      }, '-=0.15');
    }, containerRef);

    return () => { ctx.revert(); };
  }, [onComplete, deviceTier]);

  const handleSkip = () => {
    if (timelineRef.current) timelineRef.current.kill();
    gsap.to(containerRef.current, {
      opacity: 0, duration: 0.5, ease: 'power2.out',
      onComplete: () => { setIsVisible(false); onComplete?.(); },
    });
  };

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="loader-container">
      <style>{`
        /* ═══════════════════════════════════════════
           EHDU INTRO – Fully Responsive Grid
           ═══════════════════════════════════════════ */

        .loader-container {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 99999;
          overflow: hidden;
          will-change: opacity, filter;
        }

        .loader-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .loader-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.15);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          pointer-events: none;
          z-index: 5;
          transition: none;
        }

        .cyan-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 2;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          z-index: 3;
        }

        /* ── IMAGES GRID ── */
        /* Desktop: 12-col × 9-row */
        .images-grid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(9, 1fr);
          gap: 9px;
          width: 92%;
          max-width: 1600px;
          height: 85%;
          max-height: 900px;
        }

        .loader-img {
          position: relative;
          object-fit: cover;
          opacity: 0;
          border-radius: 8px;
          filter: brightness(0.85) saturate(1.1);
          will-change: opacity, filter, clip-path;
          width: 100%;
          height: 100%;
          overflow: hidden;
          transform: translateZ(0);
        }

        /* ── Desktop grid positions (12-col) ── */
        .div1 { grid-column: span 3; grid-row: span 3; }
        .div2 { grid-column: 4 / span 2; grid-row: 2 / span 4; }
        .div3 { grid-column: 8 / span 2; grid-row: 4 / span 3; }
        .div4 { grid-column: 5 / span 2; grid-row: 6 / span 4; }
        .div5 { grid-column: 1 / span 3; grid-row: 5 / span 4; }
        .div6 { grid-column: 10 / span 3; grid-row: 2 / span 3; }
        .div7 { grid-column: 6 / span 4; grid-row: 1 / span 3; }
        .div8 { grid-column: 8 / span 4; grid-row: 7 / span 3; }

        /* Logo cell */
        .div9 {
          grid-column: 7;
          grid-row: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .logo-grid-item {
          position: relative;
          z-index: 20;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        .logo-grid-image {
          width: 80%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 25px rgba(0,240,255,0.9));
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* ── Skip button ── */
        .skip-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .skip-btn:hover {
          color: #fff;
          background: rgba(0,240,255,0.15);
          border-color: rgba(0,240,255,0.4);
          box-shadow: 0 0 20px rgba(0,240,255,0.3);
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           ═══════════════════════════════════════════ */

        /* ── Large desktop ≤ 1400px ── */
        @media (max-width: 1400px) {
          .images-grid { gap: 7px; width: 95%; }
          .loader-img { border-radius: 6px; }
        }

        /* ── Tablet landscape / small desktop ≤ 1024px ──
             Switch to 8-col × 8-row, hide div7 & div8 */
        @media (max-width: 1024px) {
          .images-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            gap: 6px;
            width: 94%;
            height: 80%;
          }
          /* Reposition images for 8-col grid */
          .div1 { grid-column: 1 / span 3; grid-row: 1 / span 3; }
          .div2 { grid-column: 4 / span 2; grid-row: 1 / span 3; }
          .div3 { grid-column: 6 / span 3; grid-row: 1 / span 3; }
          .div4 { grid-column: 1 / span 3; grid-row: 4 / span 2; }
          .div5 { grid-column: 6 / span 3; grid-row: 4 / span 2; }
          .div6 { grid-column: 1 / span 3; grid-row: 6 / span 3; }
          .div7 { display: none; }
          .div8 { display: none; }
          .div9 {
            grid-column: 4 / span 2;
            grid-row: 4 / span 2;
          }
          .logo-grid-image { width: 90%; }
        }

        /* ── Tablet portrait ≤ 820px ──
             Switch to 6-col × 10-row, show 4 images */
        @media (max-width: 820px) {
          .images-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(10, 1fr);
            gap: 5px;
            width: 96%;
            height: 88%;
            max-height: none;
          }
          .div1 { grid-column: 1 / span 3; grid-row: 1 / span 3; }
          .div2 { grid-column: 4 / span 3; grid-row: 1 / span 3; }
          .div3 { grid-column: 1 / span 3; grid-row: 7 / span 3; }
          .div4 { grid-column: 4 / span 3; grid-row: 7 / span 3; }
          .div5 { display: none; }
          .div6 { display: none; }
          .div7 { display: none; }
          .div8 { display: none; }
          .div9 {
            grid-column: 2 / span 4;
            grid-row: 4 / span 3;
          }
          .logo-grid-image { width: 100%; }
          .skip-btn {
            top: 16px; right: 16px;
            padding: 8px 18px;
            font-size: 11px;
            letter-spacing: 1.5px;
          }
        }

        /* ── Mobile landscape ≤ 680px ── */
        @media (max-width: 680px) and (orientation: landscape) {
          .images-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(4, 1fr);
            gap: 4px;
            width: 96%;
            height: 90%;
          }
          .div1 { grid-column: 1 / span 2; grid-row: 1 / span 2; }
          .div2 { grid-column: 1 / span 2; grid-row: 3 / span 2; }
          .div3 { grid-column: 7 / span 2; grid-row: 1 / span 2; }
          .div4 { grid-column: 7 / span 2; grid-row: 3 / span 2; }
          .div5 { display: none; }
          .div6 { display: none; }
          .div7 { display: none; }
          .div8 { display: none; }
          .div9 {
            grid-column: 3 / span 4;
            grid-row: 1 / span 4;
          }
          .logo-grid-image { width: 90%; }
        }

        /* ── Mobile portrait ≤ 480px ── */
        @media (max-width: 480px) and (orientation: portrait) {
          .images-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(8, 1fr);
            gap: 4px;
            width: 96%;
            height: 92%;
            max-height: none;
          }
          .div1 { grid-column: 1 / span 2; grid-row: 1 / span 2; }
          .div2 { grid-column: 3 / span 2; grid-row: 1 / span 2; }
          .div3 { grid-column: 1 / span 2; grid-row: 7 / span 2; }
          .div4 { grid-column: 3 / span 2; grid-row: 7 / span 2; }
          .div5 { display: none; }
          .div6 { display: none; }
          .div7 { display: none; }
          .div8 { display: none; }
          .div9 {
            grid-column: 1 / span 4;
            grid-row: 3 / span 4;
          }
          .logo-grid-image { width: 100%; }
          .loader-img { border-radius: 5px; }
          .skip-btn {
            top: 12px; right: 12px;
            padding: 6px 14px;
            font-size: 9px;
            letter-spacing: 1px;
          }
        }

        /* ── Very small screens ≤ 360px ── */
        @media (max-width: 360px) {
          .images-grid {
            gap: 3px;
            width: 98%;
            height: 94%;
          }
          .div9 {
            grid-column: 1 / span 4;
            grid-row: 3 / span 4;
          }
          .loader-img { border-radius: 4px; }
        }
      `}</style>

      {/* Background Layer */}
      <div className="loader-bg">
        <div className="loader-bg-overlay" />
        <div className="cyan-overlay" />
        <div className="vignette" />

        {/* Images Grid */}
        <div className="images-grid">
          {LOADER_IMAGES.slice(0, visibleImageCount).map((src, i) => (
            <img
              key={i}
              className={`loader-img div${i + 1}`}
              src={src}
              alt=""
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ))}

          {/* Logo cell */}
          <div className="div9 logo-grid-item">
            <img
              className="logo-grid-image"
              src="/images/logocover.png"
              alt="EHDU Logo"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button onClick={handleSkip} className="skip-btn">
        Skip
      </button>
    </div>
  );
};

export default IntroAnimation;
