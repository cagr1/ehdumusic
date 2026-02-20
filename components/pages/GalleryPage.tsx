import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import GalleryGrid from '../gallery/GalleryGrid';

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <GalleryGrid 
      layout="grid"
      showLightbox={true}
      title={t.media.photos}
      subtitle={t.media.subtitle}
    />
  );
};

export default GalleryPage;
