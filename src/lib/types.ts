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

// Supabase-specific types
export type Profile = {
  id: string;
  updated_at: string;
  full_name: string;
  avatar_url: string;
};

export type ForumTopic = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string;
  author?: Profile;
};

export type ForumReply = {
  id: string;
  created_at: string;
  content: string;
  author_id: string;
  topic_id: string;
  author?: Profile;
};
