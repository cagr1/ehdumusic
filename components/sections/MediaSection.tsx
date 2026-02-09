import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Eye } from 'lucide-react';
import { MEDIA_GALLERY, PHOTO_GALLERY } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';
import VideoModal from '../VideoModal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MediaSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryTitleRef = useRef<HTMLHeadingElement>(null);

  // Animation for title underline
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Media title animation - left to right (title is on the left)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            backgroundSize: '0% 3px',
            opacity: 0,
            x: -50,
          },
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
      }

      // Fotos title animation - left to right
      if (galleryTitleRef.current) {
        gsap.fromTo(
          galleryTitleRef.current,
          {
            backgroundSize: '0% 3px',
            opacity: 0,
            x: -50,
          },
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
      }
    });

    return () => ctx.revert();
  }, []);

  const featuredVideo = MEDIA_GALLERY.find((v) => v.featured);
  const secondaryVideos = MEDIA_GALLERY.filter((v) => !v.featured);

  const activeVideo = MEDIA_GALLERY.find((v) => v.id === selectedVideo);

  return (
    <section id="media" className="py-20 px-6 md:px-20 relative">
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
            {t.media.title}
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
              className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden group cursor-pointer shadow-[0_0_60px_rgba(0,240,255,0.15)] border border-white/10"
            >
              <img
                src={featuredVideo.thumbnail}
                alt={`${featuredVideo.title} - ${featuredVideo.description}`}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Featured Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-cyan-400/20 backdrop-blur-md border border-cyan-400/30 rounded-full text-cyan-400 text-xs font-bold tracking-widest uppercase">
                  {featuredVideo.description}
                </span>
              </div>

              {/* Duration Badge */}
              {featuredVideo.duration && (
                <div className="absolute top-6 right-6">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white/80 text-xs font-medium">
                    <Clock size={12} />
                    {featuredVideo.duration}
                  </span>
                </div>
              )}

              {/* Center Play Button */}
              <motion.div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="bg-white/90 backdrop-blur-sm text-black p-6 rounded-full shadow-[0_0_60px_rgba(0,240,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-500"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play fill="black" size={32} />
                </motion.div>
              </motion.div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false }}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
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
              className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-white/5"
            >
              <img
                src={item.thumbnail}
                alt={`${item.title} - ${item.description}`}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/80 text-[10px] font-bold tracking-widest uppercase">
                  {item.description}
                </span>
              </div>

              {/* Duration */}
              {item.duration && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white/70 text-[10px] font-medium">
                    <Clock size={10} />
                    {item.duration}
                  </span>
                </div>
              )}

              {/* Play Button */}
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <motion.div
                  className="bg-white/90 backdrop-blur-sm text-black p-4 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-500"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play fill="black" size={20} />
                </motion.div>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
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
            {t.media.photos}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PHOTO_GALLERY.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: idx * 0.05,
                }}
                viewport={{ once: false }}
                onClick={() => setSelectedPhoto(photo.src)}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-white/5"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
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

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedPhoto}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default MediaSection;
