import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { missionControlData, kanbanColumns } from '@/data/missionControl';

export default function MissionControlPage() {
  // Extract data from missionControlData
  const { columns, items, stats } = missionControlData;

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <BoardHeader workspaceName="TechStart" workspaceStatus="active" />
      
      {/* KPI Insights Strip */}
      <BoardInsightsStrip stats={stats} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kanban Board - Left Side */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <KanbanBoard 
            columns={columns || kanbanColumns} 
            items={items || []} 
          />
        </div>
        
        {/* Live Activity Rail - Right Side */}
        <div className="w-80 border-l border-border bg-card/50 overflow-y-auto">
          <LiveActivityRail />
        </div>
      </div>
    </div>
  );
}
