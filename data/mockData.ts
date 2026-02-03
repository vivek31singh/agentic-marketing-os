// Core Data Interfaces

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
  meta?: Record<string, any>;
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
  title: string;
  status: string;
  objective: string;
  events: Event[];
  conflicts?: Conflict[];
}

export interface Module {
  id: string;
  name: string;
  description: string;
  activeThreadsCount: number;
}

export interface Workspace {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  health: number;
  modules?: Module[];
}

// Mock Agents
export const mockAgents: Record<string, Agent> = {
  tech_lead: {
    id: 'agent-tech-lead',
    name: 'Tech_Lead',
    role: 'Technical Architect',
    avatar: '👨‍💻',
    metrics: { accuracy: 98, latency: 120 },
  },
  seo_specialist: {
    id: 'agent-seo',
    name: 'SEO_Specialist',
    role: 'Search Optimization',
    avatar: '🔍',
    metrics: { accuracy: 95, latency: 180 },
  },
  content_strategist: {
    id: 'agent-content',
    name: 'Content_Strategist',
    role: 'Content Planning',
    avatar: '✍️',
    metrics: { accuracy: 92, latency: 150 },
  },
  crawl_spider: {
    id: 'agent-crawl',
    name: 'Crawl_Spider',
    role: 'Web Crawler',
    avatar: '🕷️',
    metrics: { accuracy: 99, latency: 80 },
  },
  social_manager: {
    id: 'agent-social',
    name: 'Social_Manager',
    role: 'Social Media',
    avatar: '📱',
    metrics: { accuracy: 94, latency: 140 },
  },
  launch_coordinator: {
    id: 'agent-launch',
    name: 'Launch_Coordinator',
    role: 'Product Launch',
    avatar: '🚀',
    metrics: { accuracy: 96, latency: 130 },
  },
};

// Mock Workspaces
export const workspaces = {
  workspaces: [
    {
      id: 'techstart',
      name: 'TechStart',
      status: 'active' as const,
      health: 92,
      modules: [
        {
          id: 'SEO_Cluster',
          name: 'SEO Cluster',
          description: 'Search engine optimization',
          activeThreadsCount: 8,
        },
        {
          id: 'Content_Factory',
          name: 'Content Factory',
          description: 'Content creation pipeline',
          activeThreadsCount: 12,
        },
        {
          id: 'Social_Growth',
          name: 'Social Growth',
          description: 'Social media amplification',
          activeThreadsCount: 5,
        },
        {
          id: 'SaaS_Launch_Ops',
          name: 'SaaS Launch Ops',
          description: 'Product launch operations',
          activeThreadsCount: 6,
        },
      ] as Module[],
    },
    {
      id: 'doddle',
      name: 'Doddle',
      status: 'active' as const,
      health: 88,
      modules: [
        {
          id: 'SEO_Cluster',
          name: 'SEO Cluster',
          description: 'Search engine optimization',
          activeThreadsCount: 5,
        },
        {
          id: 'Content_Factory',
          name: 'Content Factory',
          description: 'Content creation pipeline',
          activeThreadsCount: 9,
        },
      ] as Module[],
    },
  ],
};

export default workspaces;