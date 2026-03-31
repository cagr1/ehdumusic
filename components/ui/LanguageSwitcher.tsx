import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { Language } from '../../i18n/translations';

/** Navbar language switcher - small, minimal, low visual priority */
const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'es', name: 'ES' },
    { code: 'en', name: 'EN' },
  ];

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
            language === lang.code
              ? 'text-cyan-400'
              : 'text-white/40 hover:text-white'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
