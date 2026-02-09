import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { MEDIA_GALLERY } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';

const MediaSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="media" className="py-20 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-left">
          <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">{t.media.subtitle}</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight">{t.media.title}</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEDIA_GALLERY.map((item, idx) => (
            <motion.div
              key={item.id}
              data-media-item
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                delay: idx * 0.1 
              }}
              className="relative aspect-video glass-card rounded-xl overflow-hidden group cursor-pointer shadow-lg border border-white/5"
              viewport={{ once: false }}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              <motion.div 
                className="absolute bottom-6 left-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
              >
                <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{t.media.performance}</p>
                <h4 className="text-lg font-bold leading-tight text-white">{item.title}</h4>
              </motion.div>

              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="bg-white/90 backdrop-blur-sm text-black p-4 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-500"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play fill="black" size={24} />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
