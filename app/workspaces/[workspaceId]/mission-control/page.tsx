import { getMissionControlData } from '@/lib/apiMock';
import { BoardHeader } from '@/components/domains/kanban/BoardHeader';
import { KanbanBoard } from '@/components/domains/kanban/KanbanBoard';
import { LiveActivityRail } from '@/components/domains/kanban/LiveActivityRail';
import { BoardInsightsStrip } from '@/components/domains/kanban/BoardInsightsStrip';

interface MissionControlPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function MissionControlPage({ params }: MissionControlPageProps) {
  const data = await getMissionControlData(params.workspaceId);

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <BoardHeader 
        workspaceName="TechStart" 
        workspaceId={params.workspaceId}
      />

      {/* KPI Insights Strip */}
      <div className="px-6 py-4">
        <BoardInsightsStrip insights={data.insights} />
      </div>

      {/* Main Content Area - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden px-6 pb-6 gap-6">
        {/* Left: Kanban Board (Main) */}
        <div className="flex-1 overflow-hidden">
          <KanbanBoard 
            columns={data.columns}
            threads={data.threads}
          />
        </div>

        {/* Right: Live Activity Rail (Sidebar) */}
        <div className="w-80 overflow-hidden">
          <LiveActivityRail activities={data.liveActivities} />
        </div>
      </div>
    </div>
  );
}