// TypeScript Interfaces for Agentic Marketing OS

export type EventType = 'message' | 'conflict' | 'system';
export type ThreadStatus = 'active' | 'pending' | 'completed' | 'blocked';
export type WorkspaceStatus = 'active' | 'inactive' | 'maintenance';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    accuracy: number;
    latency: number;
    tasksCompleted: number;
  };
  status: 'online' | 'busy' | 'offline';
}

export interface LogicChain {
  step: number;
  reasoning: string;
  confidence: number;
}

export interface Option {
  agent: string;
  description: string;
  label: string;
  outcome: string;
}

export interface Conflict {
  id: string;
  reason: string;
  options: Option[];
  resolved: boolean;
  timestamp: string;
}

export interface Event {
  id: string;
  type: EventType;
  timestamp: string;
  agent?: Agent;
  content: string;
  logicChain?: LogicChain[];
  meta?: Record<string, any>;
  conflict?: Conflict;
}

export interface Thread {
  id: string;
  title: string;
  status: ThreadStatus;
  objective: string;
  events: Event[];
  activeConflict?: Conflict;
  priority: 'high' | 'medium' | 'low';
  updatedAt: string;
}

export interface Module {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  activeThreadsCount: number;
  status: 'active' | 'paused' | 'error';
  threads: Thread[];
}

export interface Workspace {
  id: string;
  name: string;
  status: WorkspaceStatus;
  health: 'optimal' | 'warning' | 'critical';
  modules: Module[];
  createdAt: string;
}

// Mock Data

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Tech_Lead',
    role: 'Technical Architect',
    avatar: '🤖',
    metrics: { accuracy: 98, latency: 120, tasksCompleted: 1247 },
    status: 'online',
  },
  {
    id: 'agent-2',
    name: 'Crawl_Spider',
    role: 'SEO Specialist',
    avatar: '🕷️',
    metrics: { accuracy: 95, latency: 89, tasksCompleted: 892 },
    status: 'online',
  },
  {
    id: 'agent-3',
    name: 'Content_Creator',
    role: 'Content Strategist',
    avatar: '✍️',
    metrics: { accuracy: 92, latency: 156, tasksCompleted: 634 },
    status: 'busy',
  },
  {
    id: 'agent-4',
    name: 'Social_Manager',
    role: 'Social Media Expert',
    avatar: '📱',
    metrics: { accuracy: 89, latency: 200, tasksCompleted: 456 },
    status: 'online',
  },
  {
    id: 'agent-5',
    name: 'QA_Bot',
    role: 'Quality Assurance',
    avatar: '✅',
    metrics: { accuracy: 99, latency: 75, tasksCompleted: 2103 },
    status: 'online',
  },
  {
    id: 'agent-6',
    name: 'Analytics_Guru',
    role: 'Data Analyst',
    avatar: '📊',
    metrics: { accuracy: 97, latency: 110, tasksCompleted: 789 },
    status: 'offline',
  },
];

const mockConflict1: Conflict = {
  id: 'conflict-1',
  reason: 'Disagreement on keyword strategy for Q1 campaign',
  options: [
    {
      agent: 'Tech_Lead',
      description: 'Focus on long-tail keywords with lower competition',
      label: 'Long-tail Strategy',
      outcome: 'Higher conversion rates, lower initial traffic',
    },
    {
      agent: 'Crawl_Spider',
      description: 'Target high-volume competitive keywords',
      label: 'Aggressive Strategy',
      outcome: 'Higher potential traffic, longer ranking time',
    },
  ],
  resolved: false,
  timestamp: '2024-01-15T10:30:00Z',
};

const mockConflict2: Conflict = {
  id: 'conflict-2',
  reason: 'Content calendar scheduling conflict',
  options: [
    {
      agent: 'Content_Creator',
      description: 'Delay product launch content by 2 days',
      label: 'Delay Launch Content',
      outcome: 'Better content quality, slightly delayed launch',
    },
    {
      agent: 'Social_Manager',
      description: 'Compress review cycle to meet deadline',
      label: 'Accelerate Review',
      outcome: 'Meet deadline, potential quality trade-off',
    },
  ],
  resolved: false,
  timestamp: '2024-01-15T14:22:00Z',
};

const mockEventsSEO: Event[] = [
  {
    id: 'event-1',
    type: 'system',
    timestamp: '2024-01-15T08:00:00Z',
    content: 'Thread initialized: Technical health assessment',
    meta: { source: 'System' },
  },
  {
    id: 'event-2',
    type: 'message',
    timestamp: '2024-01-15T08:05:00Z',
    agent: mockAgents[1], // Crawl_Spider
    content: 'Initiating crawl of techstart.io domain structure...',
    logicChain: [
      { step: 1, reasoning: 'Parse robots.txt for crawl directives', confidence: 0.98 },
      { step: 2, reasoning: 'Identify sitemap location', confidence: 0.95 },
      { step: 3, reasoning: 'Queue URLs for crawling', confidence: 0.99 },
    ],
  },
  {
    id: 'event-3',
    type: 'message',
    timestamp: '2024-01-15T08:15:00Z',
    agent: mockAgents[1], // Crawl_Spider
    content: 'Discovered 234 pages. 12 critical issues found: missing meta descriptions on product pages.',
  },
  {
    id: 'event-4',
    type: 'conflict',
    timestamp: '2024-01-15T08:30:00Z',
    agent: mockAgents[1], // Crawl_Spider
    content: 'Encountered blocking issue: Disagreement on keyword strategy for Q1 campaign',
    conflict: mockConflict1,
  },
];

const mockEventsContent: Event[] = [
  {
    id: 'event-5',
    type: 'system',
    timestamp: '2024-01-15T09:00:00Z',
    content: 'Thread initialized: Q1 blog strategy planning',
    meta: { source: 'System' },
  },
  {
    id: 'event-6',
    type: 'message',
    timestamp: '2024-01-15T09:10:00Z',
    agent: mockAgents[2], // Content_Creator
    content: 'Drafting content calendar for Q1. Proposed 24 blog posts covering SaaS trends, automation, and AI integration.',
    logicChain: [
      { step: 1, reasoning: 'Analyze competitor content gaps', confidence: 0.92 },
      { step: 2, reasoning: 'Identify high-value topics for target audience', confidence: 0.88 },
      { step: 3, reasoning: 'Map topics to funnel stages', confidence: 0.95 },
    ],
  },
  {
    id: 'event-7',
    type: 'message',
    timestamp: '2024-01-15T09:25:00Z',
    agent: mockAgents[3], // Social_Manager
    content: 'Social media calendar requires content for product launch on Feb 15. Current schedule conflicts with blog publication.',
  },
  {
    id: 'event-8',
    type: 'conflict',
    timestamp: '2024-01-15T09:35:00Z',
    agent: mockAgents[2], // Content_Creator
    content: 'Workflow intervention required: Content calendar scheduling conflict',
    conflict: mockConflict2,
  },
];

const mockEventsSocial: Event[] = [
  {
    id: 'event-9',
    type: 'system',
    timestamp: '2024-01-15T10:00:00Z',
    content: 'Thread initialized: Viral content trend analysis',
    meta: { source: 'System' },
  },
  {
    id: 'event-10',
    type: 'message',
    timestamp: '2024-01-15T10:12:00Z',
    agent: mockAgents[3], // Social_Manager
    content: 'Monitoring trending topics: AI agents in marketing (+340%), workflow automation (+215%), low-code platforms (+180%)',
  },
  {
    id: 'event-11',
    type: 'message',
    timestamp: '2024-01-15T10:45:00Z',
    agent: mockAgents[3], // Social_Manager
    content: 'Recommended pivot: Create LinkedIn carousel on "5 Ways AI Agents Transform Marketing Operations"',
    logicChain: [
      { step: 1, reasoning: 'Match trending topic with brand expertise', confidence: 0.94 },
      { step: 2, reasoning: 'Select optimal format (carousel)', confidence: 0.89 },
      { step: 3, reasoning: 'Target decision-maker persona', confidence: 0.91 },
    ],
  },
];

const mockThreadsSEO: Thread[] = [
  {
    id: 'thread-seo-1',
    title: 'Technical Health Assessment',
    status: 'active',
    objective: 'Comprehensive technical SEO audit and fix implementation',
    events: mockEventsSEO,
    activeConflict: mockConflict1,
    priority: 'high',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'thread-seo-2',
    title: 'Crawl Log Analysis',
    status: 'pending',
    objective: 'Analyze crawl logs to identify indexing issues',
    events: [
      {
        id: 'event-seo-2-1',
        type: 'system',
        timestamp: '2024-01-14T16:00:00Z',
        content: 'Thread queued for processing',
      },
    ],
    priority: 'medium',
    updatedAt: '2024-01-14T16:00:00Z',
  },
  {
    id: 'thread-seo-3',
    title: 'Backlink Profile Audit',
    status: 'completed',
    objective: 'Review and disavow toxic backlinks',
    events: [
      {
        id: 'event-seo-3-1',
        type: 'system',
        timestamp: '2024-01-13T09:00:00Z',
        content: 'Audit completed: 2,347 backlinks analyzed, 12 toxic links identified for disavowal',
      },
    ],
    priority: 'low',
    updatedAt: '2024-01-13T14:30:00Z',
  },
];

const mockThreadsContent: Thread[] = [
  {
    id: 'thread-content-1',
    title: 'Q1 Blog Strategy',
    status: 'blocked',
    objective: 'Develop and execute Q1 content calendar for blog',
    events: mockEventsContent,
    activeConflict: mockConflict2,
    priority: 'high',
    updatedAt: '2024-01-15T09:35:00Z',
  },
  {
    id: 'thread-content-2',
    title: 'Case Study: Enterprise Client',
    status: 'active',
    objective: 'Create comprehensive case study for Fortune 500 client',
    events: [
      {
        id: 'event-content-2-1',
        type: 'system',
        timestamp: '2024-01-15T11:00:00Z',
        content: 'Drafting in progress - Section 1: Challenge',
      },
      {
        id: 'event-content-2-2',
        type: 'message',
        timestamp: '2024-01-15T11:15:00Z',
        agent: mockAgents[2], // Content_Creator
        content: 'Interview notes transcribed. Key metrics: 340% increase in efficiency, $2.1M cost savings.',
      },
    ],
    priority: 'medium',
    updatedAt: '2024-01-15T11:15:00Z',
  },
];

const mockThreadsSocial: Thread[] = [
  {
    id: 'thread-social-1',
    title: 'Viral Lab Experiment #12',
    status: 'active',
    objective: 'Test viral content formats and distribution strategies',
    events: mockEventsSocial,
    priority: 'high',
    updatedAt: '2024-01-15T10:45:00Z',
  },
  {
    id: 'thread-social-2',
    title: 'Trend Alert Monitoring',
    status: 'active',
    objective: 'Real-time monitoring of industry trends for content opportunities',
    events: [
      {
        id: 'event-social-2-1',
        type: 'system',
        timestamp: '2024-01-15T12:00:00Z',
        content: 'Monitoring active - 47 trend sources being tracked',
      },
    ],
    priority: 'medium',
    updatedAt: '2024-01-15T12:00:00Z',
  },
];

const mockThreadsSaaS: Thread[] = [
  {
    id: 'thread-saas-1',
    title: 'Content Factory Pipeline - Q1',
    status: 'active',
    objective: 'Manage automated content production pipeline',
    events: [
      {
        id: 'event-saas-1-1',
        type: 'system',
        timestamp: '2024-01-15T08:00:00Z',
        content: 'Pipeline running: 8/12 assets completed',
      },
      {
        id: 'event-saas-1-2',
        type: 'message',
        timestamp: '2024-01-15T08:30:00Z',
        agent: mockAgents[4], // QA_Bot
        content: 'Quality gate passed for assets 1-6. Asset 7 requires revision.',
      },
    ],
    priority: 'high',
    updatedAt: '2024-01-15T08:30:00Z',
  },
  {
    id: 'thread-saas-2',
    title: 'Asset Approval Queue',
    status: 'pending',
    objective: 'Review and approve marketing assets for campaign',
    events: [
      {
        id: 'event-saas-2-1',
        type: 'system',
        timestamp: '2024-01-15T09:00:00Z',
        content: '4 assets awaiting approval',
      },
    ],
    priority: 'medium',
    updatedAt: '2024-01-15T09:00:00Z',
  },
];

export const mockModules: Module[] = [
  {
    id: 'module-1',
    name: 'SEO_Cluster',
    slug: 'seo-cluster',
    description: 'Technical SEO audits, keyword research, and crawl monitoring',
    icon: '🔍',
    activeThreadsCount: 3,
    status: 'active',
    threads: mockThreadsSEO,
  },
  {
    id: 'module-2',
    name: 'Content_Factory',
    slug: 'content-factory',
    description: 'Blog strategy, case studies, and automated content production',
    icon: '📝',
    activeThreadsCount: 2,
    status: 'active',
    threads: mockThreadsContent,
  },
  {
    id: 'module-3',
    name: 'Social_Growth',
    slug: 'social-growth',
    description: 'Viral content testing, trend monitoring, and social automation',
    icon: '📈',
    activeThreadsCount: 2,
    status: 'active',
    threads: mockThreadsSocial,
  },
  {
    id: 'module-4',
    name: 'SaaS_Launch_Ops',
    slug: 'saas-launch-ops',
    description: 'Launch pipelines, asset approval, and campaign coordination',
    icon: '🚀',
    activeThreadsCount: 2,
    status: 'active',
    threads: mockThreadsSaaS,
  },
];

export const mockWorkspace: Workspace = {
  id: 'workspace-1',
  name: 'TechStart',
  status: 'active',
  health: 'warning',
  modules: mockModules,
  createdAt: '2024-01-01T00:00:00Z',
};

export const mockWorkspaces: Workspace[] = [mockWorkspace];

// Helper functions for mock API simulation
export const getWorkspaceById = (id: string): Workspace | undefined => {
  return mockWorkspaces.find(w => w.id === id);
};

export const getModuleById = (workspaceId: string, moduleId: string): Module | undefined => {
  const workspace = getWorkspaceById(workspaceId);
  return workspace?.modules.find(m => m.id === moduleId);
};

export const getThreadById = (workspaceId: string, moduleId: string, threadId: string): Thread | undefined => {
  const module = getModuleById(workspaceId, moduleId);
  return module?.threads.find(t => t.id === threadId);
};

export const getAgentById = (id: string): Agent | undefined => {
  return mockAgents.find(a => a.id === id);
};
