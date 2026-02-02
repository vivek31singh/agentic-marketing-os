import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricStat } from '@/components/ui/MetricStat';
import { workspaces } from '@/data/mockData';
import { ArrowRight, LayoutDashboard, Zap, Shield } from 'lucide-react';

export default function RootPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-6 shadow-lg shadow-primary-500/30">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            Agentic Marketing OS
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Select a workspace to access your AI-powered marketing operations
          </p>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Card
              key={workspace.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 backdrop-blur-sm"
            >
              <div className="p-6">
                {/* Workspace Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                      <LayoutDashboard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                        {workspace.name}
                      </h3>
                      <Badge
                        variant={workspace.status === 'active' ? 'success' : workspace.status === 'error' ? 'error' : 'neutral'}
                        className="mt-1"
                      >
                        {workspace.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Workspace ID */}
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 font-mono">
                  ID: {workspace.id}
                </div>

                {/* Health Metric */}
                <div className="mb-6">
                  <MetricStat
                    label="System Health"
                    value={workspace.health}
                    suffix="%"
                    trend={workspace.health >= 80 ? 'up' : workspace.health >= 50 ? 'neutral' : 'down'}
                    icon={<Zap className="w-4 h-4" />}
                  />
                </div>

                {/* Action Button */}
                <Link href={`/workspaces/${workspace.id}`} className="block">
                  <Button
                    variant="primary"
                    className="w-full group-hover:bg-primary-600 transition-colors"
                  >
                    Enter Workspace
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}

          {/* Create New Workspace Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-transparent hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer">
            <div className="p-6 h-full flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 flex items-center justify-center mb-4 transition-colors">
                <Shield className="w-6 h-6 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-700 dark:text-neutral-300 mb-2">
                Create New Workspace
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Set up a new marketing operations environment
              </p>
              <div className="mt-4 text-primary-600 dark:text-primary-400 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Coming Soon
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-neutral-500 dark:text-neutral-400">
          <p>Agentic Marketing OS v1.0 • Built for Production</p>
        </div>
      </div>
    </main>
  );
}
