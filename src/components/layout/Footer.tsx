import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { Coffee, Beaker, BookOpen, MessageSquare, Newspaper } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const footerNavItems = [
  {
    href: '/coffees',
    title: 'Kenali Biji Kopi',
    description: 'Jelajahi berbagai jenis biji kopi dari seluruh dunia.',
    icon: <Coffee className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/tools',
    title: 'Peralatan Barista',
    description: 'Temukan peralatan penting yang digunakan oleh para profesional.',
    icon: <Beaker className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/guides',
    title: 'Panduan Seduh',
    description: 'Pelajari cara menyeduh kopi yang sempurna dengan panduan langkah demi langkah.',
    icon: <BookOpen className="h-8 w-8 mb-4 text-accent" />,
  },
  {
    href: '/blog',
    title: 'Blog',
    description: 'Baca cerita, tips, dan wawasan dari dunia kopi.',
    icon: <Newspaper className="h-8 w-8 mb-4 text-accent" />,
  },
    {
    href: '/forum',
    title: 'Forum',
    description: 'Bergabunglah dengan komunitas dan diskusikan semua hal tentang kopi.',
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
                        <CardHeader className="p-0">
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
                <span className="font-headline text-lg font-bold">Netlify Brew</span>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {year} Netlify Brew. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
