import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { runGlitchBurst } from '../animations/glitch';

gsap.registerPlugin(ScrollTrigger);

// Image preload utility
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Skeleton loader component
const ImageSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
  </div>
);

// Optimized image component with blur-up effect
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
}> = ({ src, alt, className, loading = 'lazy', onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && !hasError && <ImageSkeleton />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          contentVisibility: 'auto',
          containIntrinsicSize: '400px 300px',
        }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/30 text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export interface GalleryGridProps {
  photos?: PhotoItem[];
  layout?: 'grid' | 'carousel';
  showLightbox?: boolean;
  filter?: (photo: PhotoItem) => boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

// Gallery Item component for carousel
const GalleryCarouselItem: React.FC<{
  photo: PhotoItem;
  onClick: () => void;
  onHover: (id: string | null) => void;
  hoveredId: string | null;
}> = ({ photo, onClick, onHover, hoveredId }) => (
  <motion.div
    className="gallery-item flex-shrink-0 w-[280px] md:w-[350px] relative overflow-hidden group cursor-pointer rounded-2xl"
    onClick={onClick}
    onMouseEnter={() => onHover(photo.id)}
    onMouseLeave={() => onHover(null)}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.5 }}
    style={{
      boxShadow: hoveredId === photo.id
        ? '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(139, 0, 255, 0.1)'
        : '0 0 20px rgba(0, 0, 0, 0.35)',
      transition: 'box-shadow 0.5s ease',
    }}
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      <OptimizedImage
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="text-cyan-400 drop-shadow-lg" size={24} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white text-base font-bold tracking-wide">{photo.caption}</p>
      </div>
    </div>
  </motion.div>
);

// Gallery Item component for grid
const GalleryGridItem: React.FC<{
  photo: PhotoItem;
  onClick: () => void;
  onHover: (id: string | null) => void;
  hoveredId: string | null;
  index: number;
}> = ({ photo, onClick, onHover, hoveredId, index }) => (
  <motion.div
    className="gallery-photo-item relative overflow-hidden group cursor-pointer rounded-2xl"
    onClick={onClick}
    onMouseEnter={() => onHover(photo.id)}
    onMouseLeave={() => onHover(null)}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    style={{
      boxShadow: hoveredId === photo.id
        ? '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(139, 0, 255, 0.1)'
        : '0 0 20px rgba(0, 0, 0, 0.35)',
      transition: 'box-shadow 0.5s ease',
    }}
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="text-cyan-400 drop-shadow-lg" size={24} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white text-base font-bold tracking-wide">{photo.caption}</p>
      </div>
    </div>
  </motion.div>
);

const GalleryGrid: React.FC<GalleryGridProps> = ({
  photos,
  layout = 'grid',
  showLightbox = true,
  filter,
  className = '',
  title,
  subtitle,
}) => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  // For carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const autoDirectionRef = useRef<1 | -1>(1);
  const pauseAutoUntilRef = useRef(0);

  // Use provided photos or filter default PHOTO_GALLERY
  const displayPhotos = photos || (
    filter 
      ? require('../../constants').PHOTO_GALLERY.filter(filter)
      : require('../../constants').PHOTO_GALLERY
  );

  // Preload images
  useEffect(() => {
    const preloadGallery = async () => {
      try {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const criticalCount = isMobile ? 2 : 4;
        const criticalImages = displayPhotos.slice(0, criticalCount).map(p => preloadImage(p.src));
        await Promise.all(criticalImages);
        const remainingImages = displayPhotos.slice(criticalCount).map(p => preloadImage(p.src));
        Promise.all(remainingImages).catch(() => {});
        setImagesPreloaded(true);
      } catch {
        setImagesPreloaded(true);
      }
    };
    preloadGallery();
  }, [displayPhotos]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { backgroundSize: '0% 3px', opacity: 0, x: -50 },
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

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isMobile && !reducedMotion) {
          ScrollTrigger.create({
            trigger: titleRef.current,
            start: 'top 85%',
            onEnter: () => {
              if (titleRef.current) runGlitchBurst(titleRef.current);
            },
            onEnterBack: () => {
              if (titleRef.current) runGlitchBurst(titleRef.current);
            },
          });
        }
      }

      gsap.fromTo(
        layout === 'grid' ? '.gallery-photo-item' : '.gallery-item',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none play reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [layout]);

  // Carousel auto-scroll
  useEffect(() => {
    if (layout !== 'carousel' || !carouselRef.current) return;

    const viewport = carouselRef.current;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = window.innerWidth >= 1024 ? 16 : 12;

    const autoScrollRef = { rafId: 0, isPaused: false, lastTs: 0 };

    const onEnter = () => { autoScrollRef.isPaused = true; };
    const onLeave = () => { autoScrollRef.isPaused = false; };

    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);

    const step = (ts: number) => {
      if (!autoScrollRef.lastTs) autoScrollRef.lastTs = ts;
      const delta = Math.min((ts - autoScrollRef.lastTs) / 1000, 0.1);
      autoScrollRef.lastTs = ts;

      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const isProgrammaticPause = Date.now() < pauseAutoUntilRef.current;

      if (!isTouchDevice && !prefersReducedMotion && !autoScrollRef.isPaused && !isProgrammaticPause && maxScroll > 0) {
        let next = viewport.scrollLeft + autoDirectionRef.current * speed * delta;

        if (next <= 0) {
          next = 0;
          autoDirectionRef.current = 1;
        } else if (next >= maxScroll) {
          next = maxScroll;
          autoDirectionRef.current = -1;
        }

        viewport.scrollLeft = next;
      }

      autoScrollRef.rafId = window.requestAnimationFrame(step);
    };

    autoScrollRef.rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(autoScrollRef.rafId);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
    };
  }, [layout, displayPhotos.length]);

  // Carousel nudge functions
  const nudgeCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const cards = Array.from(carouselRef.current.querySelectorAll<HTMLElement>('.gallery-item'));
    if (!cards.length) return;

    const current = currentIndexRef.current;
    const targetIndex = direction === 'next' ? Math.min(current + 1, cards.length - 1) : Math.max(current - 1, 0);
    const targetCard = cards[targetIndex];
    if (!targetCard) return;

    currentIndexRef.current = targetIndex;
    autoDirectionRef.current = direction === 'next' ? 1 : -1;
    pauseAutoUntilRef.current = Date.now() + 1500;
    carouselRef.current.scrollTo({ left: targetCard.offsetLeft, behavior: 'auto' });
  };

  return (
    <section ref={containerRef} className={`py-20 px-6 md:px-20 relative overflow-hidden ${className}`}>
      {/* Background gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-16 text-left">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4"
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <h2
                ref={titleRef}
                className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
                style={{
                  backgroundSize: '0% 3px',
                  backgroundPosition: 'left bottom',
                }}
              >
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Gallery Content */}
        {layout === 'carousel' ? (
          <div className="relative">
            {/* Carousel Controls */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 hidden md:flex">
              <button
                onClick={() => nudgeCarousel('prev')}
                className="p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-cyan-400/20 hover:border-cyan-400/30 transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 hidden md:flex">
              <button
                onClick={() => nudgeCarousel('next')}
                className="p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-cyan-400/20 hover:border-cyan-400/30 transition-all"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4"
              style={{ scrollBehavior: 'auto' }}
            >
              {displayPhotos.map((photo) => (
                <GalleryCarouselItem
                  key={photo.id}
                  photo={photo}
                  onClick={() => showLightbox && setSelectedPhoto(photo.src)}
                  onHover={setHoveredPhoto}
                  hoveredId={hoveredPhoto}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Grid Layout */
          <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayPhotos.map((photo, idx) => (
              <GalleryGridItem
                key={photo.id}
                photo={photo}
                index={idx}
                onClick={() => showLightbox && setSelectedPhoto(photo.src)}
                onHover={setHoveredPhoto}
                hoveredId={hoveredPhoto}
              />
            ))}
          </div>
        )}
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {showLightbox && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Background noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />
            
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 z-10"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <X size={24} />
            </motion.button>
            
            {/* Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={selectedPhoto}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              style={{
                boxShadow: '0 0 100px rgba(0, 240, 255, 0.15), 0 0 200px rgba(139, 0, 255, 0.1)',
              }}
            />
            
            {/* Corner accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-400/30 rounded-br-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryGrid;
