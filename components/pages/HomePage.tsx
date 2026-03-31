import React from 'react';
import { Section } from '../ui';
import { HeroSection, LatestSection, MediaSection, FooterSection } from '../sections';
import { useLanguage } from '../../i18n/LanguageContext';
import { Icon } from '@iconify/react';

const HomePage: React.FC = () => {
  const { t, language } = useLanguage();

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

      {/* CONTACT SECTION */}
      <Section id="contact" subtitle={t.contact.subtitle} title={t.contact.title} className="overflow-visible">
        <div className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-4">
              <p className="text-white/60 text-xs md:text-sm uppercase tracking-wider">
                {language === 'es' 
                  ? 'Disponible para clubes, festivales y eventos privados'
                  : 'Available for clubs, festivals, and private events'}
              </p>
              
              {/* Primary CTA - WhatsApp */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/593998956080?text=${encodeURIComponent(language === 'es' ? 'Hola, quiero reservar para un evento!' : 'Hi, I want to book you for an event!')}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'whatsapp_booking_click', { event_category: 'conversion' });
                    }
                    console.log('whatsapp_booking_click');
                  }}
                  className="inline-flex items-center gap-2 bg-cyan-400 text-black text-sm md:text-base font-bold uppercase tracking-wider px-6 py-3 md:px-8 md:py-4 rounded-md hover:rounded-full hover:bg-cyan-300 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/30"
                >
                  <Icon icon="logos:whatsapp-icon" width="20" height="20" />
                  {language === 'es' ? 'Reservar por WhatsApp' : 'Book via WhatsApp'}
                </a>
              </div>
              
              {/* Secondary CTA - Email */}
              <div className="pt-3">
                <a
                  href="mailto:ledum1999@gmail.com?subject=Booking Inquiry - EHDUMUSIC"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'email_booking_click', { event_category: 'conversion' });
                    }
                    console.log('email_booking_click');
                  }}
                  className="text-white/40 text-xs md:text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors underline decoration-1 underline-offset-4"
                >
                  {language === 'es' ? 'O enviar email' : 'Or send email'}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-2">
              {language === 'es' ? 'Sígueme' : 'Follow'}
            </p>
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

