'use client';

import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { mockMissionThreads, mockMissionKPIs, mockLiveActivity } from '@/data/missionControl';

export default function MissionControlPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-50">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <BoardHeader />
      </div>

      {/* Insights Strip */}
      <div className="border-b border-slate-200 bg-white px-6 py-3">
        <BoardInsightsStrip kpis={mockMissionKPIs} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kanban Board - Left Side */}
        <div className="flex-1 overflow-auto p-6">
          <KanbanBoard items={mockMissionThreads} />
        </div>

        {/* Live Activity Rail - Right Side */}
        <div className="w-80 border-l border-slate-200 bg-white">
          <LiveActivityRail activities={mockLiveActivity} />
        </div>
      </div>
    </div>
  );
}
