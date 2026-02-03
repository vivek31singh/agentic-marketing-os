import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';

export default function ContentFactoryLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-4 w-[500px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Metrics Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <MetricStat.Skeleton key={i} />
        ))}
      </div>

      {/* Active Threads Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Thread Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-24 ml-auto" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}