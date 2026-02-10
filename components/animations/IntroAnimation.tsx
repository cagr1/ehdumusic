import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete?: () => void;
}

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

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // All 8 images with wider spread
  const imageData = useMemo(() => {
    const shuffled = [...LOADER_IMAGES].sort(() => Math.random() - 0.5);
    return shuffled.map((src, i) => ({
      id: i,
      src,
      left: `${5 + Math.random() * 90}%`,
      top: `${5 + Math.random() * 90}%`,
      rotation: Math.random() * 25 - 12,
      scale: 1.0 + Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        },
      });

      timelineRef.current = tl;

      // 0s: Images fade in
      tl.to('.loader-img', {
        opacity: 0.7,
        scale: 1.1,
        duration: 1,
        stagger: {
          each: 0.12,
          from: 'random',
        },
        ease: 'power2.out',
      }, 0);

      // 0s: Bars draw up from bottom (simultaneous with images)
      tl.fromTo(
        '.wave-bar',
        { 
          scaleY: 0,
          opacity: 1,
        },
        {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
        },
        0
      );

      // 0.8s: Bars bounce
      tl.to('.wave-bar', {
        scaleY: (i) => 0.5 + Math.random() * 0.4,
        duration: 0.3,
        yoyo: true,
        repeat: 2,
        stagger: {
          each: 0.05,
          repeat: 2,
        },
        ease: 'sine.inOut',
      }, '+=0');

      // 2.0s: Bars stretch wide
      tl.to('.wave-bar', {
        width: 110,
        height: 170,
        borderRadius: 12,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
      }, '+=0.2');

      // 2.4s: Hide bars BEFORE letters appear
      tl.to('.wave-bar', {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      }, '+=0');

      // 2.6s: Letters emerge (bars already hidden)
      tl.fromTo(
        '.letter',
        { y: 250, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '+=0.2'
      );

      // 3.3s: Logo pulse
      tl.to('.logo-container', {
        scale: 1.08,
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, '+=0');

      // 3.7s: Fade out
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, '+=0');
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });
  };

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="loader-container">
      <style>{`
        /* EHDU INTRO ANIMATION */

        .loader-container {
          position: fixed;
          inset: 0;
          background: #000000;
          z-index: 99999;
          overflow: hidden;
        }

        .loader-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .loader-img {
          position: absolute;
          width: 320px;
          height: 200px;
          object-fit: cover;
          opacity: 0;
          border-radius: 14px;
          filter: brightness(0.75) saturate(1.2);
          will-change: opacity, transform;
        }

        .cyan-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(0, 240, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(139, 0, 255, 0.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: 2;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
          pointer-events: none;
          z-index: 3;
        }

        .waves-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 22px;
          align-items: flex-end;
          z-index: 5;
        }

        .wave-bar {
          width: 24px;
          height: 130px;
          background: linear-gradient(to top, #00F0FF, #8B00FF);
          border-radius: 8px;
          box-shadow: 0 0 25px currentColor;
          position: relative;
          transform-origin: bottom;
        }

        /* Animated gradient like LiquidText */
        @keyframes liquidGradient {
          0%, 100% { 
            background: linear-gradient(180deg, #00F0FF 0%, #8B00FF 50%, #00F0FF 100%);
          }
          50% { 
            background: linear-gradient(180deg, #8B00FF 0%, #00F0FF 50%, #8B00FF 100%);
          }
        }

        .logo-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 6px;
          z-index: 6;
        }

        .letter {
          font-size: 150px;
          font-weight: 900;
          font-family: 'Arial Black', 'Impact', sans-serif;
          background: linear-gradient(180deg, #00F0FF 0%, #8B00FF 100%);
          animation: liquidGradient 4s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          position: relative;
          line-height: 0.85;
          text-shadow: 0 0 20px rgba(0,240,255,0.7), 0 0 40px rgba(139,0,255,0.4);
          will-change: transform, opacity, background;
        }

        .skip-btn {
          position: absolute;
          top: 30px;
          right: 30px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
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
          color: #ffffff;
          background: rgba(0, 240, 255, 0.15);
          border-color: rgba(0, 240, 255, 0.4);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .loader-img {
            width: 260px;
            height: 160px;
          }
          .wave-bar {
            width: 18px;
            height: 105px;
          }
          .letter {
            font-size: 115px;
          }
        }

        @media (max-width: 768px) {
          .loader-img {
            width: 200px;
            height: 125px;
          }
          .wave-bar {
            width: 14px;
            height: 85px;
            gap: 16px;
          }
          .letter {
            font-size: 82px;
          }
          .waves-container {
            gap: 16px;
          }
          .skip-btn {
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .loader-img {
            width: 150px;
            height: 95px;
          }
          .wave-bar {
            width: 10px;
            height: 65px;
            gap: 10px;
          }
          .letter {
            font-size: 58px;
          }
          .waves-container {
            gap: 10px;
          }
        }
      `}</style>

      {/* Background Layer */}
      <div className="loader-bg">
        {imageData.map((img) => (
          <img
            key={img.id}
            className="loader-img"
            src={img.src}
            alt=""
            style={{
              left: img.left,
              top: img.top,
              transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ))}
        <div className="cyan-overlay" />
        <div className="vignette" />
      </div>

      {/* Wave Bars */}
      <div className="waves-container">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="wave-bar" />
        ))}
      </div>

      {/* EHDU Letters */}
      <div className="logo-container">
        {['E', 'H', 'D', 'U'].map((letter, i) => (
          <span key={i} className="letter">
            {letter}
          </span>
        ))}
      </div>

      {/* Skip Button */}
      <button onClick={handleSkip} className="skip-btn">
        Skip
      </button>
    </div>
  );
};

export default IntroAnimation;
