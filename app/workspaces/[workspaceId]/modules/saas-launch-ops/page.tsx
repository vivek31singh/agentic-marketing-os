'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getModule } from '@/lib/apiMock';
import { MetricsGrid } from '@/components/common/MetricsGrid';
import { Rocket, ClipboardCheck, Clock, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

export default function SaaSLaunchOpsPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const moduleSlug = params.moduleSlug as string;
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getModule('SaaS_Launch_Ops');
        setModuleData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load module data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-100 animate-pulse rounded" />
          <div className="h-4 w-96 bg-slate-50 animate-pulse rounded" />
        </div>

        {/* Metrics Grid Skeleton */}
        <MetricsGrid.Skeleton />

        {/* Threads Grid Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 rounded-xl border border-slate-200 bg-white p-4 space-y-4">
                <div className="flex justify-between">
                  <div className="h-6 w-3/4 bg-slate-100 animate-pulse rounded" />
                  <div className="h-6 w-16 bg-slate-100 animate-pulse rounded-full" />
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <div className="h-4 w-24 bg-slate-50 animate-pulse rounded" />
                  <div className="h-4 w-4 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !moduleData) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load SaaS Launch Ops</h3>
          <p className="text-muted-foreground mb-4">{error || 'Unknown error occurred'}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  const { metrics, threads } = moduleData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">SaaS Launch Ops</h1>
          <p className="text-muted-foreground">Coordinate and execute successful product launches</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Rocket className="h-3 w-3" />
            Launch Mode
          </Badge>
        </div>
      </div>

      {/* Metrics Grid */}
      <MetricsGrid metrics={[
        {
          label: "Launch Readiness",
          value: `${metrics?.launchReadiness || 87}%`,
          change: +5.2,
          icon: Rocket,
          intent: "emerald"
        },
        {
          label: "Asset Approval Queue",
          value: metrics?.assetApprovalQueue || 14,
          change: -10,
          icon: ClipboardCheck,
          intent: "sky"
        },
        {
          label: "Days to Launch",
          value: metrics?.daysToLaunch || 23,
          change: -2,
          icon: Clock,
          intent: "indigo"
        },
        {
          label: "Pre-launch Signups",
          value: metrics?.prelaunchSignups?.toLocaleString() || '2,847',
          change: +18.5,
          icon: TrendingUp,
          intent: "rose"
        }
      ]} />

      {/* Active Threads Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Active Launch Threads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {threads?.map((thread: any) => (
            <Link
              key={thread.id}
              href={`/workspaces/${workspaceId}/modules/saas-launch-ops/${thread.id}`}
            >
              <Card className="p-4 hover:border-primary transition-colors cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{thread.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {thread.objective}
                    </p>
                  </div>
                  <Badge variant={thread.status === 'active' ? 'success' : 'warning'}>
                    {thread.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {thread.events?.length || 0} events
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}