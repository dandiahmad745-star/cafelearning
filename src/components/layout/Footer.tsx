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
          <nav className="flex gap-6 text-muted-foreground text-sm">
            <Link href="/coffees" className="hover:text-primary transition-colors">Biji Kopi</Link>
            <Link href="/guides" className="hover:text-primary transition-colors">Panduan</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
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
