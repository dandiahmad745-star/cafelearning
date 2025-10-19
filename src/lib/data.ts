import type { Coffee, Guide, BlogPost, ExpertNote, BaristaTool } from './types';
import initialData from './data.json';


export const expertNotes: ExpertNote[] = initialData.expertNotes;
export const coffees: Coffee[] = initialData.coffees;
export const featuredCoffees: Coffee[] = initialData.coffees.slice(0, 3);
export const guides: Guide[] = initialData.guides;
export const blogPosts: BlogPost[] = initialData.blogPosts;
export const baristaTools: BaristaTool[] = initialData.baristaTools;
