'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { guides } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import PageHeader from '@/components/shared/PageHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function GuideDetailPage({ params }: { params: { id:string } }) {
  const guide = guides.find((g) => g.id === params.id);

  if (!guide) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === guide.imageId);

  return (
    <>
      <PageHeader title={guide.title} description={guide.description} />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                 {image && (
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg w-full mb-8 lg:mb-0">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                 )}
            </div>
            <div>
                <h2 className="font-headline text-3xl font-bold mb-6">Steps</h2>
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {guide.steps.map((step, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-bold font-headline text-left">
                        Step {index + 1}: {step.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                        {step.instruction}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </div>
      </div>
    </>
  );
}
