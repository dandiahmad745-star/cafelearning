'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import type { Database } from '../database.types';


type SupabaseContextType = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        router.refresh();
      }
    });

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
