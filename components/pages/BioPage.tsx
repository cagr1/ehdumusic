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
      <div className="text-white/80 text-base md:text-lg leading-relaxed space-y-6 text-left">
        {(t.bio.body as string).split('\n\n').map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
};

export default BioPage;
