import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, Eye, X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MEDIA_GALLERY, PHOTO_GALLERY } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';
import VideoModal from '../VideoModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { renderGlitchChars, runGlitchBurst } from '../animations/glitch';

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
    // If image is already cached
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
      {/* Skeleton while loading */}
      {!isLoaded && !hasError && <ImageSkeleton />}
      
      {/* Actual image */}
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
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/30 text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

const MediaSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const mediaPhotos = PHOTO_GALLERY.filter((photo) => photo.id !== 'p3' && photo.id !== 'p6');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const currentPhotoIndexRef = useRef(0);
  const pauseAutoUntilRef = useRef(0);

  // Preload gallery images when component mounts
  useEffect(() => {
    const preloadGallery = async () => {
      try {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const criticalCount = isMobile ? 2 : 4;

        // Preload first images immediately (above the fold)
        const criticalImages = mediaPhotos.slice(0, criticalCount).map(p => preloadImage(p.src));
        await Promise.all(criticalImages);
        
        // Then preload remaining images
        const remainingImages = mediaPhotos.slice(criticalCount).map(p => preloadImage(p.src));
        Promise.all(remainingImages).catch(() => {}); // Silent fail for remaining
        
        setImagesPreloaded(true);
      } catch {
        setImagesPreloaded(true);
      }
    };

    preloadGallery();
  }, []);

  // Animation for title underline
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

      if (galleryTitleRef.current) {
        gsap.fromTo(
          galleryTitleRef.current,
          { backgroundSize: '0% 3px', opacity: 0, x: -50 },
          {
            scrollTrigger: {
              trigger: galleryTitleRef.current,
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
            trigger: galleryTitleRef.current,
            start: 'top 85%',
            onEnter: () => {
              if (galleryTitleRef.current) runGlitchBurst(galleryTitleRef.current);
            },
            onEnterBack: () => {
              if (galleryTitleRef.current) runGlitchBurst(galleryTitleRef.current);
            },
          });
        }
      }

      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryWrapperRef.current || '.photo-gallery-grid',
            start: 'top 86%',
            toggleActions: 'play none play reverse',
            // Performance optimizations
            fastScrollEnd: true,
            preventOverlaps: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featuredVideo = MEDIA_GALLERY.find((v) => v.featured);
  const secondaryVideos = MEDIA_GALLERY.filter((v) => !v.featured);
  const activeVideo = MEDIA_GALLERY.find((v) => v.id === selectedVideo);
  const autoDirectionRef = useRef<1 | -1>(1);

  // Optimized carousel with proper throttling and RAF management
  const autoScrollRef = useRef<{
    rafId: number;
    isPaused: boolean;
    lastTs: number;
  }>({ rafId: 0, isPaused: false, lastTs: 0 });

  useEffect(() => {
    const viewport = galleryWrapperRef.current;
    const track = galleryTrackRef.current;
    if (!viewport || !track) return;

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = window.innerWidth >= 1024 ? 16 : 12;

    const onEnter = () => {
      autoScrollRef.current.isPaused = true;
    };

    const onLeave = () => {
      autoScrollRef.current.isPaused = false;
    };

    viewport.addEventListener('pointerenter', onEnter);
    viewport.addEventListener('pointerleave', onLeave);

    // Use a more efficient animation loop with delta time capping
    const step = (ts: number) => {
      const state = autoScrollRef.current;
      
      if (!state.lastTs) state.lastTs = ts;
      // Cap delta to prevent large jumps after tab switch
      const delta = Math.min((ts - state.lastTs) / 1000, 0.1);
      state.lastTs = ts;

      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const isProgrammaticPause = Date.now() < pauseAutoUntilRef.current;
      
      if (!isTouchDevice && !prefersReducedMotion && !state.isPaused && !isProgrammaticPause && maxScroll > 0) {
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

      state.rafId = window.requestAnimationFrame(step);
    };

    autoScrollRef.current.rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(autoScrollRef.current.rafId);
      viewport.removeEventListener('pointerenter', onEnter);
      viewport.removeEventListener('pointerleave', onLeave);
    };
  }, [mediaPhotos.length]); // Only re-run if photo count changes

  // Optimized scroll index tracking with passive listener and throttling
  useEffect(() => {
    const viewport = galleryWrapperRef.current;
    const track = galleryTrackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.gallery-item'));
    if (!cards.length) return;

    let rafId: number;
    let needsUpdate = false;

    const updateCurrentIndex = () => {
      const left = viewport.scrollLeft;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, idx) => {
        const distance = Math.abs(card.offsetLeft - left);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = idx;
        }
      });

      currentPhotoIndexRef.current = nearestIndex;
      needsUpdate = false;
    };

    const onScroll = () => {
      if (!needsUpdate) {
        needsUpdate = true;
        rafId = window.requestAnimationFrame(updateCurrentIndex);
      }
    };

    updateCurrentIndex();
    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateCurrentIndex, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateCurrentIndex);
    };
  }, [mediaPhotos.length]);

  // Enhanced nudge function with proper auto-scroll control
  const nudgeGallery = (direction: 'prev' | 'next') => {
    const viewport = galleryWrapperRef.current;
    const track = galleryTrackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.gallery-item'));
    if (!cards.length) return;

    const current = currentPhotoIndexRef.current;
    const targetIndex =
      direction === 'next'
        ? Math.min(current + 1, cards.length - 1)
        : Math.max(current - 1, 0);

    const targetCard = cards[targetIndex];
    if (!targetCard) return;

    // Update direction immediately to prevent auto-scroll from fighting manual control
    currentPhotoIndexRef.current = targetIndex;
    autoDirectionRef.current = direction === 'next' ? 1 : -1;
    pauseAutoUntilRef.current = Date.now() + 1500;
    
    // Use instant scroll for better response, then resume auto
    viewport.scrollTo({ left: targetCard.offsetLeft, behavior: 'auto' });
  };

  return (
    <section id="media" ref={containerRef} className="py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4"
          >
            {t.media.subtitle}
          </motion.p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
            style={{
              backgroundSize: '0% 3px',
              backgroundPosition: 'left bottom',
            }}
          >
            {renderGlitchChars(t.media.title)}
          </h2>
        </div>

        {/* Featured Video */}
        {featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div
              onClick={() => setSelectedVideo(featuredVideo.id)}
              className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
              style={{
                boxShadow: '0 0 80px rgba(0, 240, 255, 0.1), 0 0 120px rgba(139, 0, 255, 0.05)',
              }}
            >
              {/* Image with reveal effect */}
              <div className="absolute inset-0 overflow-hidden">
                <OptimizedImage
                  src={featuredVideo.thumbnail}
                  alt={`${featuredVideo.title} - ${featuredVideo.description}`}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  loading="eager"
                />
              </div>
              
              {/* Noise overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Featured Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="relative px-4 py-2 bg-cyan-400/10 backdrop-blur-xl border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-bold tracking-widest uppercase overflow-hidden group/badge">
                  <span className="relative z-10">{featuredVideo.description}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-700" />
                </span>
              </div>

              {/* Duration Badge */}
              {featuredVideo.duration && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-white/80 text-xs font-medium border border-white/10">
                    <Clock size={12} />
                    {featuredVideo.duration}
                  </span>
                </div>
              )}

              {/* Center Play Button */}
              <motion.div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                  className="relative bg-white/95 backdrop-blur-sm text-black p-6 rounded-full shadow-[0_0_60px_rgba(0,240,255,0.6)] transform scale-75 group-hover:scale-100 transition-all duration-500"
                  whileHover={{ rotate: 90, scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play fill="black" size={32} />
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
                </motion.div>
              </motion.div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <Eye size={14} />
                    Click to watch on YouTube
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {secondaryVideos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: idx * 0.1,
              }}
              viewport={{ once: false }}
              onClick={() => setSelectedVideo(item.id)}
              className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/5"
              style={{
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.08)',
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <OptimizedImage
                  src={item.thumbnail}
                  alt={`${item.title} - ${item.description}`}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              </div>
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/80 text-[10px] font-bold tracking-widest uppercase">
                  {item.description}
                </span>
              </div>

              {/* Duration */}
              {item.duration && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white/70 text-[10px] font-medium">
                    <Clock size={10} />
                    {item.duration}
                  </span>
                </div>
              )}

              {/* Play Button */}
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <motion.div
                  className="bg-white/90 backdrop-blur-sm text-black p-4 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-500"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play fill="black" size={20} />
                </motion.div>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h4 className="text-lg font-bold text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo Gallery Section */}
        <div className="mb-12">
          <h3
            ref={galleryTitleRef}
            className="text-5xl md:text-7xl font-black uppercase mb-8 bg-gradient-to-r from-white via-purple-400 to-white bg-left bg-repeat-x transition-all inline-block"
            style={{
              backgroundSize: '0% 3px',
              backgroundPosition: 'left bottom',
            }}
          >
            {renderGlitchChars(t.media.photos)}
          </h3>

          <div className="photo-gallery-grid relative">
            <div className="absolute -top-14 right-0 z-20 flex items-center gap-3">
              <button
                type="button"
                onClick={() => nudgeGallery('prev')}
                className="group rounded-full border border-white/20 bg-black/35 p-2.5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-90 active:bg-cyan-400/20"
                aria-label="Previous photos"
              >
                <ChevronLeft size={18} className="text-white/80 group-hover:text-cyan-400 transition-colors duration-300" />
              </button>
              <button
                type="button"
                onClick={() => nudgeGallery('next')}
                className="group rounded-full border border-white/20 bg-black/35 p-2.5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-90 active:bg-cyan-400/20"
                aria-label="Next photos"
              >
                <ChevronRight size={18} className="text-white/80 group-hover:text-cyan-400 transition-colors duration-300" />
              </button>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent" />

            <div
              ref={galleryWrapperRef}
              className="no-scrollbar overflow-x-auto pb-2 snap-x snap-proximity md:snap-mandatory scroll-smooth will-change-scroll"
              style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
            >
              <div ref={galleryTrackRef} className="flex w-max gap-4 md:gap-6">
              {mediaPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  className="gallery-item relative overflow-hidden group cursor-pointer shrink-0 w-[78vw] sm:w-[66vw] md:w-[56vw] lg:w-[44vw] xl:w-[36vw] rounded-2xl snap-start"
                  onClick={() => setSelectedPhoto(photo.src)}
                  onMouseEnter={() => setHoveredPhoto(photo.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                  style={{
                    boxShadow: hoveredPhoto === photo.id
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
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="text-cyan-400 drop-shadow-lg" size={20} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-base font-bold tracking-wide">{photo.caption}</p>
                      <p className="text-cyan-400/70 text-xs mt-1 uppercase tracking-widest">View</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={activeVideo?.url || ''}
        title={activeVideo?.title || ''}
      />

      {/* Photo Lightbox - Premium Style */}
      <AnimatePresence>
        {selectedPhoto && (
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

      {/* CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .will-change-scroll {
          will-change: scroll-position, transform;
        }
        .gallery-item {
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};

export default MediaSection;
