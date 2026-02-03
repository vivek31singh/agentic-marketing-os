import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MetricStat } from '@/components/ui/MetricStat';
import { Avatar } from '@/components/ui/Avatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  missionControlData,
  type StatusPill,
  type KPITrend,
  type DomainHealthDetail,
  type ActiveThreadItem,
  type LiveAgentActivity,
} from '@/data/missionControl';
import {
  Activity,
  MessageSquare,
  Clock,
  CheckCircle,
  GitMerge,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Check,
  X,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';

// Helper function to get trend icon
function getTrendIcon(trend: 'up' | 'down' | 'neutral') {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-3 w-3" />;
    case 'down':
      return <TrendingDown className="h-3 w-3" />;
    case 'neutral':
      return <Minus className="h-3 w-3" />;
  }
}

// Helper function to get trend color class
function getTrendColorClass(trend: 'up' | 'down' | 'neutral') {
  switch (trend) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-error';
    case 'neutral':
      return 'text-neutral';
  }
}

// Helper function to get health color
function getHealthColor(health: number) {
  if (health >= 80) return 'bg-success';
  if (health >= 60) return 'bg-warning';
  return 'bg-error';
}

// Helper function to get health status badge
function getHealthStatusBadge(status: 'healthy' | 'warning' | 'critical') {
  switch (status) {
    case 'healthy':
      return <Badge variant="success" size="sm">Healthy</Badge>;
    case 'warning':
      return <Badge variant="warning" size="sm">Warning</Badge>;
    case 'critical':
      return <Badge variant="error" size="sm">Critical</Badge>;
  }
}

// Helper function to get thread status badge
function getThreadStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return <Badge variant="info" size="sm">Active</Badge>;
    case 'pending':
      return <Badge variant="warning" size="sm">Pending</Badge>;
    case 'blocked':
      return <Badge variant="error" size="sm">Blocked</Badge>;
    case 'completed':
      return <Badge variant="success" size="sm">Completed</Badge>;
    default:
      return <Badge variant="neutral" size="sm">{status}</Badge>;
  }
}

// Helper function to get priority badge
function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'high':
      return <Badge variant="error" size="sm" outline>High</Badge>;
    case 'medium':
      return <Badge variant="warning" size="sm" outline>Medium</Badge>;
    case 'low':
      return <Badge variant="neutral" size="sm" outline>Low</Badge>;
    default:
      return <Badge variant="neutral" size="sm" outline>{priority}</Badge>;
  }
}

// Helper function to get activity status icon
function getActivityStatusIcon(status: 'success' | 'pending' | 'error') {
  switch (status) {
    case 'success':
      return <Check className="h-3 w-3 text-success" />;
    case 'pending':
      return <Clock className="h-3 w-3 text-warning" />;
    case 'error':
      return <X className="h-3 w-3 text-error" />;
  }
}

export default function MissionControlPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { statusPills, kpiTrends, domainHealth, activeThreads, liveAgentActivity } =
    missionControlData;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              {missionControlData.workspaceName}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Mission Control Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-neutral-600">
              {missionControlData.workspaceId}
            </Badge>
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-3">
          {statusPills.map((pill: StatusPill) => (
            <Badge
              key={pill.id}
              variant={pill.status === 'neutral' ? 'outline' : pill.status}
              className="flex items-center gap-2"
            >
              {pill.label}
              {pill.count !== undefined && (
                <span className="font-semibold">{pill.count}</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* KPI Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiTrends.map((kpi: KPITrend) => (
          <Card key={kpi.id} className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500">
                  {kpi.label}
                </span>
                <span className={getTrendColorClass(kpi.trend)}>
                  {getTrendIcon(kpi.trend)}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-neutral-900">
                  {kpi.value}
                </span>
                <span
                  className={`text-xs font-medium ${getTrendColorClass(kpi.trend)}`}
                >
                  {kpi.trend === 'up' && <ArrowUpRight className="h-3 w-3 inline mr-1" />}
                  {kpi.trend === 'down' && (
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                  )}
                  {kpi.trendValue}
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                Prev: {kpi.previousValue}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Domain Health & Active Threads */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Domain Health */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Domain Health
              </h2>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {domainHealth.map((domain: DomainHealthDetail) => (
                <div
                  key={domain.id}
                  className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-neutral-900">
                          {domain.name}
                        </h3>
                        {getHealthStatusBadge(domain.status)}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-neutral-500">
                              Health Score
                            </span>
                            <span className="text-sm font-medium text-neutral-900">
                              {domain.health}%
                            </span>
                          </div>
                          <ProgressBar
                            value={domain.health}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {domain.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="text-sm font-medium text-neutral-900">
                            {metric.value}
                          </span>
                          {metric.trend && (
                            <span className={getTrendColorClass(metric.trend)}>
                              {getTrendIcon(metric.trend)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-neutral-500">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Issues */}
                  {domain.issues.length > 0 && (
                    <div className="flex items-start gap-2 text-xs text-warning-600 bg-warning-50 p-2 rounded">
                      <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />\n                      <span>{domain.issues[0]}</span>
                      {domain.issues.length > 1 && (
                        <span className="text-neutral-500">
                          +{domain.issues.length - 1} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-neutral-400 mt-2">
                    Last updated: {domain.lastUpdated}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Threads */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Active Threads
              </h2>
              <Link
                href={`/workspaces/${params.workspaceId}`}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View All Threads
              </Link>
            </div>
            <div className="space-y-3">
              {activeThreads.map((thread: ActiveThreadItem) => (
                <Link
                  key={thread.id}
                  href={`/workspaces/${params.workspaceId}/modules/${thread.module.toLowerCase().replace(/ /g, '-')}/${thread.id}`}
                  className="block"
                >
                  <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-neutral-900 truncate">
                            {thread.title}
                          </h3>
                          {getThreadStatusBadge(thread.status)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <span>{thread.module}</span>
                          <span>•</span>
                          <span>{thread.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        {getPriorityBadge(thread.priority)}
                      </div>
                    </div>

                    {/* Agent Avatars */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center -space-x-2">
                        {thread.agents.map((agent, idx) => (
                          <Avatar
                            key={idx}
                            name={agent.name}
                            size="sm"
                            className="border-2 border-white"
                          />
                        ))}
                        <div className="ml-6 text-xs text-neutral-500">
                          {thread.agents.length} agent{thread.agents.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Live Agent Activity */}
        <div className="xl:col-span-1">
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-neutral-900">
                Live Agent Activity
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span className="text-xs text-neutral-500">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              {liveAgentActivity.map((activity: LiveAgentActivity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0">
                    <Avatar
                      name={activity.agentName}
                      size="sm"
                      className="mt-0.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-neutral-900">
                          {activity.agentName}
                        </span>
                        <Badge variant="neutral" size="sm" className="text-xs">
                          {activity.agentRole}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {getActivityStatusIcon(activity.status)}
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">{activity.action}</span>{' '}
                      <span className="text-neutral-400">•</span>{' '}
                      <span className="text-neutral-700">{activity.target}</span>
                    </p>
                    <span className="text-xs text-neutral-400">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
