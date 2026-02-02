'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Share2, 
  Rocket, 
  Settings,
  Bell,
  ChevronDown,
  Activity,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Card, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

// Mock data - would come from API
const mockWorkspace = {
  id: 'techstart',
  name: 'TechStart',
  status: 'active',
  health: 87,
};

const modules = [
  { id: 'mission-control', name: 'Mission Control', icon: LayoutDashboard, activeThreads: 12 },
  { id: 'seo-cluster', name: 'SEO Cluster', icon: Search, activeThreads: 8 },
  { id: 'content-factory', name: 'Content Factory', icon: FileText, activeThreads: 24 },
  { id: 'social-growth', name: 'Social Growth', icon: Share2, activeThreads: 5 },
  { id: 'saas-launch', name: 'SaaS Launch Ops', icon: Rocket, activeThreads: 3 },
];

const activeAgents = [
  { id: 'seo-lead', name: 'SEO_Lead', status: 'active', avatar: 'SL' },
  { id: 'content-writer', name: 'Content_Writer', status: 'active', avatar: 'CW' },
  { id: 'social-manager', name: 'Social_Manager', status: 'idle', avatar: 'SM' },
];

const systemAlerts = [
  { id: 1, type: 'warning', message: 'Content pipeline at 85% capacity' },
  { id: 2, type: 'info', message: 'SEO crawl completed successfully' },
  { id: 3, type: 'error', message: 'Agent timeout: Content_Writer' },
];

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const [activeModule, setActiveModule] = useState('mission-control');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightRailOpen, setRightRailOpen] = useState(true);

  const NavItem = ({ 
    id, 
    name, 
    icon: Icon, 
    activeThreads, 
    isActive 
  }: { 
    id: string; 
    name: string; 
    icon: any; 
    activeThreads: number;
    isActive: boolean;
  }) => (
    <button
      onClick={() => setActiveModule(id)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
        isActive 
          ? 'bg-primary-500/10 text-primary-600' 
          : 'text-neutral-600 hover:bg-neutral-100'
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1 text-left truncate">{name}</span>
      {activeThreads > 0 && (
        <Badge variant={isActive ? 'primary' : 'ghost'} size="sm">
          {activeThreads}
        </Badge>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Left Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r border-neutral-200 bg-white transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        {/* Workspace Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
              T
            </div>
            <div>
              <h1 className="font-semibold text-neutral-900">{mockWorkspace.name}</h1>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success-500" />
                <span className="text-xs text-neutral-500">{mockWorkspace.status}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {modules.map((module) => (
            <NavItem
              key={module.id}
              {...module}
              isActive={activeModule === module.id}
            />
          ))}
        </nav>

        {/* Workspace Settings */}
        <div className="p-3 border-t border-neutral-200">
          <NavItem
            id="settings"
            name="Settings"
            icon={Settings}
            activeThreads={0}
            isActive={activeModule === 'settings'}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-500">/</span>
              <span className="text-sm font-medium text-neutral-700">{mockWorkspace.name}</span>
              <span className="text-sm text-neutral-400">/</span>
              <span className="text-sm font-medium text-neutral-900">
                {modules.find((m) => m.id === activeModule)?.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar initials="AD" size="sm" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Right Rail */}
      <aside
        className={cn(
          'flex flex-col border-l border-neutral-200 bg-white transition-all duration-300 overflow-hidden',
          rightRailOpen ? 'w-80' : 'w-0'
        )}
      >
        {/* System Health Card */}
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-900">System Health</h3>
            <Badge variant="success" size="sm">{mockWorkspace.health}%</Badge>
          </div>
          <ProgressBar value={mockWorkspace.health} size="sm" />
        </div>

        {/* Active Agents */}
        <div className="p-4 border-b border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Active Agents</h3>
          <div className="space-y-2">
            {activeAgents.map((agent) => (
              <div key={agent.id} className="flex items-center gap-3">
                <Avatar initials={agent.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{agent.name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      agent.status === 'active' ? 'bg-success-500' : 'bg-neutral-300'
                    )} />
                    <span className="text-xs text-neutral-500">{agent.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {systemAlerts.map((alert) => (
              <Card key={alert.id} variant="ghost" className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-start gap-2">
                    {alert.type === 'warning' && (
                      <Activity className="h-4 w-4 text-warning-500 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === 'error' && (
                      <Zap className="h-4 w-4 text-error-500 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === 'info' && (
                      <Clock className="h-4 w-4 text-info-500 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-xs text-neutral-600">{alert.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="p-2 border-t border-neutral-200 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightRailOpen(false)}
          >
            <ChevronDown className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      </aside>

      {/* Right Rail Collapsed Toggle */}
      {!rightRailOpen && (
        <button
          onClick={() => setRightRailOpen(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-l-lg p-2 shadow-lg hover:bg-neutral-50"
        >
          <ChevronDown className="h-4 w-4 rotate-180" />
        </button>
      )}
    </div>
  );
}
