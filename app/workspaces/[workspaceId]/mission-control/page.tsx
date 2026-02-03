'use client';

import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { kanbanColumns, kanbanCards, kanbanKPIs, kanbanActivities, domainHealthData } from '@/data/missionControl';

export default function MissionControlPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <BoardHeader
        workspaceName="TechStart"
        workspaceId={params.workspaceId}
        status="active"
      />
      
      <BoardInsightsStrip kpis={kanbanKPIs} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 min-w-0">
          <KanbanBoard
            columns={kanbanColumns}
            cards={kanbanCards}
            domains={domainHealthData}
          />
        </div>
        
        <LiveActivityRail activities={kanbanActivities} />
      </div>
    </div>
  );
}
