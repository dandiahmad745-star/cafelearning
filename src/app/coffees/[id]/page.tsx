'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { coffees } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReviewStars from '@/components/shared/ReviewStars';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { Coffee } from '@/lib/types';

function CoffeeDetailContent({ coffee }: { coffee: Coffee }) {
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const image = PlaceHolderImages.find((img) => img.id === coffee.imageId);

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const author = formData.get('author');
    const comment = formData.get('comment');

    if (!author || !comment || rating === 0) {
      toast({
        title: 'Ulasan Tidak Lengkap',
        description: 'Harap berikan nama Anda, peringkat, dan komentar.',
        variant: 'destructive',
      });
      return;
    }

    // In a real app, you would submit this data to a server
    console.log({ author, comment, rating });

    toast({
      title: 'Ulasan Dikirim!',
      description: 'Terima kasih atas masukan Anda.',
    });

    e.currentTarget.reset();
    setRating(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="w-full">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </div>
        <div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">{coffee.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{coffee.origin}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline">{coffee.roast} Roast</Badge>
            {coffee.flavorProfile.map((flavor) => (
              <Badge key={flavor} variant="secondary">
                {flavor}
              </Badge>
            ))}
          </div>

          <p className="text-base leading-relaxed">{coffee.longDescription}</p>
        </div>
      </div>

      <Separator className="my-12 md:my-16" />

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-6">Ulasan Pelanggan</h2>
          <div className="space-y-6">
            {coffee.reviews.length > 0 ? (
              coffee.reviews.map((review) => (
                <Card key={review.id} className="bg-background">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{review.author}</CardTitle>
                      <ReviewStars rating={review.rating} />
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">Belum ada ulasan. Jadilah yang pertama memberikan masukan!</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="font-headline text-3xl font-bold mb-6">Tinggalkan Ulasan</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="author">Nama Anda</Label>
              <Input id="author" name="author" placeholder="John Doe" required />
            </div>
            <div>
              <Label>Peringkat Anda</Label>
              <ReviewStars rating={rating} onRate={setRating} isInteractive={true} size={24} className="py-2" />
            </div>
            <div>
              <Label htmlFor="comment">Ulasan Anda</Label>
              <Textarea id="comment" name="comment" placeholder="Bagaimana pendapat Anda tentang kopi ini?" required />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Kirim Ulasan</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// This is the new page component that will be rendered by Next.js
export default function CoffeeDetailPage({ params }: { params: { id: string } }) {
  const coffee = coffees.find((c) => c.id === params.id);

  if (!coffee) {
    notFound();
  }

  return <CoffeeDetailContent coffee={coffee} />;
}
