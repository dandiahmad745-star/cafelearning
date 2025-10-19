import Link from 'next/link';
import Image from 'next/image';
import { guides } from '@/lib/data';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        title="Brewing Guides"
        description="Unlock the perfect cup with our step-by-step brewing guides. From the classic French Press to the nuanced V60, we'll help you master your method."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const image = PlaceHolderImages.find((img) => img.id === guide.imageId);
            return (
              <Link href={`/guides/${guide.id}`} key={guide.id} className="group block">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {image && (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{guide.description}</CardDescription>
                    <div className="text-sm font-semibold text-accent mt-4 flex items-center gap-2">
                        Read Guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
