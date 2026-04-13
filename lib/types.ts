export type Vet = {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  priceTier: 1 | 2 | 3;
  services: string[];
  openingHours: { day: string; open: string; close: string }[];
  address: string;
  postcode: string;
  borough: string;
  lat: number;
  lng: number;
  phone: string;
  website?: string;
  verified: boolean;
  distanceMi?: number;
};

export type Article = {
  id: string;
  title: string;
  category: 'Vets & Health' | 'Grooming' | 'Insurance' | 'Training' | 'Travel' | 'Food';
  heroImage: string;
  excerpt: string;
  body: string;
  author: { name: string; avatar: string; petBadge: string };
  publishedAt: string;
  readingTimeMin: number;
  commentCount: number;
};

export type Message = {
  id: string;
  articleId: string;
  parentId?: string;
  author: { name: string; avatar: string; petBadge: string };
  body: string;
  postedAt: string;
  reactions: { paw: number; heart: number };
  reactors: string[];
};

export type SimMessage = {
  id: string;
  category: Article['category'];
  author: { name: string; avatar: string; petBadge: string };
  body: string;
};
