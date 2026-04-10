import React from 'react';
import { Section } from '../ui';
import { useLanguage } from '../../i18n/LanguageContext';
import { Icon } from '@iconify/react';

const ContactPage: React.FC = () => {
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
    <Section className="min-h-screen" subtitle={t.contact.subtitle} title={t.contact.title}>
      <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-white/60 text-xs md:text-sm uppercase tracking-wider">
            {language === 'es'
              ? 'Disponible para clubes, festivales y eventos privados'
              : 'Available for clubs, festivals, and private events'}
          </p>

          <div className="space-y-3">
            <a
              href={`https://wa.me/593998956080?text=${encodeURIComponent(language === 'es' ? 'Hola, quiero reservar para un evento!' : 'Hi, I want to book you for an event!')}`}
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'whatsapp_booking_click', { event_category: 'conversion' });
                }
                console.log('whatsapp_booking_click');
              }}
              className="inline-flex items-center justify-center bg-cyan-400 text-black text-sm md:text-base font-bold uppercase tracking-wider px-6 py-3 md:px-8 md:py-4 rounded-md hover:rounded-full hover:bg-cyan-300 transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/30"
            >
              {language === 'es' ? 'Reservar por WhatsApp' : 'Book via WhatsApp'}
            </a>

            <a
              href="mailto:booking@ehdumusic.com?subject=Booking Inquiry - EHDUMUSIC"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'email_booking_click', { event_category: 'conversion' });
                }
                console.log('email_booking_click');
              }}
              className="block text-white/40 text-xs md:text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors underline decoration-1 underline-offset-4"
            >
              {language === 'es' ? 'O enviar email' : 'Or send email'}
            </a>
          </div>

          <div className="pt-4">
            <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-3">
              {language === 'es' ? 'Sígueme' : 'Follow'}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-4 gap-5 items-center">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 transition-all flex justify-center hover:scale-140 hover:text-cyan-400 hover:rotate-15 hover:-translate-y-1"
                  title={link.name}
                >
                  <Icon icon={link.icon} width="30" height="30" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = String(data.get('name') || '');
              const email = String(data.get('email') || '');
              const eventType = String(data.get('eventType') || '');
              const date = String(data.get('date') || '');
              const message = String(data.get('message') || '');
              const subject = encodeURIComponent('Booking Inquiry - EHDUMUSIC');
              const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nEvent Type: ${eventType}\nDate: ${date}\n\nMessage:\n${message}`
              );
              window.location.href = `mailto:booking@ehdumusic.com?subject=${subject}&body=${body}`;
            }}
          >
            <input
              name="name"
              required
              placeholder={language === 'es' ? 'Nombre' : 'Name'}
              className="col-span-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={language === 'es' ? 'Email' : 'Email'}
              className="col-span-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
            />
            <input
              name="eventType"
              placeholder={language === 'es' ? 'Tipo de evento' : 'Event type'}
              className="col-span-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
            />
            <input
              name="date"
              type="date"
              className="col-span-1 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
            />
            <textarea
              name="message"
              rows={4}
              placeholder={language === 'es' ? 'Mensaje' : 'Message'}
              className="sm:col-span-2 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50"
            />
            <button
              type="submit"
              className="sm:col-span-2 inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/15 text-white/80 hover:text-white text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-md transition-all duration-300"
            >
              {language === 'es' ? 'Enviar solicitud' : 'Send request'}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ContactPage;
