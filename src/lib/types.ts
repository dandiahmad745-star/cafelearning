export type Image = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Coffee = {
  id: string;
  name: string;
  price: number;
  origin: string;
  roast: 'Light' | 'Medium' | 'Dark';
  flavorProfile: string[];
  description: string;
  longDescription: string;
  imageId: string;
  reviews: Review[];
};

export type Guide = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  steps: { title: string; instruction: string }[];
};

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  imageId: string;
};
