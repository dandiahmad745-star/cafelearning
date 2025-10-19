import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 text-center py-20">
      <PageHeader
        title="404 - Page Not Found"
        description="Oops! The page you're looking for seems to have wandered off. Let's get you back on track."
      />
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
