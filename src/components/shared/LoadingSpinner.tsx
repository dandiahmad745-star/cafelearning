'use client';

import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 animate-blur-in', className)}>
      <div className="relative h-24 w-24 text-primary/50 animate-pulse">
        <svg
            viewBox="0 0 54 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M36.035 63.911C36.035 63.911 41.381 44.252 52.33 34.966C63.278 25.68 52.144 1 52.144 1C52.144 1 45.703 14.85 36.035 23.953C26.367 33.056 22.848 44.975 22.848 44.975" />
            <path d="M18.883 10.09C18.883 10.09 13.537 29.749 2.588 39.035C-8.36 48.321 2.774 73 2.774 73C2.774 73 9.215 59.15 18.883 50.047C28.551 40.944 32.07 29.025 32.07 29.025" />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Brewing your page...</p>
    </div>
  );
};

export default LoadingSpinner;
