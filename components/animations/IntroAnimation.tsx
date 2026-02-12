import React, { useEffect, useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface IntroAnimationProps {
  onComplete?: () => void;
}

type LoaderPhase = 'revealing' | 'typography' | 'splitting';
type DeviceTier = 'mobile' | 'tablet' | 'desktop';

const LOADER_IMAGES = [
  '/Cover/loader1.webp',//div1
  '/Cover/loader8.webp',//div2
  '/Cover/loader4.webp',//div3
  '/Cover/loader5.webp',//div5
  '/Cover/loader6.webp',//div6
  '/Cover/loader7.webp',//div7
  '/Cover/loader3.webp',//div8
  '/Cover/loader2.webp',//div9
];

const TIMINGS = {
  ACT1_REVEAL: 1200,
  ACT2_TYPOGRAPHY: 1200,
  SPLIT_DOORS: 900,
};

const getTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'desktop';
  if (window.innerWidth <= 680) return 'mobile';
  if (window.innerWidth <= 1100) return 'tablet';
  return 'desktop';
};

const getGridConfig = (tier: DeviceTier) => {
  if (tier === 'mobile') return { letterSize: 250, letterSpacing: -14 };
  if (tier === 'tablet') return { letterSize: 290, letterSpacing: -18 };
  return { letterSize: 340, letterSpacing: -24 };
};

const TILE_LAYOUT = [
  { className: 'div1', colStart: 1, rowStart: 1, colSpan: 2, rowSpan: 3 },
  { className: 'div2', colStart: 3, rowStart: 1, colSpan: 5, rowSpan: 3 },
  { className: 'div3', colStart: 8, rowStart: 1, colSpan: 3, rowSpan: 5 },
  { className: 'div5', colStart: 1, rowStart: 4, colSpan: 4, rowSpan: 3 },
  { className: 'div6', colStart: 5, rowStart: 6, colSpan: 6, rowSpan: 5 },
  { className: 'div7', colStart: 5, rowStart: 4, colSpan: 3, rowSpan: 2 },
  { className: 'div8', colStart: 1, rowStart: 7, colSpan: 2, rowSpan: 4 },
  { className: 'div9', colStart: 3, rowStart: 7, colSpan: 2, rowSpan: 4 },
];

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<LoaderPhase>('revealing');
  const [isVisible, setIsVisible] = useState(true);
  const [tier, setTier] = useState<DeviceTier>(getTier);
  const maskId = useId().replace(/:/g, '-');

  useEffect(() => {
    const onResize = () => setTier(getTier());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const toTypography = window.setTimeout(() => {
      setPhase('typography');
    }, TIMINGS.ACT1_REVEAL);

    const toSplit = window.setTimeout(() => {
      setPhase('splitting');
    }, TIMINGS.ACT1_REVEAL + TIMINGS.ACT2_TYPOGRAPHY);

    const finish = window.setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, TIMINGS.ACT1_REVEAL + TIMINGS.ACT2_TYPOGRAPHY + TIMINGS.SPLIT_DOORS);

    return () => {
      window.clearTimeout(toTypography);
      window.clearTimeout(toSplit);
      window.clearTimeout(finish);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('splitting');
    window.setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, TIMINGS.SPLIT_DOORS);
  };

  const { letterSize, letterSpacing } = getGridConfig(tier);

  const tiles = useMemo(() => {
    const gridCenterX = 5.5;
    const gridCenterY = 5.5;
    const maxDist = Math.hypot(gridCenterX - 1, gridCenterY - 1);

    return TILE_LAYOUT.map((tile, index) => {
      const tileCenterX = tile.colStart + (tile.colSpan / 2) - 0.5;
      const tileCenterY = tile.rowStart + (tile.rowSpan / 2) - 0.5;
      const centerDist = Math.hypot(tileCenterX - gridCenterX, tileCenterY - gridCenterY);
      const distanceNorm = Math.min(1, centerDist / maxDist);
      const jitter = ((Math.sin(index * 1.31) + 1) * 0.5) * 0.03;
      const delay = distanceNorm * 0.55 + jitter;

      return {
        key: tile.className,
        className: tile.className,
        colStart: tile.colStart,
        rowStart: tile.rowStart,
        colSpan: tile.colSpan,
        rowSpan: tile.rowSpan,
        imageUrl: LOADER_IMAGES[index % LOADER_IMAGES.length],
        delay,
        distanceNorm,
      };
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[99999] overflow-hidden ${phase === 'splitting' ? 'bg-transparent' : 'bg-black'}`}>
      <div
        className="wave-grid absolute inset-0"
        style={{ background: phase === 'splitting' ? 'transparent' : '#000' }}
      >
        {tiles.map((tile) => (
          <WaveTile
            key={tile.key}
            className={tile.className}
            colStart={tile.colStart}
            rowStart={tile.rowStart}
            colSpan={tile.colSpan}
            rowSpan={tile.rowSpan}
            imageUrl={tile.imageUrl}
            delay={tile.delay}
            distanceNorm={tile.distanceNorm}
            tier={tier}
            phase={phase}
          />
        ))}
      </div>

      {phase === 'revealing' && (
        <div className="absolute inset-0 pointer-events-none z-[3]">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="ripple-ring"
              initial={{ scale: 0.08, opacity: 0.35 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{
                duration: 1.2,
                delay: ring * 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {(phase === 'typography' || phase === 'splitting') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'splitting' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'splitting' ? 0.25 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask id={`ehdu-overlay-mask-${maskId}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
                  <rect x="0" y="0" width="1600" height="900" fill="white" />
                  <text
                    x="800"
                    y="470"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    fontSize={letterSize}
                    fontWeight="900"
                    letterSpacing={letterSpacing}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    EHDU
                  </text>
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="1600"
                height="900"
                fill="black"
                fillOpacity="0.9"
                mask={`url(#ehdu-overlay-mask-${maskId})`}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handleSkip} className="skip-btn">Skip</button>

      <style>{`
        .wave-grid {
          display: grid;
          width: 100%;
          height: 100%;
          grid-template-columns: repeat(10, 1fr);
          grid-template-rows: repeat(10, 1fr);
          gap: 0;
          background: #000;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .wave-tile {
          position: relative;
          overflow: hidden;
          border: 0;
          will-change: transform, opacity, filter;
          transform-style: preserve-3d;
          transform-origin: center center;
        }

        .wave-tile-cells {
          display: grid;
          width: 100%;
          height: 100%;
          gap: 0;
          position: relative;
        }

        .wave-cell {
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
        }

        .div1 { grid-column: span 2 / span 2; grid-row: span 3 / span 3; }
        .div2 { grid-column: span 5 / span 5; grid-row: span 3 / span 3; grid-column-start: 3; }
        .div3 { grid-column: span 3 / span 3; grid-row: span 5 / span 5; grid-column-start: 8; }
        .div5 { grid-column: span 4 / span 4; grid-row: span 3 / span 3; grid-row-start: 4; }
        .div6 { grid-column: span 6 / span 6; grid-row: span 5 / span 5; grid-column-start: 5; grid-row-start: 6; }
        .div7 { grid-column: span 3 / span 3; grid-row: span 2 / span 2; grid-column-start: 5; grid-row-start: 4; }
        .div8 { grid-column: span 2 / span 2; grid-row: span 4 / span 4; grid-row-start: 7; }
        .div9 { grid-column: span 2 / span 2; grid-row: span 4 / span 4; grid-column-start: 3; grid-row-start: 7; }

        .ripple-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(36vw, 520px);
          aspect-ratio: 1 / 1;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow: 0 0 28px rgba(255, 255, 255, 0.08);
        }

        .skip-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.22);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          z-index: 20;
        }

        .skip-btn:hover {
          color: #fff;
          border-color: rgba(0,240,255,0.5);
          background: rgba(0,240,255,0.12);
        }

        @media (max-width: 680px) {
          .wave-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(10, 1fr);
          }

          .div1 { grid-column: 1 / span 3; grid-row: 1 / span 3; }
          .div2 { grid-column: 4 / span 3; grid-row: 1 / span 3; }
          .div3 { grid-column: 1 / span 3; grid-row: 7 / span 3; }
          .div5 { grid-column: 4 / span 3; grid-row: 7 / span 3; }
          .div6 { display: none; }
          .div7 { display: none; }
          .div8 { display: none; }
          .div9 { grid-column: 2 / span 4; grid-row: 4 / span 3; }

          .skip-btn {
            top: 12px;
            right: 12px;
            padding: 6px 10px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

const WaveTile: React.FC<{
  className: string;
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
  imageUrl: string;
  delay: number;
  distanceNorm: number;
  tier: DeviceTier;
  phase: LoaderPhase;
}> = ({ className, colStart, rowStart, colSpan, rowSpan, imageUrl, delay, distanceNorm, tier, phase }) => {
  const lift = 30 * (1 - distanceNorm * 0.55);
  const splitDelay = delay * 0.85;
  const tiltSign = Math.sin(delay * 22) >= 0 ? 1 : -1;
  const subCols = Math.max(3, Math.min(10, Math.round(colSpan * (tier === 'mobile' ? 1.4 : 1.7))));
  const subRows = Math.max(3, Math.min(8, Math.round(rowSpan * (tier === 'mobile' ? 1.2 : 1.5))));
  const centerX = 5.5;
  const centerY = 5.5;
  const maxDist = Math.hypot(centerX - 1, centerY - 1) || 1;
  const cells = useMemo(() => {
    const items: Array<{ key: string; revealDelay: number; splitDelayValue: number; localNorm: number; bgX: number; bgY: number; }> = [];
    const localCenterX = (subCols - 1) / 2;
    const localCenterY = (subRows - 1) / 2;
    const localMaxDist = Math.hypot(localCenterX, localCenterY) || 1;

    for (let r = 0; r < subRows; r += 1) {
      for (let c = 0; c < subCols; c += 1) {
        const localNorm = Math.hypot(c - localCenterX, r - localCenterY) / localMaxDist;
        const absX = colStart + ((c + 0.5) / subCols) * colSpan - 0.5;
        const absY = rowStart + ((r + 0.5) / subRows) * rowSpan - 0.5;
        const globalNorm = Math.min(1, Math.hypot(absX - centerX, absY - centerY) / maxDist);
        const jitter = ((Math.sin((c + 1) * 1.23 + (r + 1) * 0.91) + 1) * 0.5) * 0.025;
        const revealDelay = globalNorm * 0.56 + localNorm * 0.11 + jitter;
        const splitDelayValue = globalNorm * 0.5 + (1 - localNorm) * 0.08 + jitter * 0.5;

        items.push({
          key: `${r}-${c}`,
          revealDelay,
          splitDelayValue,
          localNorm,
          bgX: subCols === 1 ? 50 : (c / (subCols - 1)) * 100,
          bgY: subRows === 1 ? 50 : (r / (subRows - 1)) * 100,
        });
      }
    }

    return items;
  }, [colSpan, colStart, rowSpan, rowStart, subCols, subRows]);

  return (
    <motion.div
      className={`wave-tile ${className}`}
      initial={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      animate={{
        opacity: phase === 'splitting' ? [1, 1, 0.95] : 1,
        scale: phase === 'splitting' ? [1, 1.005, 1] : 1,
        y: phase === 'splitting' ? [0, -(2 + distanceNorm * 4), 0] : 0,
        rotateX: phase === 'splitting' ? [0, 24, 78] : 0,
        rotateY: phase === 'splitting' ? [0, 6 * tiltSign, 18 * tiltSign] : 0,
        filter: phase === 'splitting'
            ? ['blur(0px)', 'blur(0px)', 'blur(3px)']
            : 'blur(0px)',
      }}
      transition={{
        delay: phase === 'splitting' ? splitDelay : delay,
        duration: phase === 'splitting' ? 0.62 : 1.05,
        times: phase === 'splitting' ? [0, 0.42, 1] : [0, 0.32, 0.62, 0.82, 1],
        ease: phase === 'splitting' ? [0.22, 1, 0.36, 1] : [0.16, 1, 0.3, 1],
      }}
    >
      <div className="wave-tile-cells" style={{ gridTemplateColumns: `repeat(${subCols}, 1fr)`, gridTemplateRows: `repeat(${subRows}, 1fr)` }}>
        {cells.map((cell) => {
          const localLift = lift * (1 - cell.localNorm * 0.55);
          return (
            <motion.div
              key={cell.key}
              className="wave-cell"
              initial={{ opacity: 0, scale: 0.78, y: 28, filter: 'blur(8px)' }}
              animate={{
                opacity: phase === 'splitting' ? [1, 1, 0] : 1,
                scale: phase === 'revealing'
                  ? [0.78, 1.07, 1.0, 1.012, 1.0]
                  : phase === 'splitting'
                    ? [1, 1.01, 0.92]
                    : 1,
                y: phase === 'revealing'
                  ? [28, -localLift, 0, -(localLift * 0.32), 0]
                  : phase === 'splitting'
                    ? [0, -(5 + cell.localNorm * 9), -(14 + cell.localNorm * 20)]
                    : 0,
                rotateX: phase === 'splitting' ? [0, 18, 68] : 0,
                rotateY: phase === 'splitting' ? [0, 4 * tiltSign, 12 * tiltSign] : 0,
                filter: phase === 'revealing'
                  ? ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
                  : phase === 'splitting'
                    ? ['blur(0px)', 'blur(0px)', 'blur(2px)']
                    : 'blur(0px)',
              }}
              transition={{
                delay: phase === 'splitting' ? cell.splitDelayValue : cell.revealDelay,
                duration: phase === 'splitting' ? 0.56 : 0.95,
                times: phase === 'splitting' ? [0, 0.4, 1] : [0, 0.32, 0.62, 0.82, 1],
                ease: phase === 'splitting' ? [0.22, 1, 0.36, 1] : [0.16, 1, 0.3, 1],
              }}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${subCols * 100}% ${subRows * 100}%`,
                backgroundPosition: `${cell.bgX}% ${cell.bgY}%`,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
