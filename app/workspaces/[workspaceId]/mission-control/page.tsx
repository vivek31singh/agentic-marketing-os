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
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight
} from 'lucide-react';

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
    case 'danger':
      return <AlertCircle className="h-4 w-4" />;
    case 'info':
      return <Activity className="h-4 w-4" />;
    case 'neutral':
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
      return 'danger';
    case 'idle':
      return 'neutral';
    default:
      return 'neutral';
  }
}

function getThreadStatusVariant(status: ActiveThreadPreview['status']): StatusChip['variant'] {
  switch (status) {
    case 'active':
      return 'success';
    case 'paused':
      return 'warning';
    case 'blocked':
      return 'danger';
    case 'completed':
      return 'info';
    default:
      return 'neutral';
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
              icon={getStatusIcon(chip.variant)}
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
            change={metric.change}
            trend={metric.trend}
            description={metric.description}
          />
        ))}
      </div>

      {/* Domain Snapshots Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Domain Snapshots</h2>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDomainSnapshots.map((domain) => (
            <Card key={domain.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Domain Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">{domain.name}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Updated {domain.lastUpdated}
                    </p>
                  </div>
                  <Badge variant={getStatusVariant(domain.status)} size="sm">
                    {domain.status}
                  </Badge>
                </div>

                {/* Health Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">Health Score</span>
                    <span className="font-medium text-neutral-700">{domain.health}%</span>
                  </div>
                  <ProgressBar 
                    value={domain.health} 
                    max={100}
                    variant={domain.health >= 80 ? 'success' : domain.health >= 50 ? 'warning' : 'danger'}
                  />
                </div>

                {/* Active Agents */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{domain.activeAgents} Active Agents</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Details
                  </Button>
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
          <Button variant="ghost" size="sm">
            View All Threads
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Card className="divide-y divide-neutral-100">
          {mockActiveThreads.map((thread) => (
            <div key={thread.id} className="p-4 hover:bg-neutral-50 transition-colors">
              <div className="space-y-3">
                {/* Thread Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-neutral-900 truncate">{thread.title}</h3>
                      <Badge variant={getThreadStatusVariant(thread.status)} size="sm">
                        {thread.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-500">{thread.module}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-400 whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {thread.lastActivity}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <ProgressBar 
                    value={thread.progress} 
                    max={100}
                    variant="primary"
                    size="sm"
                  />
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{thread.progress}% Complete</span>
                  </div>
                </div>

                {/* Assigned Agents */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500">Assigned Agents:</span>
                    <div className="flex -space-x-2">
                      {thread.assignedAgents.map((agent, idx) => (
                        <Avatar
                          key={agent}
                          size="xs"
                          className="ring-2 ring-white"
                          fallback={agent.charAt(0)}
                        />
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Thread
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
