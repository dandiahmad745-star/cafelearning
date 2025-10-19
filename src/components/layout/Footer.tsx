import Link from 'next/link';
import Logo from '@/components/icons/Logo';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">Netlify Brew</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
            <Link href="/coffees" className="hover:text-primary transition-colors">Kenali Biji Kopi</Link>
            <Link href="/tools" className="hover:text-primary transition-colors">Peralatan Barista</Link>
            <Link href="/guides" className="hover:text-primary transition-colors">Panduan Seduh</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/forum" className="hover:text-primary transition-colors">Forum</Link>
            <Link href="/owner" className="hover:text-primary transition-colors">Owner</Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {year} Netlify Brew. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
