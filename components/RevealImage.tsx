import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RevealImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const RevealImage: React.FC<RevealImageProps> = ({ src, alt = '', className = '' }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        maskRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 1,
          ease: 'power2.inOut',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, filter: 'blur(10px)' },
        {
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={imageRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        backgroundColor: '#000',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div
        ref={maskRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '0%',
          height: '100%',
          backgroundColor: '#000',
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default RevealImage;
