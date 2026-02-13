import React from 'react';
import { Section } from '../ui';
import { HeroSection, LatestSection, TourSection, MediaSection, FooterSection } from '../sections';
import { useLanguage } from '../../i18n/LanguageContext';
import { Icon } from '@iconify/react';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'Beatport', icon: 'simple-icons:beatport', url: 'https://www.beatport.com/artist/ehdu/928516' },
    { name: 'Spotify', icon: 'simple-icons:spotify', url: 'https://open.spotify.com/artist/5gKvdLCO9jxUgCqWNnpd4o' },
    { name: 'Soundcloud', icon: 'simple-icons:soundcloud', url: 'https://soundcloud.com/ehdumusic' },
    { name: 'Instagram', icon: 'simple-icons:instagram', url: 'https://www.instagram.com/ehdumusic' },
    { name: 'Facebook', icon: 'simple-icons:facebook', url: 'https://www.facebook.com/ehdumusician' },
    { name: 'TikTok', icon: 'simple-icons:tiktok', url: 'https://www.tiktok.com/@ehdumusic' },
    { name: 'Youtube', icon: 'simple-icons:youtube', url: 'https://www.youtube.com/@ehdumusic' },
  ];

  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* LATEST RELEASE */}
      <LatestSection />

      {/* TOUR DATES */}
      <TourSection />

      {/* MEDIA */}
      <MediaSection />

      {/* CONTACT SECTION */}
      <Section id="contact" subtitle={t.contact.subtitle} title={t.contact.title} reverseLayout={true} className="overflow-visible">
        <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="md:order-2">
            <div className="space-y-6 md:text-right">
              <div className="group">
                <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-1">{t.contact.bookings}</p>
                <a
                  href="mailto:booking@ehdu.com"
                  className="text-2xl md:text-3xl font-bold transition-all cursor-pointer inline-block text-white hover:text-cyan-400"
                >
                  booking
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-8 md:order-1">
            <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-all flex justify-center hover:scale-140 hover:text-cyan-400 hover:rotate-15 hover:-translate-y-1"
                  title={link.name}
                >
                  <Icon icon={link.icon} width="32" height="32" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER SECTION */}
      <FooterSection />
    </>
  );
};

export default HomePage;
