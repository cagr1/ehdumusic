
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
  title: string;
  url: string;
  thumbnail: string;
}
