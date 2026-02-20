import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PHOTO_GALLERY } from '../../constants';
import GalleryGrid from '../gallery/GalleryGrid';
import VideoSection from '../gallery/VideoSection';

const MediaPage: React.FC = () => {
  const { t } = useLanguage();
  
  // Filter photos for Media page (exclude p3 and p6 as in original MediaSection)
  const mediaPhotos = PHOTO_GALLERY.filter((photo) => photo.id !== 'p3' && photo.id !== 'p6');

  return (
    <>
      {/* Videos Section */}
      <section className="py-20 px-6 md:px-20 relative overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-left">
            <p className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-4">
              {t.media.subtitle}
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-left bg-repeat-x transition-all inline-block"
              style={{
                backgroundSize: '100% 3px',
                backgroundPosition: 'left bottom',
              }}
            >
              {t.media.title}
            </h2>
          </div>

          {/* Videos */}
          <VideoSection />
        </div>
      </section>

      {/* Photo Gallery - Carousel Layout */}
      <GalleryGrid 
        photos={mediaPhotos}
        layout="carousel"
        showLightbox={true}
        title={t.media.photos}
        subtitle=""
        className="pb-20"
      />
    </>
  );
};

export default MediaPage;
