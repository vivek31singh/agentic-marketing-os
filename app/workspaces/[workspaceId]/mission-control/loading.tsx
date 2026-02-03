import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export default function MissionControlLoading() {
  return (
    <div className="space-y-6">
      {/* Header Bar Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* KPI Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-9 w-20 mb-2" />
            <Skeleton className="h-3 w-full" />
          </Card>
        ))}
      </div>

      {/* Bottom Grid: Domain Health, Active Threads, Live Agent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Health Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </Card>

        {/* Active Threads Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border border-border rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Agent Activity Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
