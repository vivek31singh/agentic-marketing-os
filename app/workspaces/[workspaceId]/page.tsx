import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';
import { getWorkspace, getWorkspaces } from '@/lib/apiMock';
import { Activity, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WorkspacePageProps {
  params: {
    workspaceId: string;
  };
}

async function WorkspaceContent({ workspaceId }: { workspaceId: string }) {
  const workspace = await getWorkspace(workspaceId);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{workspace.name}</h1>
          <p className="text-neutral-600 mt-1">
            Workspace ID: {workspace.id}
          </p>
        </div>
        <Badge 
          variant={workspace.status === 'active' ? 'success' : 'warning'}
          withDot
        >
          {workspace.status}
        </Badge>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricStat
          label="System Health"
          value={`${workspace.health}%`}
          trend={{ value: '+2%', positive: true }}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricStat
          label="Active Threads"
          value="12"
          trend={{ value: '+4', positive: true }}
          icon={<Zap className="w-5 h-5" />}
        />
        <MetricStat
          label="Active Agents"
          value="8"
          trend={{ value: 'stable', positive: true }}
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Available Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Available Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href={`/workspaces/${workspaceId}/mission-control`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">Mission Control</div>
                  <div className="text-sm text-neutral-600 mt-1">Dashboard & Operations</div>
                  <div className="mt-3">
                    <Badge variant="secondary" size="sm">Live</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/workspaces/${workspaceId}/modules/seo-cluster`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">SEO Cluster</div>
                  <div className="text-sm text-neutral-600 mt-1">Technical SEO & Crawl</div>
                  <div className="mt-3">
                    <Badge variant="outline" size="sm">3 Threads</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/workspaces/${workspaceId}/modules/content-factory`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">Content Factory</div>
                  <div className="text-sm text-neutral-600 mt-1">Content Strategy</div>
                  <div className="mt-3">
                    <Badge variant="outline" size="sm">4 Threads</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/workspaces/${workspaceId}/modules/social-growth`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">Social Growth</div>
                  <div className="text-sm text-neutral-600 mt-1">Viral & Trends</div>
                  <div className="mt-3">
                    <Badge variant="outline" size="sm">3 Threads</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/workspaces/${workspaceId}/modules/saas-launch-ops`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">SaaS Launch Ops</div>
                  <div className="text-sm text-neutral-600 mt-1">Launch Readiness</div>
                  <div className="mt-3">
                    <Badge variant="outline" size="sm">3 Threads</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/workspaces/${workspaceId}/settings`}>
              <Card className="hover:border-primary-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="font-semibold">Settings</div>
                  <div className="text-sm text-neutral-600 mt-1">Config & Integrations</div>
                  <div className="mt-3">
                    <Badge variant="ghost" size="sm">Manage</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href={`/workspaces/${workspaceId}/mission-control`}>
              <Button variant="outline" className="w-full justify-between">
                <span>Go to Mission Control</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-between" disabled>
              <span>Create New Thread</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  return (
    <Suspense fallback={<div>Loading workspace...</div>}>
      <WorkspaceContent workspaceId={params.workspaceId} />
    </Suspense>
  );
}