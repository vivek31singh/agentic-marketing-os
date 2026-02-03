import React from 'react';
import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { missionControlData } from '@/data/missionControl';

export default function MissionControlPage() {
  return (
    <div className="flex h-full flex-col">
      <BoardHeader workspaceName={missionControlData.workspace.name} />
      
      <BoardInsightsStrip insights={missionControlData.kpiInsights} />
      
      <div className="flex flex-1 gap-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <KanbanBoard items={missionControlData.activeThreads} />
        </div>
        
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <LiveActivityRail activities={missionControlData.liveActivity} />
        </div>
      </div>
    </div>
  );
}