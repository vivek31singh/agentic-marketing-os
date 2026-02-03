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
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* General Information Section */}
      <Card className="p-6 space-y-6">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </Card>

      {/* Integrations Section */}
      <Card className="p-6 space-y-6">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-4">
          {/* Integration Card 1 */}
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          {/* Integration Card 2 */}
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          {/* Integration Card 3 */}
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </Card>

      {/* Guardrails Section */}
      <Card className="p-6 space-y-6">
        <Skeleton className="h-6 w-36" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-56" />
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <div className="flex items-center space-x-3">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
