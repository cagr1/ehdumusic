import React from 'react';
import { motion } from 'framer-motion';
import LiquidText from '../LiquidText';
import { useLanguage } from '../../i18n/LanguageContext';

const FooterSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full relative overflow-hidden" style={{ marginTop: '-1px' }}>
      {/* Seamless gradient fade from Contact section - blends completely */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <LiquidText text="EHDU" className="w-full h-24 md:h-44 mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-3"
        >
          <p className="text-xs md:text-[10px] uppercase tracking-widest text-white/40">
            {t.contact.made}
          </p>
          <p className="text-xs md:text-[10px] uppercase tracking-[0.5em] text-white/20">
            {t.contact.footer}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
