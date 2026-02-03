import { getWorkspaces } from '@/lib/apiMock';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'lucide-react';
import LinkNext from 'next/link';

export default async function RootPage() {
  const workspaces = await getWorkspaces();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-neutral-900">
            Agentic Marketing OS
          </h1>
          <p className="text-lg text-neutral-600">
            Select a workspace to continue
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workspaces.map((workspace) => (
            <LinkNext
              key={workspace.id}
              href={`/workspaces/${workspace.id}`}
            >
              <Card className="hover:shadow-lg hover:border-primary-400 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl">{workspace.name}</CardTitle>
                    <Badge
                      variant={workspace.status === 'active' ? 'success' : 'warning'}
                      withDot
                    >
                      {workspace.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-500">Workspace ID</p>
                    <p className="font-mono text-sm bg-neutral-100 px-2 py-1 rounded inline-block">
                      {workspace.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">System Health</p>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          workspace.health > 80
                            ? 'bg-success-500'
                            : workspace.health > 50
                            ? 'bg-warning-500'
                            : 'bg-error-500'
                        }`}
                        style={{ width: `${workspace.health}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">{workspace.health}%</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Link className="w-4 h-4 mr-2" />
                    Enter Workspace
                  </Button>
                </CardContent>
              </Card>
            </LinkNext>
          ))}
        </div>
      </div>
    </div>
  );
}