'use client';

import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { baristaTools } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Essential Barista Tools"
        description="Explore the equipment used by professionals to transform humble beans into the perfect cup."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {baristaTools.map((tool) => {
            const image = PlaceHolderImages.find((img) => img.id === tool.imageId);
            return (
              <Card key={tool.name} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-video w-full">
                  {image ? (
                     <Image
                      src={image.imageUrl}
                      alt={tool.name}
                      fill
                      className="object-cover"
                      data-ai-hint={tool.imageHint}
                    />
                  ) : (
                     <div className="bg-muted flex items-center justify-center h-full">
                        <span className="text-muted-foreground">No Image</span>
                     </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
