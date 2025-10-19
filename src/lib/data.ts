import type { Coffee, Guide, BlogPost, ExpertNote, BaristaTool } from './types';
import initialData from './data.json';

// These are now just for the Owner Dashboard template, not for display
export const expertNotes: ExpertNote[] = initialData.expertNotes;
export const coffees: Coffee[] = initialData.coffees;
export const featuredCoffees: Coffee[] = initialData.coffees.slice(0, 3);
export const guides: Guide[] = initialData.guides;
export const blogPosts: BlogPost[] = initialData.blogPosts;
export const baristaTools: BaristaTool[] = initialData.baristaTools;
// Forum topics are no longer used from here, they come from Supabase
export const forumTopics = [];
