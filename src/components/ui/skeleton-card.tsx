import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  lines?: number;
}

export const SkeletonCard = ({ 
  className, 
  showImage = true,
  lines = 3 
}: SkeletonCardProps) => {
  return (
    <div className={cn("rounded-xl border border-border p-4 space-y-4", className)}>
      {showImage && (
        <Skeleton className="w-full aspect-square rounded-lg" />
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={cn(
              "h-4", 
              i === 0 ? "w-3/4" : i === lines - 1 ? "w-1/2" : "w-full"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ 
  count = 4,
  className 
}: { 
  count?: number;
  className?: string;
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
};
