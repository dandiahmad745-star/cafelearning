'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { use } from 'react';
import { coffees } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReviewStars from '@/components/shared/ReviewStars';
import { Separator } from '@/components/ui/separator';
import type { Coffee } from '@/lib/types';

function CoffeeDetailContent({ coffee }: { coffee: Coffee }) {

  const image = PlaceHolderImages.find((img) => img.id === coffee.imageId);

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
            <p className="text-muted-foreground">Belum ada ulasan untuk kopi ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// This is the new page component that will be rendered by Next.js
export default function CoffeeDetailPage({ params }: { params: { id: string } }) {
  const safeParams = use(params);
  const coffee = coffees.find((c) => c.id === safeParams.id);

  if (!coffee) {
    notFound();
  }

  return <CoffeeDetailContent coffee={coffee} />;
}
