// Core Interfaces
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    accuracy: number;
    latency: number;
  };
}

export interface Event {
  type: 'message' | 'conflict' | 'system';
  timestamp: string;
  agent: Agent;
  content: string;
  logicChain?: string[];
  meta?: Record<string, unknown>;
}

export interface Option {
  agent: Agent;
  description: string;
  label: string;
  outcome: string;
}

export interface Conflict {
  id: string;
  reason: string;
  options: Option[];
}

export interface Thread {
  id: string;
  slug: string;
  title: string;
  status: string;
  objective: string;
  events: Event[];
  conflict?: Conflict;
  meta?: Record<string, unknown>;
}

export interface Workspace {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  health: number;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  activeThreadsCount: number;
}

export interface Metric {
  id: string;
  label: string;
  value: number;
  trend: string;
  status: 'success' | 'warning' | 'error' | 'default';
}

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Tech_Lead',
    role: 'Technical Architect',
    avatar: 'TL',
    metrics: { accuracy: 98, latency: 120 },
  },
  {
    id: 'agent-2',
    name: 'Crawl_Spider',
    role: 'SEO Specialist',
    avatar: 'CS',
    metrics: { accuracy: 95, latency: 200 },
  },
  {
    id: 'agent-3',
    name: 'Content_Strategist',
    role: 'Content Lead',
    avatar: 'CT',
    metrics: { accuracy: 92, latency: 150 },
  },
  {
    id: 'agent-4',
    name: 'Social_Manager',
    role: 'Social Media Specialist',
    avatar: 'SM',
    metrics: { accuracy: 88, latency: 180 },
  },
];

// Mock Workspace
export const mockWorkspace: Workspace = {
  id: 'workspace-1',
  name: 'TechStart',
  status: 'active',
  health: 94,
};

// Mock Workspaces (used by root page)
export const workspaces: Workspace[] = [
  {
    id: 'workspace-1',
    name: 'TechStart',
    status: 'active',
    health: 94,
  },
  {
    id: 'workspace-2',
    name: 'GrowthLabs',
    status: 'active',
    health: 87,
  },
  {
    id: 'workspace-3',
    name: 'ContentStudio',
    status: 'idle',
    health: 72,
  },
];

// Mock Modules
export const mockModules: Module[] = [
  {
    id: 'module-1',
    name: 'SEO_Cluster',
    description: 'Search engine optimization and technical health monitoring',
    activeThreadsCount: 12,
  },
  {
    id: 'module-2',
    name: 'Content_Factory',
    description: 'Content creation and publishing workflows',
    activeThreadsCount: 8,
  },
  {
    id: 'module-3',
    name: 'Social_Growth',
    description: 'Social media management and trend analysis',
    activeThreadsCount: 5,
  },
  {
    id: 'module-4',
    name: 'SaaS_Launch_Ops',
    description: 'Launch coordination and asset management',
    activeThreadsCount: 3,
  },
];

// Extended Workspace interface for dashboard
export interface WorkspaceWithModules {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  health: number;
  modules: Array<Module & { active: boolean }>;
}

// Mock workspaces with modules for the dashboard
export const mockWorkspacesWithModules: WorkspaceWithModules[] = [
  {
    id: 'workspace-1',
    name: 'TechStart',
    status: 'active',
    health: 94,
    modules: [
      { id: 'module-1', name: 'SEO_Cluster', description: 'Search engine optimization and technical health monitoring', activeThreadsCount: 12, active: true },
      { id: 'module-2', name: 'Content_Factory', description: 'Content creation and publishing workflows', activeThreadsCount: 8, active: true },
      { id: 'module-3', name: 'Social_Growth', description: 'Social media management and trend analysis', activeThreadsCount: 5, active: true },
      { id: 'module-4', name: 'SaaS_Launch_Ops', description: 'Launch coordination and asset management', activeThreadsCount: 3, active: false },
    ],
  },
  {
    id: 'workspace-2',
    name: 'GrowthLabs',
    status: 'active',
    health: 87,
    modules: [
      { id: 'module-1', name: 'SEO_Cluster', description: 'Search engine optimization and technical health monitoring', activeThreadsCount: 6, active: true },
      { id: 'module-2', name: 'Content_Factory', description: 'Content creation and publishing workflows', activeThreadsCount: 4, active: true },
    ],
  },
  {
    id: 'workspace-3',
    name: 'ContentStudio',
    status: 'idle',
    health: 72,
    modules: [
      { id: 'module-2', name: 'Content_Factory', description: 'Content creation and publishing workflows', activeThreadsCount: 0, active: false },
    ],
  },
];

// Export mockData object for backwards compatibility
export const mockData = {
  workspaces: mockWorkspacesWithModules,
  agents: mockAgents,
  modules: mockModules,
  workspace: mockWorkspace,
};
