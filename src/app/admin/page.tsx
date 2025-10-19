'use client';

import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    notFound();
  }, []);

  return null;
}
