import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { featuredCoffees, guides } from '@/lib/data';
import CoffeeCard from '@/components/shared/CoffeeCard';
import { ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] text-primary-foreground">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-7xl font-headline font-bold drop-shadow-lg mb-4">
            Jelajahi Dunia Kopi.
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mb-8 drop-shadow-md">
            Pelajari koleksi biji kopi single-origin kami dan kuasai seni menyeduh.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/coffees">
              Lihat Semua Kopi <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Coffees */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-primary">
            Kopi Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        </div>
      </section>

      {/* Brewing Guides Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-primary">
                Sempurnakan Seduhan Anda
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Baik Anda seorang pemula atau barista berpengalaman, panduan kami akan membantu Anda membuka potensi penuh dari kopi Anda.
              </p>
              <ul className="space-y-4 mb-8">
                {guides.slice(0, 3).map((guide) => (
                  <li key={guide.id} className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-accent" />
                    <span className="text-lg">{guide.title}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline">
                <Link href="/guides">
                  Jelajahi Semua Panduan <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {guides.slice(0,2).map((guide) => {
                    const image = PlaceHolderImages.find((img) => img.id === guide.imageId);
                    return image ? (
                        <div key={guide.id} className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={image.imageHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h3 className="absolute bottom-4 left-4 font-headline text-xl text-white">{guide.title}</h3>
                        </div>
                    ) : null
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
