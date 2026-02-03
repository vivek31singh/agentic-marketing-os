'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { getMissionControlData, getWorkspace } from '@/lib/apiMock';
import { Activity, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

interface MissionControlPageProps {
  workspaceId: string;
}

export default function MissionControlPage({ workspaceId }: MissionControlPageProps) {
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
      <div className="p-6 space-y-6">
        <div className="h-12 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-96 bg-muted animate-pulse rounded" />
          <div className="h-96 bg-muted animate-pulse rounded" />
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <BoardHeader 
        workspaceName={workspace.name}
        workspaceId={workspaceId}
        status={workspace.status}
      />

      {/* Insights Strip */}
      <BoardInsightsStrip stats={data.stats} />

      {/* Main Content Grid */}
      <div className="flex-1 overflow-hidden p-6 flex gap-6">
        {/* Left Column: Kanban Board */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <KanbanBoard columns={data.columns} items={data.items} />
        </div>

        {/* Right Column: Live Activity Rail */}
        <div className="w-80 overflow-hidden flex-shrink-0">
          <LiveActivityRail activities={data.liveActivity} />
        </div>
      </div>
    </div>
  );
}