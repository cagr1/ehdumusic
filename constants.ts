
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
    category: 'official',
    title: '',
    description: 'EHDU B2B Encalada - Warm Up for Lee Foss',
    url: 'https://www.youtube.com/embed/DH-Gv98_bi0',
    thumbnail: 'https://img.youtube.com/vi/DH-Gv98_bi0/maxresdefault.jpg',
    duration: '58:01',
    featured: true,
  },
  {
    id: 'v2',
    type: 'video',
    category: 'official',
    title: '',
    description: 'Sunset Live Session 2 - Ehdu',
    url: 'https://www.youtube.com/embed/1OR827rZ0RY',
    thumbnail: 'https://img.youtube.com/vi/1OR827rZ0RY/maxresdefault.jpg',
    duration: '45:48',
    featured: false,
  },
  {
    id: 'v3',
    type: 'video',
    category: 'live',
    title: '',
    description: 'Live From Tahuin Sport Ecolodge, Arenillas - Ecuador',
    url: 'https://www.youtube.com/embed/3obwB1wVJPo',
    thumbnail: 'https://img.youtube.com/vi/3obwB1wVJPo/maxresdefault.jpg',
    duration: '56:52',
    featured: false,
  },
  {
    id: 'v4',
    type: 'video',
    category: 'official',
    title: '',
    description: 'EHDU B2B ENCALADA LIVE AT NUIT',
    url: 'https://www.youtube.com/embed/6uz0PjRR__0',
    thumbnail: 'https://img.youtube.com/vi/6uz0PjRR__0/maxresdefault.jpg',
    duration: '1:21:36',
    featured: false,
  },
  {
    id: 'v5',
    type: 'video',
    category: 'official',
    title: '',
    description: 'EHDU B2B Ruvio DJ Set Live at Block Party Machala',
    url: 'https://www.youtube.com/embed/ymhzMcHmbE4',
    thumbnail: 'https://img.youtube.com/vi/ymhzMcHmbE4/maxresdefault.jpg',
    duration: '49:50',
    featured: false,
  },
  {
    id: 'v6',
    type: 'video',
    category: 'official',
    title: '',
    description: 'Habla Banana Session 001',
    url: 'https://www.youtube.com/embed/LpxUD7JvjwQ',
    thumbnail: 'https://img.youtube.com/vi/LpxUD7JvjwQ/maxresdefault.jpg',
    duration: '1:02:02',
    featured: false,
  },
  
  
];

// Galería de fotos del artista - Using gallery images from Cover folder
export const PHOTO_GALLERY: PhotoItem[] = [
  { id: 'p1', src: '/Cover/gallery1.webp', alt: 'EHDU live performance' },
  { id: 'p2', src: '/Cover/gallery2.webp', alt: 'EHDU studio session'},
  { id: 'p3', src: '/Cover/gallery3.webp', alt: 'EHDU backstage moments'},
  { id: 'p4', src: '/Cover/gallery4.webp', alt: 'EHDU at festival'},
  { id: 'p5', src: '/Cover/gallery5.webp', alt: 'EHDU concert' },
  { id: 'p6', src: '/Cover/gallery6.webp', alt: 'EHDU event'},
  { id: 'p7', src: '/Cover/gallery7.webp', alt: 'EHDU performance' },
  { id: 'p8', src: '/Cover/gallery8.webp', alt: 'EHDU show'},
  { id: 'p9', src: '/Cover/gallery9.webp', alt: 'EHDU '},
  { id: 'p10', src: '/Cover/gallery10.webp', alt: 'EHDU '},
  { id: 'p11', src: '/Cover/gallery11.webp', alt: 'EHDU '},
  { id: 'p12', src: '/Cover/gallery12.webp', alt: 'EHDU '},
  { id: 'p13', src: '/Cover/gallery13.webp', alt: 'EHDU '},
  { id: 'p14', src: '/Cover/gallery14.webp', alt: 'EHDU '},
  { id: 'p15', src: '/Cover/gallery15.webp', alt: 'EHDU ' },
  { id: 'p16', src: '/Cover/gallery16.webp', alt: 'EHDU '},
  { id: 'p17', src: '/Cover/gallery17.webp', alt: 'EHDU '}
  
];
