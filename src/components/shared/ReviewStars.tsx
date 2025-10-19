'use client';

import type { FC } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type ReviewStarsProps = {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  onRate?: (rating: number) => void;
  isInteractive?: boolean;
};

const ReviewStars: FC<ReviewStarsProps> = ({
  rating,
  totalStars = 5,
  size = 20,
  className,
  onRate,
  isInteractive = false,
}) => {
  const stars = Array.from({ length: totalStars }, (_, i) => i + 1);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {stars.map((starValue) => (
        <Star
          key={starValue}
          size={size}
          className={cn(
            'transition-colors',
            starValue <= rating ? 'text-accent fill-accent' : 'text-muted-foreground/50',
            isInteractive && 'cursor-pointer hover:text-accent'
          )}
          onClick={() => onRate?.(starValue)}
        />
      ))}
    </div>
  );
};

export default ReviewStars;
