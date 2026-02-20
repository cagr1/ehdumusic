import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Eye } from 'lucide-react';
import { MEDIA_GALLERY } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';
import VideoModal from '../VideoModal';
import OptimizedImage from './OptimizedImage';

const VideoSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const featuredVideo = MEDIA_GALLERY.find((v) => v.featured);
  const secondaryVideos = MEDIA_GALLERY.filter((v) => !v.featured);
  const activeVideo = MEDIA_GALLERY.find((v) => v.id === selectedVideo);

  return (
    <>
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

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={activeVideo?.url || ''}
        title={activeVideo?.title || ''}
      />
    </>
  );
};

export default VideoSection;
