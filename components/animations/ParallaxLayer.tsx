import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  yRange?: number;
  opacity?: number;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  disabledOnMobile?: boolean;
  fadeInOut?: boolean;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className = '',
  speed = 0.4,
  yRange = 220,
  opacity = 0.2,
  imageSrc,
  imageAlt = '',
  imageClassName = '',
  disabledOnMobile = true,
  fadeInOut = true,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: layerRef,
    offset: ['start end', 'end start'],
  });

  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [-yRange * speed, yRange * speed]);
  const dynamicOpacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.82, 1],
    fadeInOut ? [0, opacity * 0.85, opacity, opacity * 0.85, 0] : [opacity, opacity, opacity, opacity, opacity]
  );

  return (
    <motion.div
      ref={layerRef}
      style={{ y, opacity: dynamicOpacity }}
      className={`${className} ${disabledOnMobile ? 'hidden md:block' : ''}`}
      aria-hidden="true"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className={imageClassName}
          loading="lazy"
          decoding="async"
        />
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ParallaxLayer;
