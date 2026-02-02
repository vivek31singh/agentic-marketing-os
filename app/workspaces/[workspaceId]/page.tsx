import { 
  Activity, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { MetricStat } from '@/components/ui/MetricStat';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Avatar } from '@/components/ui/Avatar';
import { Tag } from '@/components/ui/Tag';

// Mock data for Mission Control dashboard
const metrics = [
  { 
    label: 'Total Threads', 
    value: '247', 
    change: 12, 
    icon: Activity, 
    iconColor: 'text-primary-500' 
  },
  { 
    label: 'Active Agents', 
    value: '18', 
    change: 3, 
    icon: Users, 
    iconColor: 'text-success-500' 
  },
  { 
    label: 'Tasks Completed', 
    value: '1,842', 
    change: 24, 
    icon: CheckCircle, 
    iconColor: 'text-info-500' 
  },
  { 
    label: 'Avg Response Time', 
    value: '2.3s', 
    change: -15, 
    icon: Clock, 
    iconColor: 'text-warning-500' 
  },
];

const recentThreads = [
  {
    id: 1,
    title: 'SEO Keyword Research - Q1 Campaign',
    module: 'SEO Cluster',
    status: 'active',
    priority: 'high',
    progress: 75,
    agents: ['SL', 'CW'],
    lastActivity: '2 min ago',
  },
  {
    id: 2,
    title: 'Blog Post: 10 Growth Hacking Strategies',
    module: 'Content Factory',
    status: 'review',
    priority: 'medium',
    progress: 90,
    agents: ['CW'],
    lastActivity: '15 min ago',
  },
  {
    id: 3,
    title: 'Social Media Calendar - February',
    module: 'Social Growth',
    status: 'pending',
    priority: 'low',
    progress: 30,
    agents: ['SM', 'CW'],
    lastActivity: '1 hour ago',
  },
  {
    id: 4,
    title: 'Landing Page Optimization',
    module: 'SEO Cluster',
    status: 'active',
    priority: 'high',
    progress: 45,
    agents: ['SL', 'SM'],
    lastActivity: '3 hours ago',
  },
];

const activeWorkflows = [
  {
    id: 1,
    name: 'Content Production Pipeline',
    status: 'running',
    tasks: { completed: 23, total: 28 },
    eta: '45 min',
  },
  {
    id: 2,
    name: 'SEO Audit & Analysis',
    status: 'running',
    tasks: { completed: 156, total: 200 },
    eta: '2.3 hrs',
  },
  {
    id: 3,
    name: 'Social Post Scheduling',
    status: 'queued',
    tasks: { completed: 0, total: 45 },
    eta: 'Pending',
  },
];

const systemAlerts = [
  {
    id: 1,
    type: 'error',
    title: 'Agent Timeout',
    message: 'Content_Writer failed to respond within timeout threshold',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Resource Usage',
    message: 'Memory usage at 85% capacity',
    time: '12 min ago',
  },
  {
    id: 3,
    type: 'info',
    title: 'Workflow Completed',
    message: 'Keyword research pipeline finished successfully',
    time: '1 hour ago',
  },
];

export default function MissionControlPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Mission Control</h1>
        <p className="text-neutral-500 mt-1">Overview of workspace performance and active operations</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricStat key={metric.label} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Threads - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Threads</h2>
            <Button variant="outline" size="sm">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {recentThreads.map((thread) => (
              <Card key={thread.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-neutral-900 truncate">{thread.title}</h3>
                        <Badge
                          variant={thread.priority === 'high' ? 'error' : thread.priority === 'medium' ? 'warning' : 'info'}
                          size="sm"
                        >
                          {thread.priority}
                        </Badge>
                        <Badge
                          variant={thread.status === 'active' ? 'success' : thread.status === 'review' ? 'warning' : 'ghost'}
                          size="sm"
                        >
                          {thread.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span>{thread.module}</span>
                        <span>•</span>
                        <span>{thread.lastActivity}</span>
                      </div>
                      <div className="mt-3">
                        <ProgressBar 
                          value={thread.progress} 
                          size="sm" 
                          variant="primary"
                          showLabel={false}
                        />
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      {thread.agents.map((agent) => (
                        <Avatar 
                          key={agent} 
                          initials={agent} 
                          size="sm"
                          className="border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Workflows & Alerts */}
        <div className="space-y-6">
          {/* Active Workflows */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Active Workflows</CardTitle>
              <CardDescription>Running and queued automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeWorkflows.map((workflow) => (
                <div key={workflow.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {workflow.status === 'running' && (
                        <Zap className="h-4 w-4 text-primary-500" />
                      )}
                      <span className="text-sm font-medium text-neutral-900">{workflow.name}</span>
                    </div>
                    <Tag
                      variant={workflow.status === 'running' ? 'success' : 'ghost'}
                      size="sm"
                    >
                      {workflow.status}
                    </Tag>
                  </div>
                  <ProgressBar 
                    value={workflow.tasks.completed} 
                    max={workflow.tasks.total} 
                    size="sm"
                    showLabel={true}
                  />
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{workflow.tasks.completed}/{workflow.tasks.total} tasks</span>
                    <span>ETA: {workflow.eta}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Alerts</CardTitle>
              <CardDescription>Recent notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion collapsible defaultValue="alert-1">
                {systemAlerts.map((alert) => (
                  <AccordionItem key={alert.id} value={`alert-${alert.id}`}>
                    <AccordionTrigger className="py-3">
                      <div className="flex items-center gap-2">
                        {alert.type === 'error' && (
                          <AlertCircle className="h-4 w-4 text-error-500" />
                        )}
                        {alert.type === 'warning' && (
                          <Activity className="h-4 w-4 text-warning-500" />
                        )}
                        {alert.type === 'info' && (
                          <CheckCircle className="h-4 w-4 text-info-500" />
                        )}
                        <span className="text-sm font-medium text-neutral-900">{alert.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-600 mb-2">{alert.message}</p>
                      <span className="text-xs text-neutral-400">{alert.time}</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                New Thread
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add Agent
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
