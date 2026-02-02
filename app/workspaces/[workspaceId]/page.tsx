'use client';

import { useParams } from 'next/navigation';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Zap,
  Cpu,
  Layers,
  Rocket
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { mockData } from '@/data/mockData';

export default function MissionControlDashboard() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  
  // Get workspace data from mock
  const workspace = mockData.workspaces.find(w => w.id === workspaceId);
  
  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-8">
          <p className="text-neutral-600">Workspace not found</p>
        </Card>
      </div>
    );
  }

  // Calculate metrics
  const totalActiveThreads = workspace.modules.reduce((sum, mod) => sum + (mod.activeThreadsCount || 0), 0);
  const totalModules = workspace.modules.length;
  const activeModules = workspace.modules.filter(m => m.active).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-neutral-900">{workspace.name}</h1>
            <Badge variant={workspace.status === 'active' ? 'success' : 'warning'}>
              {workspace.status}
            </Badge>
          </div>
          <p className="text-neutral-600">Mission Control Dashboard - System Overview</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            View Logs
          </Button>
          <Button variant="primary" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Threads Card */}
        <Card variant="default">
          <CardContent className="p-4">
            <MetricStat
              label="Active Threads"
              value={totalActiveThreads}
              trend={{ value: 12, direction: 'up' }}
              icon={<Activity className="w-5 h-5 text-primary-500" />}
              size="default"
            />
            <ProgressBar value={75} className="mt-3" />
            <p className="text-xs text-neutral-500 mt-2">75% of capacity utilized</p>
          </CardContent>
        </Card>

        {/* System Health Card */}
        <Card variant="default">
          <CardContent className="p-4">
            <MetricStat
              label="System Health"
              value={`${workspace.health}%`}
              trend={{ value: 3, direction: 'up' }}
              icon={<CheckCircle className="w-5 h-5 text-success-500" />}
              size="default"
            />
            <ProgressBar value={workspace.health} className="mt-3" variant="success" />
            <p className="text-xs text-neutral-500 mt-2">All systems operational</p>
          </CardContent>
        </Card>

        {/* Active Agents Card */}
        <Card variant="default">
          <CardContent className="p-4">
            <MetricStat
              label="Active Agents"
              value={8}
              trend={{ value: 2, direction: 'up' }}
              icon={<Cpu className="w-5 h-5 text-primary-500" />}
              size="default"
            />
            <ProgressBar value={80} className="mt-3" />
            <p className="text-xs text-neutral-500 mt-2">8 of 10 agents active</p>
          </CardContent>
        </Card>

        {/* Modules Card */}
        <Card variant="default">
          <CardContent className="p-4">
            <MetricStat
              label="Active Modules"
              value={`${activeModules}/${totalModules}`}
              trend={{ value: 0, direction: 'neutral' }}
              icon={<Layers className="w-5 h-5 text-info-500" />}
              size="default"
            />
            <ProgressBar value={(activeModules / totalModules) * 100} className="mt-3" variant="info" />
            <p className="text-xs text-neutral-500 mt-2">{activeModules} modules currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Accessible Modules Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Accessible Modules</h2>
          <Button variant="ghost" size="sm">
            View All
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspace.modules.map((module) => (
            <Card key={module.id} variant="default" className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{module.name.replace('_', ' ')}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{module.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={module.active ? 'success' : 'neutral'}>
                    {module.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Activity className="w-4 h-4" />
                    <span>{module.activeThreadsCount} active threads</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>Last: 2m ago</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <Rocket className="w-3 h-3 mr-1" />
                    Launch
                  </Button>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-success-50 rounded-full">
                    <CheckCircle className="w-4 h-4 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      Task completed successfully
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      SEO_Cluster module finished crawl optimization
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400">{item}m ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
