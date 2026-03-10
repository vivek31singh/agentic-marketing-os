'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, MetricStat, Badge, Button } from '@/components/ui';
import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { MetricsGrid } from '@/components/common/MetricsGrid';
import { getMissionControlData, getWorkspace } from '@/lib/apiMock';
import { Activity, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

export default function MissionControlPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [workspace, setWorkspace] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [missionData, workspaceData] = await Promise.all([
          getMissionControlData(workspaceId),
          getWorkspace(workspaceId)
        ]);
        setData(missionData);
        setWorkspace(workspaceData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-slate-50/50">
        {/* Header Skeleton */}
        <div className="h-16 w-full flex-shrink-0 border-b bg-white px-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 bg-slate-100 animate-pulse rounded" />
            <div className="h-3 w-24 bg-slate-100 animate-pulse rounded" />
          </div>
          <div className="h-9 w-24 bg-slate-100 animate-pulse rounded" />
        </div>

        <div className="flex-1 overflow-hidden p-6 space-y-6 flex flex-col">
          {/* Metrics Grid Skeleton */}
          <div className="flex-shrink-0">
            <MetricsGrid.Skeleton count={5} className="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
          </div>

          {/* Canvas Skeleton */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
            {/* Kanban Skeleton */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-full bg-slate-50 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Rail Skeleton */}
            <div className="w-full lg:w-80 flex-shrink-0 bg-white rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="h-6 w-32 bg-slate-100 animate-pulse rounded" />
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-slate-50 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data || !workspace) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load Mission Control</h3>
          <p className="text-muted-foreground mb-4">{error || 'Unknown error occurred'}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50/50">
      {/* Header */}
      <BoardHeader
        workspaceName={workspace.name}
        workspaceStatus={workspace.status}
      />

      {/* Main Scrollable Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="flex-1 flex flex-col p-4 md:p-6 gap-6">
          {/* Row 1: Insights Strip */}
          <div className="flex-shrink-0">
            <BoardInsightsStrip kpis={data.stats} />
          </div>

          {/* Row 2: Workspace Canvas (Kanban + Intelligence) */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[500px]">
            {/* Left: Kanban Board Canvas */}
            <div className="flex-1 flex flex-col min-w-0 bg-white/40 rounded-xl border border-slate-200/60 shadow-sm overflow-hidden relative backdrop-blur-sm">
              <div className="flex-1 overflow-hidden">
                <KanbanBoard columns={data.columns} items={data.items} />
              </div>
            </div>

            {/* Right: System Intelligence / Live Activity */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
              {/* We can group System Intelligence here if separate, for now using LiveActivityRail */}
              <div className="flex-1 min-h-[300px] bg-white/40 rounded-xl border border-slate-200/60 shadow-sm overflow-hidden backdrop-blur-sm">
                <LiveActivityRail activities={data.liveActivity} agents={data.activeAgents || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}