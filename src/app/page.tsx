// This file is the root page, but we are using internationalized routing.
// The actual home page is in [locale]/page.tsx.
// This page should just redirect to the default locale.

import {redirect} from 'next/navigation';

export default function RootPage() {
  redirect('/id');
}
