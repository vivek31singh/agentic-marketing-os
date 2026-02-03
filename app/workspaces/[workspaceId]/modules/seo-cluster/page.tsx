"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';
import { getModule } from '@/lib/apiMock';
import { Search, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Thread } from '@/data/mockData';

interface ModuleData {
  module: any;
  threads: Thread[];
  metrics: any[];
}

export default function SEOClusterPage() {
  const params = useParams();
  const [data, setData] = useState<ModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for interactive elements
  const [selectedConflictOption, setSelectedConflictOption] = useState<string | null>(null);
  const [recoveryAction, setRecoveryAction] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const moduleData = await getModule(params.workspaceId as string, 'seo-cluster');
        setData(moduleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load module data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.workspaceId]);

  const handleApproveOption = (threadId: string, optionId: string) => {
    setSelectedConflictOption(optionId);
    // Simulate API call for approval
    setTimeout(() => {
      setSelectedConflictOption(null);
    }, 1000);
  };

  const handleRecoveryAction = (threadId: string, action: string) => {
    setRecoveryAction(prev => ({ ...prev, [threadId]: action }));
    // Simulate API call
    setTimeout(() => {
      setRecoveryAction(prev => {
        const newState = { ...prev };
        delete newState[threadId];
        return newState;
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-neutral-100 rounded animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-neutral-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-error mx-auto mb-4" />
          <p className="text-neutral-600">{error || 'Failed to load module data'}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{data.module.name}</h1>
          <p className="text-neutral-600 mt-1">{data.module.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" withDot>
            {data.module.activeThreadsCount} Active Threads
          </Badge>
        </div>
      </div>

      {/* SEO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.metrics.map((metric, idx) => (
          <MetricStat
            key={idx}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Active Threads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Threads</h2>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search Threads
          </Button>
        </div>

        <div className="space-y-4">
          {data.threads.map((thread) => {
            const hasConflict = thread.events.some(e => e.type === 'conflict');
            const recovery = recoveryAction[thread.id];

            return (
              <Card key={thread.id} className={cn(
                "transition-all",
                hasConflict && "border-error-300 border-2"
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{thread.title}</CardTitle>
                        {hasConflict && (
                          <Badge variant="error" size="sm" withDot>
                            Conflict
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">{thread.objective}</p>
                    </div>
                    <Link href={`/workspaces/${params.workspaceId}/modules/seo-cluster/${thread.id}`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status & Metadata */}
                  <div className="flex items-center gap-3">
                    <Badge variant={thread.status === 'active' ? 'success' : 'neutral'}>
                      {thread.status}
                    </Badge>
                    <span className="text-sm text-neutral-500">
                      {thread.events.length} events
                    </span>
                    {hasConflict && (
                      <span className="text-sm text-error-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Awaiting Resolution
                      </span>
                    )}
                  </div>

                  {/* Interactive Conflict Panel (Inline) */}
                  {hasConflict && (
                    <div className="bg-error-50 border border-error-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-error-900 mb-2">Conflict Detected</h4>
                      <p className="text-sm text-error-700 mb-3">
                        Multiple agents have conflicting approaches. Please review and approve.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveOption(thread.id, 'option1')}
                          disabled={!!selectedConflictOption}
                        >
                          {selectedConflictOption ? 'Approved' : 'Approve Option A'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRecoveryAction(thread.id, 'retry')}
                          disabled={!!recovery}
                        >
                          {recovery === 'retry' ? 'Retrying...' : 'Retry'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleRecoveryAction(thread.id, 'autofix')}
                          disabled={!!recovery}
                        >
                          {recovery === 'autofix' ? 'Auto-fixing...' : 'Auto-Fix'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Success state after recovery */}
                  {recovery === 'autofix' && !recoveryAction[thread.id] && (
                    <div className="bg-success-50 border border-success-200 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success-600" />
                      <span className="text-sm text-success-700">Issue resolved successfully</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}