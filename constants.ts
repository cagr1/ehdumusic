
import { TourDate, MediaItem, PhotoItem } from './types';

export const COLORS = {
  black: '#000000',
  purple: '#8B00FF',
  cyan: '#00F0FF',
};

export const TOUR_DATES: TourDate[] = [
  { id: '1', date: 'AUG 12', city: 'BERLIN', venue: 'Berghain / Panorama Bar', status: 'Sold Out', link: '#' },
  { id: '2', date: 'AUG 28', city: 'LONDON', venue: 'Printworks', status: 'Tickets', link: '#' },
  { id: '3', date: 'SEP 05', city: 'AMSTERDAM', venue: 'Gashouder', status: 'Tickets', link: '#' },
  { id: '4', date: 'SEP 19', city: 'PARIS', venue: 'Yoyo - Palais de Tokyo', status: 'Tickets', link: '#' },
  { id: '5', date: 'OCT 12', city: 'TOKYO', venue: 'WOMB', status: 'Tickets', link: '#' },
];

// Videos oficiales de Ehdu
export const MEDIA_GALLERY: MediaItem[] = [
  {
    id: 'v1',
    type: 'video',
    category: 'live',
    title: 'Polyptych | Savia Park',
    description: 'Live Performance',
    url: 'https://www.youtube.com/embed/3obwB1wVJPo',
    thumbnail: 'https://img.youtube.com/vi/3obwB1wVJPo/maxresdefault.jpg',
    duration: '6:42',
    featured: true,
  },
  {
    id: 'v2',
    type: 'video',
    category: 'official',
    title: 'Too Many Rules',
    description: 'Official Video',
    url: 'https://www.youtube.com/embed/DH-Gv98_bi0',
    thumbnail: 'https://img.youtube.com/vi/DH-Gv98_bi0/maxresdefault.jpg',
    duration: '4:15',
    featured: false,
  },
  {
    id: 'v3',
    type: 'video',
    category: 'official',
    title: 'Ehdu Live Set',
    description: 'Performance Video',
    url: 'https://www.youtube.com/embed/6uz0PjRR__0',
    thumbnail: 'https://img.youtube.com/vi/6uz0PjRR__0/maxresdefault.jpg',
    duration: '5:30',
    featured: false,
  },
];

// Galería de fotos del artista
export const PHOTO_GALLERY: PhotoItem[] = [
  { id: 'p1', src: '/images/Gallery1.jpg', alt: 'Ehdu live performance at music festival', caption: 'Live Performance' },
  { id: 'p2', src: '/images/Gallery2', alt: 'Ehdu studio session recording', caption: 'Studio Session' },
  { id: 'p3', src: '/images/gallery3', alt: 'Ehdu backstage moments', caption: 'Behind the Scenes' },
  { id: 'p4', src: '/images/gallery4', alt: 'Ehdu at international festival', caption: 'Festival Performance' },
];
