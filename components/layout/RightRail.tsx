import { LucideActivity, LucideClock, LucideZap } from 'lucide-react';

interface RightRailProps {
  workspaceId: string;
}

export function RightRail({ workspaceId }: RightRailProps) {
  return (
    <aside className="flex h-screen w-80 flex-col border-l border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      {/* Active Agents Section */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
          Active Agents
        </h3>
        <div className="space-y-3">
          {/* Agent 1 */}
          <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300 text-xs font-medium">
                TL
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  Tech_Lead
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Working on SEO analysis
                </p>
              </div>
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <LucideActivity className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">98.2%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LucideZap className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">42ms</span>
              </div>
            </div>
          </div>

          {/* Agent 2 */}
          <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium">
                CS
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  Content_Strategist
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Drafting Q1 blog posts
                </p>
              </div>
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <LucideActivity className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">94.7%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LucideZap className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-400">67ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 text-xs">
              <LucideActivity className="h-3 w-3" />
            </div>
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Tech_Lead</span> resolved conflict #42
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                2 minutes ago
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300 text-xs">
              <LucideClock className="h-3 w-3" />
            </div>
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Crawl_Spider</span> completed crawl job
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                8 minutes ago
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300 text-xs">
              <LucideZap className="h-3 w-3" />
            </div>
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-medium">Content_Strategist</span> created new draft
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                15 minutes ago
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600 dark:text-slate-400">System Health</span>
          <div className="flex items-center gap-1.5">
            <div className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Optimal</span>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-1.5 w-[92%] rounded-full bg-emerald-500" />
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          92% of agents operating normally
        </p>
      </div>
    </aside>
  );
}
