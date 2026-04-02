import React from 'react';
import { Section } from '../ui';
import { HeroSection, LatestSection, MediaSection, FooterSection } from '../sections';
import { useLanguage } from '../../i18n/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* BIO SECTION */}
      <Section id="bio" subtitle={t.bio.subtitle} title={t.bio.title}>
        <div className="text-white/80 text-base md:text-lg leading-relaxed space-y-6 text-left">
          {(t.bio.body as string).split('\n\n').map((paragraph: string, index: number) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* LATEST RELEASE */}
      <LatestSection />

      {/* MEDIA */}
      <MediaSection />

      {/* FOOTER SECTION */}
      <FooterSection />
    </>
  );
};

export default HomePage;

