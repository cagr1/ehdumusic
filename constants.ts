
import { TourDate, MediaItem } from './types';

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

export const MEDIA_GALLERY: MediaItem[] = [
  { id: 'v1', type: 'video', title: 'Live at Tulum Jungle', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/ehdu1/800/450' },
  { id: 'v2', type: 'video', title: 'The Making of Nebula', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/ehdu2/800/450' },
  { id: 'v3', type: 'video', title: 'London Warehouse Set', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://picsum.photos/seed/ehdu3/800/450' },
];
