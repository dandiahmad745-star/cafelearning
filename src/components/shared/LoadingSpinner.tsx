'use client';

import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2', className)}>
      <div className="relative h-20 w-20 text-primary">
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 21h8" />
          <path d="M19 8H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
          <path d="M19 8V6c0-1.1-.9-2-2-2H7C5.9 4 5 4.9 5 6v2" />
          
          {/* Steam animations */}
          <path
            d="M6 5c.5.8 1.5 1 2.5 1s2-.2 2.5-1"
            className="opacity-0 animate-steam"
            style={{ animationDelay: '0s' }}
          />
          <path
            d="M10 5c.5.8 1.5 1 2.5 1s2-.2 2.5-1"
            className="opacity-0 animate-steam"
            style={{ animationDelay: '1s' }}
          />
          <path
            d="M14 5c.5.8 1.5 1 2.5 1s2-.2 2.5-1"
            className="opacity-0 animate-steam"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Brewing your page...</p>
    </div>
  );
};

export default LoadingSpinner;
