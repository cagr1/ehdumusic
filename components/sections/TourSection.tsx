import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TOUR_DATES } from '../../constants';
import { useLanguage } from '../../i18n/LanguageContext';

const TourSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  return (
    <section id="tour" className="py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-right">
          <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">{t.tour.subtitle}</p>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight">{t.tour.title}</h2>
        </div>

        <div className="flex flex-col gap-1 border-t border-white/10">
          {TOUR_DATES.map((tour, idx) => (
            <motion.div
              key={tour.id}
              data-tour-item
              onClick={() => setSelectedTourId(selectedTourId === tour.id ? null : tour.id)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group cursor-pointer border-b border-white/10 py-8 px-4 relative hover:bg-white/[0.02] transition-colors duration-500"
              viewport={{ once: false }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-bold tracking-widest text-white/40 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 px-3 py-1 rounded-full">
                    {tour.date}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold uppercase group-hover:text-cyan-400 transition-colors duration-500">
                    {tour.city}
                  </h3>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                  <span className="text-xs uppercase tracking-widest text-white/50">{tour.venue}</span>
                  <button className={`px-6 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 ${tour.status === 'Sold Out' ? 'border border-white/10 text-white/20' : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]'}`}>
                    {tour.status === 'Sold Out' ? t.tour.soldOut : t.tour.tickets}
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {selectedTourId === tour.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.tickets}</p>
                        <a href={tour.link} className="hover:text-cyan-400 flex items-center gap-2 transition-colors duration-300">{t.tour.vendor} <ChevronRight size={14} /></a>
                      </div>
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.support}</p>
                        <p>Tale of Us, Maceo Plex, Mind Against</p>
                      </div>
                      <div className="glass-card p-4 rounded-lg hover:border-cyan-400/30 transition-colors duration-300">
                        <p className="text-white/40 mb-2 uppercase text-[10px] tracking-widest">{t.tour.info}</p>
                        <p>{t.tour.doors}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourSection;
