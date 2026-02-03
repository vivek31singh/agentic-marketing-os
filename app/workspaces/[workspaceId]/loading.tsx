import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';

export default function WorkspaceLoading() {
  return (
    <div className="flex h-full">
      {/* Sidebar Skeleton */}
      <aside className="hidden w-64 border-r border-border bg-card lg:flex flex-col">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-8 w-32" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </nav>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar Skeleton */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </header>

        {/* Page Content Skeleton */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header Section */}
          <div className="mb-6">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>

          {/* Metric Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-full" />
              </Card>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Right Rail Skeleton */}
      <aside className="hidden w-80 border-l border-border bg-card xl:flex flex-col">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-2 w-2/3" />
            </Card>
          ))}
        </div>
      </aside>
    </div>
  );
}
