import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { Language } from '../../i18n/translations';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'es', name: 'ESP' },
    { code: 'en', name: 'ENG' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-2">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
            language === lang.code
              ? 'bg-cyan-400 text-black'
              : 'border border-white/20 text-white/60 hover:border-cyan-400/50 hover:text-cyan-400'
          }`}
        >
          {lang.name}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
