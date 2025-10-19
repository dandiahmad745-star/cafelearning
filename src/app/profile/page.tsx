'use client';

import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  useEffect(() => {
    notFound();
  }, []);

  return null;
}
