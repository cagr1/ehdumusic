import React from 'react';
import { Section } from '../ui';
import { useLanguage } from '../../i18n/LanguageContext';

const BioPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section
      className="min-h-screen"
      title={t.bio.title}
      subtitle={t.bio.subtitle}
    >
      <div className="max-w-3xl text-white/80 text-base md:text-lg leading-relaxed space-y-6">
        <p>{t.bio.body}</p>
      </div>
    </Section>
  );
};

export default BioPage;
