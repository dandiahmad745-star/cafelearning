export type Image = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type ExpertNote = {
  id: string;
  expertName: string;
  aroma: number;
  body: number;
  flavor: number;
  acidity: number;
  notes: string;
  date: string;
};

export type Coffee = {
  id: string;
  name: string;
  origin: string;
  roast: 'Light' | 'Medium' | 'Dark';
  flavorProfile: string[];
  description: string;
  longDescription: string;
  imageId: string;
  expertNotes: ExpertNote[];
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

export type BaristaTool = {
  name: string;
  description: string;
  imageId: string;
  imageHint: string;
};
