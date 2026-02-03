'use client';

import { useState } from 'react';
import { missionControlData } from '@/data/missionControl';
import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { cn } from '@/lib/utils';

export default function MissionControlPage({
  params
}: {
  params: { workspaceId: string };
}) {
  const [selectedBoard, setSelectedBoard] = useState('All');
  
  // Extract kpis from mission control data with fallback
  const kpis = missionControlData?.kpis || [];
  const columns = missionControlData?.columns || [];
  const items = missionControlData?.items || [];
  const activities = missionControlData?.activities || [];

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* Board Header */}
      <BoardHeader
        workspaceId={params.workspaceId}
        selectedBoard={selectedBoard}
        onBoardChange={setSelectedBoard}
      />

      {/* Board Insights Strip - KPIs */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <BoardInsightsStrip kpis={kpis} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kanban Board Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <KanbanBoard
            columns={columns}
            items={items}
          />
        </div>

        {/* Live Activity Rail */}
        <div className="w-80 border-l border-slate-200 bg-slate-50">
          <LiveActivityRail activities={activities} />
        </div>
      </div>
    </div>
  );
}
