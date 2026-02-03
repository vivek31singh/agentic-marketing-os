import { BoardHeader } from "@/components/domains/kanban/BoardHeader";
import { BoardInsightsStrip } from "@/components/domains/kanban/BoardInsightsStrip";
import { KanbanBoard } from "@/components/domains/kanban/KanbanBoard";
import { LiveActivityRail } from "@/components/domains/kanban/LiveActivityRail";
import { mockMissionControlData } from "@/data/missionControl";

export default function MissionControlPage() {
  const { kpis, domainHealth, threads, activities } = mockMissionControlData;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <BoardHeader workspaceId="techstart" />

      {/* KPI Insights Strip */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <BoardInsightsStrip kpis={kpis} />
      </div>

      {/* Main Content Area - Split between Board and Activity Rail */}
      <div className="flex-1 flex overflow-hidden">
        {/* Kanban Board (Left) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <KanbanBoard items={threads} domainHealth={domainHealth} />
        </div>

        {/* Live Activity Rail (Right) */}
        <div className="w-80 border-l border-border bg-muted/30">
          <LiveActivityRail activities={activities} />
        </div>
      </div>
    </div>
  );
}
