'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/shared/PageHeader';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === post.imageId);

  return (
    <>
    <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-3xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                <p className="text-muted-foreground">
                    Posted on {post.date} by {post.author}
                </p>
            </header>

            {image && (
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg w-full mb-8">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    priority
                />
                </div>
            )}
            
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
                <p>{post.content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </article>
      </div>
    </>
  );
}
