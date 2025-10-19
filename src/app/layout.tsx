import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loading from './loading';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import SupabaseProvider from '@/lib/supabase/provider';

export const metadata: Metadata = {
  title: 'Cafe Learning',
  description: 'Dibuat oleh Arul Faathir',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <SupabaseProvider session={session}>
          <Header />
          <main className="flex-grow flex flex-col">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
