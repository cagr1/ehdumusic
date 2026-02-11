
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

// Galería de fotos del artista - Using gallery images from Cover folder
export const PHOTO_GALLERY: PhotoItem[] = [
  { id: 'p1', src: '/Cover/gallery1.webp', alt: 'EHDU live performance', caption: 'Live Performance' },
  { id: 'p2', src: '/Cover/gallery2.webp', alt: 'EHDU studio session', caption: 'Studio Session' },
  { id: 'p3', src: '/Cover/gallery3.webp', alt: 'EHDU backstage moments', caption: 'Behind the Scenes' },
  { id: 'p4', src: '/Cover/gallery4.webp', alt: 'EHDU at festival', caption: 'Festival' },
  { id: 'p5', src: '/Cover/gallery5.webp', alt: 'EHDU concert', caption: 'Concert' },
  { id: 'p6', src: '/Cover/gallery6.webp', alt: 'EHDU event', caption: 'Event' },
  { id: 'p7', src: '/Cover/gallery7.webp', alt: 'EHDU performance', caption: 'Performance' },
  { id: 'p8', src: '/Cover/gallery8.webp', alt: 'EHDU show', caption: 'Show' },
];
