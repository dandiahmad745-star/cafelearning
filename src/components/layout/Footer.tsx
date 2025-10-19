import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { Coffee, Beaker, BookOpen, MessageSquare, Newspaper } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const footerNavItems = [
  {
    href: '/coffees',
    title: 'Discover Beans',
    description: 'Explore our curated selection of coffees from around the world.',
    icon: <Coffee className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/tools',
    title: 'Barista Tools',
    description: 'Find the essential gear used by professionals.',
    icon: <Beaker className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/guides',
    title: 'Brewing Guides',
    description: 'Learn how to brew the perfect cup with our step-by-step guides.',
    icon: <BookOpen className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/blog',
    title: 'Blog',
    description: 'Read stories, tips, and insights from the world of coffee.',
    icon: <Newspaper className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/forum',
    title: 'Forum',
    description: 'Join the community and discuss all things coffee.',
    icon: <MessageSquare className="h-8 w-8 mb-4 text-accent" />,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {footerNavItems.map((item) => (
                <Link href={item.href} key={item.title} className="group block h-full">
                    <Card className="text-center h-full hover:bg-muted/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center p-6">
                        <CardHeader className="p-0 flex flex-col items-center justify-center">
                            {item.icon}
                            <CardTitle className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">{item.title}</CardTitle>
                        </CardHeader>
                        <CardDescription className="mt-2 text-sm">{item.description}</CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">Cafe Learning</span>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {year} Cafe Learning. Dibuat oleh Arul Faathir.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
