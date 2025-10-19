import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="The Netlify Brew Blog"
        description="A space for coffee stories, brewing tips, and conversations with the community. Grab a cup and stay awhile."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => {
            const image = PlaceHolderImages.find((img) => img.id === post.imageId);
            return (
                <Link href={`/blog/${post.id}`} key={post.id} className="group block">
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {image && (
                        <div className="relative aspect-video w-full">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                        <CardDescription>{post.date} &middot; by {post.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                         <div className="text-sm font-semibold text-accent flex items-center gap-2">
                            Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardFooter>
                    </Card>
                </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
