'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getModule } from '@/lib/apiMock';
import { Search, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface SEOClusterPageProps {
  workspaceId: string;
  moduleSlug: string;
}

export default function SEOClusterPage({ workspaceId, moduleSlug }: SEOClusterPageProps) {
  const [loading, setLoading] = useState(true);
  const [moduleData, setModuleData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getModule('SEO_Cluster');
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
        <div className="h-16 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !moduleData) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load SEO Cluster</h3>
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
          <h1 className="text-2xl font-bold mb-1">SEO Cluster</h1>
          <p className="text-muted-foreground">Monitor and optimize your search engine performance</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Active
          </Badge>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricStat
          label="Crawl Health"
          value={`${metrics?.crawlHealth || 94}%`}
          trend={+2.5}
          icon={<Search className="h-4 w-4" />}
        />
        <MetricStat
          label="Indexed Pages"
          value={metrics?.indexedPages?.toLocaleString() || '2,847'}
          trend={+5.2}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricStat
          label="Organic Traffic"
          value={metrics?.organicTraffic || '45.2K'}
          trend={+8.1}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricStat
          label="Technical Issues"
          value={metrics?.technicalIssues || 12}
          trend={-15}
          icon={<AlertCircle className="h-4 w-4" />}
          inverseTrend
        />
      </div>

      {/* Active Threads Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Active Optimization Threads</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {threads?.map((thread: any) => (
            <Link
              key={thread.id}
              href={`/workspaces/${workspaceId}/modules/seo-cluster/${thread.id}`}
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