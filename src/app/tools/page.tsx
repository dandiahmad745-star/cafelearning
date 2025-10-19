import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const tools = [
  {
    name: 'Espresso Machine',
    description: 'The heart of any cafe, used to produce rich, concentrated coffee shots.',
    imageUrl: 'https://picsum.photos/seed/tool1/600/400',
    imageHint: 'espresso machine'
  },
  {
    name: 'Coffee Grinder',
    description: 'Essential for fresh, flavorful coffee. Burr grinders offer the most consistency.',
    imageUrl: 'https://picsum.photos/seed/tool2/600/400',
    imageHint: 'coffee grinder'
  },
  {
    name: 'Pour-Over Dripper (V60)',
    description: 'A manual brewing device that allows for precise control over the extraction process.',
    imageUrl: 'https://picsum.photos/seed/tool3/600/400',
    imageHint: 'pour over'
  },
  {
    name: 'French Press',
    description: 'A classic immersion brewer that produces a full-bodied and rich cup of coffee.',
    imageUrl: 'https://picsum.photos/seed/tool4/600/400',
    imageHint: 'french press'
  },
  {
    name: 'Milk Frothing Pitcher',
    description: 'A stainless steel pitcher used for steaming and frothing milk for lattes and cappuccinos.',
    imageUrl: 'https://picsum.photos/seed/tool5/600/400',
    imageHint: 'milk pitcher'
  },
  {
    name: 'Digital Scale',
    description: 'Crucial for measuring coffee and water to ensure a consistent brew ratio.',
    imageUrl: 'https://picsum.photos/seed/tool6/600/400',
    imageHint: 'digital scale'
  }
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="Essential Barista Tools"
        description="Explore the equipment used by professionals to transform humble beans into the perfect cup."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Card key={tool.name} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-video w-full">
                <Image
                  src={tool.imageUrl}
                  alt={tool.name}
                  fill
                  className="object-cover"
                  data-ai-hint={tool.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
