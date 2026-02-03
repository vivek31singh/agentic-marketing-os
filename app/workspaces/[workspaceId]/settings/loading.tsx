import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Tabs/Navigation Skeleton */}
      <div className="flex space-x-4 border-b border-neutral-200 pb-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* General Information Section Skeleton */}
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex items-center space-x-4 pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>

      {/* Integrations Section Skeleton */}
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-9 w-20" />
            </div>
          ))}
        </div>
      </Card>

      {/* Guardrails Section Skeleton */}
      <Card className="p-6 space-y-4">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-4 w-72" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
            <div className="flex items-center space-x-4 pt-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>
    </div>
  );
}
