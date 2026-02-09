
export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: 'Tickets' | 'Sold Out' | 'Free';
  link: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'image';
  category: 'live' | 'official' | 'behind-the-scenes';
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration?: string;
  featured?: boolean;
}

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}
