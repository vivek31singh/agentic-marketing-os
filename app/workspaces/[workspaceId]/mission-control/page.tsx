import {
  mockStatusChips,
  mockDashboardMetrics,
  mockDomainSnapshots,
  mockActiveThreads,
  type StatusChip,
  type DashboardMetric,
  type DomainSnapshot,
  type ActiveThreadPreview
} from '@/data/missionControl';
import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { AgentActivityFeed } from '@/components/dashboard/AgentActivityFeed';

interface MissionControlDashboardProps {
  params: {
    workspaceId: string;
  };
}

function getStatusIcon(variant: StatusChip['variant']) {
  switch (variant) {
    case 'success':
      return <CheckCircle className="h-4 w-4" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4" />;
    case 'error':
      return <AlertCircle className="h-4 w-4" />;
    case 'info':
      return <Activity className="h-4 w-4" />;
    case 'default':
      return <Clock className="h-4 w-4" />;
    default:
      return null;
  }
}

function getStatusVariant(status: DomainSnapshot['status']): StatusChip['variant'] {
  switch (status) {
    case 'healthy':
      return 'success';
    case 'warning':
      return 'warning';
    case 'critical':
      return 'error';
    case 'idle':
      return 'default';
    default:
      return 'default';
  }
}

function getThreadStatusVariant(status: ActiveThreadPreview['status']): StatusChip['variant'] {
  switch (status) {
    case 'active':
      return 'success';
    case 'paused':
      return 'warning';
    case 'blocked':
      return 'error';
    case 'completed':
      return 'info';
    default:
      return 'default';
  }
}

export default function MissionControlDashboard({ params }: MissionControlDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Mission Control</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Workspace: {params.workspaceId} • Real-time system overview
          </p>
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap gap-2">
          {mockStatusChips.map((chip) => (
            <Badge
              key={chip.id}
              variant={chip.variant}
            >
              {chip.label}
              {chip.count !== undefined && (
                <span className="ml-1 font-semibold">{chip.count}</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDashboardMetrics.map((metric) => (
          <MetricStat
            key={metric.id}
            label={metric.label}
            value={metric.value}
            change={metric.trend === 'up' ? 2 : metric.trend === 'down' ? -2 : 0}
          />
        ))}
      </div>

      {/* Main Grid: Statistics & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Domain Snapshots & Active Threads */}
        <div className="lg:col-span-2 space-y-6">
          {/* Domain Snapshots Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Domain Health</h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDomainSnapshots.slice(0, 4).map((domain) => (
                <Card key={domain.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-neutral-900">{domain.name}</h3>
                        <p className="text-xs text-neutral-500 mt-0.5">Updated {domain.lastUpdated}</p>
                      </div>
                      <Badge variant={getStatusVariant(domain.status)}>{domain.status}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Stability</span>
                        <span className="font-medium text-neutral-700">{domain.health}%</span>
                      </div>
                      <ProgressBar value={domain.health} max={100} variant={domain.health >= 80 ? 'success' : 'warning'} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Threads Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">Active Threads</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <Card className="divide-y divide-neutral-100">
              {mockActiveThreads.slice(0, 3).map((thread) => (
                <div key={thread.id} className="p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-neutral-900 truncate">{thread.title}</h3>
                        <Badge variant={getThreadStatusVariant(thread.status)}>{thread.status}</Badge>
                      </div>
                      <p className="text-xs text-neutral-500">{thread.module}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-neutral-900">{thread.progress}%</div>
                      <div className="text-[10px] text-neutral-400">{thread.lastActivity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {/* Right Column: Live Agent Activity Feed */}
        <div className="lg:col-span-1">
          <AgentActivityFeed />
        </div>
      </div>

    </div>
  );
}
