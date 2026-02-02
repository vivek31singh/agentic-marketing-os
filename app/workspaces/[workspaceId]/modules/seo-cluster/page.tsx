import { Card } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { 
  mockSEOMetrics, 
  mockSEOThreads, 
  mockSEOAlerts,
  seoClusterModuleInfo,
  type SEOThread 
} from '@/data/seoCluster';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown,
  MoreHorizontal,
  Search,
  Filter
} from 'lucide-react';
import Link from 'next/link';

const getStatusIcon = (status: SEOThread['status']) => {
  switch (status) {
    case 'active':
      return <Activity className="h-4 w-4 text-primary" />;
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-warning" />;
    case 'blocked':
      return <AlertCircle className="h-4 w-4 text-danger" />;
    default:
      return <Clock className="h-4 w-4 text-neutral" />;
  }
};

const getPriorityColor = (priority: SEOThread['priority']) => {
  switch (priority) {
    case 'critical':
      return 'bg-danger/10 text-danger border-danger/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'low':
      return 'bg-neutral/10 text-neutral border-neutral/20';
    default:
      return 'bg-neutral/10 text-neutral border-neutral/20';
  }
};

const getMetricStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'text-success';
    case 'warning':
      return 'text-warning';
    case 'critical':
      return 'text-danger';
    default:
      return 'text-neutral';
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <AlertCircle className="h-4 w-4 text-danger" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'info':
      return <Activity className="h-4 w-4 text-primary" />;
    default:
      return <Activity className="h-4 w-4 text-neutral" />;
  }
};

export default function SEOClusterPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">SEO Cluster</h1>
          <p className="text-sm text-neutral-500 mt-1">Technical SEO operations and performance monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1.5">
            <Activity className="h-3 w-3" />
            {seoClusterModuleInfo.activeThreadsCount} Active Threads
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-success" />
            Health: {seoClusterModuleInfo.healthScore}%
          </Badge>
          <Button variant="default" size="sm">
            + New Task
          </Button>
        </div>
      </div>

      {/* SEO Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSEOMetrics.map((metric) => (
          <Card key={metric.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-neutral-500">{metric.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className={`text-2xl font-semibold ${getMetricStatusColor(metric.status)}`}>
                    {metric.value}
                  </p>
                  {metric.change && (
                    <div className={`flex items-center gap-0.5 text-xs ${
                      metric.trend === 'up' ? 'text-success' : 
                      metric.trend === 'down' ? 'text-danger' : 'text-neutral'
                    }`}>
                      {metric.trend === 'up' && <ArrowUp className="h-3 w-3" />}
                      {metric.trend === 'down' && <ArrowDown className="h-3 w-3" />}
                      {metric.change}
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4 text-neutral-400" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Threads Section - Spans 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-neutral-900">Active Threads</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {mockSEOThreads.filter(thread => thread.status !== 'completed').map((thread) => (
              <Link 
                key={thread.id} 
                href={`/workspaces/techstart/modules/seo-cluster/${thread.id}`}
              >
                <Card className="p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {getStatusIcon(thread.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-neutral-900">{thread.title}</h3>
                            <Badge variant="outline" className={getPriorityColor(thread.priority)}>
                              {thread.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                            {thread.objective}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {thread.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Avatar size="xs" />
                          <span>{thread.agent}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Clock className="h-3 w-3" />
                          <span>{thread.lastUpdated}</span>
                        </div>
                        <div className="flex-1" />
                        <div className="text-xs text-neutral-500">{thread.progress}%</div>
                      </div>
                      <ProgressBar value={thread.progress} className="mt-2" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Alerts & Quick Actions Section */}
        <div className="space-y-4">
          {/* Alerts Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-neutral-900">Recent Alerts</h3>
              <Badge variant="outline">{mockSEOAlerts.length}</Badge>
            </div>
            <div className="space-y-3">
              {mockSEOAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700 line-clamp-2">{alert.message}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Alerts
            </Button>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-4">
            <h3 className="font-medium text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Search className="h-4 w-4" />
                Run Site Audit
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Activity className="h-4 w-4" />
                Check Crawl Status
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Submit Sitemap
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <AlertTriangle className="h-4 w-4" />
                Review 404 Errors
              </Button>
            </div>
          </Card>

          {/* Completed Threads Summary */}
          <Card className="p-4">
            <h3 className="font-medium text-neutral-900 mb-4">Completed Today</h3>
            <div className="space-y-3">
              {mockSEOThreads.filter(thread => thread.status === 'completed').map((thread) => (
                <div key={thread.id} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700 truncate">{thread.title}</p>
                    <p className="text-xs text-neutral-400">{thread.lastUpdated}</p>
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