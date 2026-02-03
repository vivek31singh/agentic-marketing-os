import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getWorkspaces } from '@/lib/apiMock';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default async function RootPage() {
  const workspaces = await getWorkspaces();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Agentic Marketing OS</h1>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              System Online
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Workspaces</h2>
          <p className="text-muted-foreground">Select a workspace to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <Link key={workspace.id} href={`/workspaces/${workspace.id}`}>
              <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{workspace.name}</h3>
                    <div className="flex items-center gap-2">
                      {workspace.status === 'active' && (
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {workspace.status === 'idle' && (
                        <Badge variant="warning" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Idle
                        </Badge>
                      )}
                      {workspace.status === 'error' && (
                        <Badge variant="error" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">System Health</span>
                      <span className="font-medium">{workspace.health}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-colors ${
                          workspace.health >= 80 ? 'bg-success' :
                          workspace.health >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${workspace.health}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Modules</span>
                    <span className="font-medium">{workspace.modules?.length || 0}</span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  Open Workspace
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}