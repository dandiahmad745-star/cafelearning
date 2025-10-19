import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Coffee } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';

type CoffeeCardProps = {
  coffee: Coffee;
};

const CoffeeCard: FC<CoffeeCardProps> = ({ coffee }) => {
  const image = PlaceHolderImages.find((img) => img.id === coffee.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/coffees/${coffee.id}`} className="block">
          <div className="relative aspect-[3/2] w-full">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            ) : (
              <div className="bg-muted flex items-center justify-center h-full">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">
            <Link href={`/coffees/${coffee.id}`} className="hover:text-primary transition-colors">{coffee.name}</Link>
        </CardTitle>
        <CardDescription className="mb-3">{coffee.origin}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {coffee.flavorProfile.slice(0, 3).map((flavor) => (
            <Badge key={flavor} variant="secondary">
              {flavor}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild size="sm" variant="outline" className="w-full">
            <Link href={`/coffees/${coffee.id}`}>Pelajari Lebih Lanjut</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoffeeCard;
