'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Coffee, ChevronDown, User, LogOut, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/Logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useSupabase } from '@/lib/supabase/provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/navigation';

const mainNavLinks = [
  { href: '/coffees', label: 'Discover Beans' },
  { href: '/tools', label: 'Barista Tools' },
];

const otherNavLinks = [
  { href: '/guides', label: 'Brewing Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/forum', label: 'Forum' },
];

function AuthButton() {
  const { supabase, session } = useSupabase();
  const router = useRouter();
  const user = session?.user;

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name} />
              <AvatarFallback>{user.user_metadata?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem disabled>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.user_metadata?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={handleLogin}>
      <LogIn className="mr-2 h-4 w-4" />
      Login
    </Button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const allNavLinks = [...mainNavLinks, ...otherNavLinks];

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => {
    const isActive = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          isActive ? 'text-primary' : 'text-muted-foreground dark:text-foreground/80',
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
          <span className="font-headline text-lg font-bold">Cafe Learning</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground dark:text-foreground/80 p-0 h-auto">
                More
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
          <AuthButton />
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
                  <span className="font-headline text-lg font-bold">Cafe Learning</span>
                </Link>
                {allNavLinks.map((link) => (
                  <NavLink key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
