import Link from 'next/link';
import { LucideLayoutDashboard, LucideSearch, LucideFileText, LucideShare2, LucideRocket, LucideSettings } from 'lucide-react';
import { mockWorkspacesWithModules, type WorkspaceWithModules, type Module } from '@/data/mockData';

interface LeftNavProps {
  workspaceId: string;
}

export function LeftNav({ workspaceId }: LeftNavProps) {
  const workspace = mockWorkspacesWithModules.find((w: WorkspaceWithModules) => w.id === workspaceId);
  const modules = workspace?.modules || [];

  const getModuleIcon = (moduleName: string) => {
    const name = moduleName.toLowerCase();
    if (name.includes('seo')) return LucideSearch;
    if (name.includes('content')) return LucideFileText;
    if (name.includes('social')) return LucideShare2;
    if (name.includes('saas')) return LucideRocket;
    return LucideLayoutDashboard;
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      {/* Workspace Header */}
      <div className="flex h-16 items-center border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-semibold">
            {workspace?.name.charAt(0) || 'W'}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              {workspace?.name || 'Unknown'}
            </h2>
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${(workspace?.health ?? 0) >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {workspace?.status || 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {/* Mission Control Link */}
          <Link
            href={`/workspaces/${workspaceId}`}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <LucideLayoutDashboard className="h-4 w-4" />
            <span>Mission Control</span>
          </Link>

          {/* Module Links */}
          <div className="mt-4">
            <h3 className="mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
              Modules
            </h3>
            {modules.map((module: Module) => {
              const Icon = getModuleIcon(module.name);
              return (
                <Link
                  key={module.id}
                  href={`/workspaces/${workspaceId}/modules/${module.id}`}
                  className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{module.name.replace(/_/g, ' ')}</span>
                  </div>
                  {module.activeThreadsCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-100 px-1.5 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                      {module.activeThreadsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Settings Link */}
          <div className="mt-4">
            <Link
              href={`/workspaces/${workspaceId}/settings`}
              className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LucideSettings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-medium">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              John Doe
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
