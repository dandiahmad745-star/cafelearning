'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Coffee, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainNavLinks = [
  { href: '/coffees', label: 'Kenali Biji Kopi' },
  { href: '/tools', label: 'Peralatan Barista' },
];

const otherNavLinks = [
  { href: '/guides', label: 'Panduan Seduh' },
  { href: '/blog', label: 'Blog' },
  { href: '/forum', label: 'Forum' },
];

const allNavLinks = [...mainNavLinks, ...otherNavLinks];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-muted-foreground',
          className
        )}
        onClick={() => setSheetOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center gap-2" onClick={() => setSheetOpen(false)}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Netlify Brew</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground p-0 h-auto">
                Lainnya
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {otherNavLinks.map((link) => (
                 <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-8">
                <Link href="/" className="mb-4 flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">Netlify Brew</span>
                </Link>
                {allNavLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
