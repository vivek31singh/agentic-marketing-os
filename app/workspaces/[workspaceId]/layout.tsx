import { LeftNav } from '@/components/layout/LeftNav';
import { TopBar } from '@/components/layout/TopBar';
import { RightRail } from '@/components/layout/RightRail';
import { mockWorkspaces } from '@/data/mockData';

export default function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  const workspace = mockWorkspaces.find(w => w.id === params.workspaceId);

  // If workspace doesn't exist, you could redirect to 404
  if (!workspace) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Top Bar */}
      <TopBar workspaceId={params.workspaceId} title={workspace.name} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <LeftNav workspaceId={params.workspaceId} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Right Rail - Context Sidebar */}
        <RightRail workspaceId={params.workspaceId} />
      </div>
    </div>
  );
}
