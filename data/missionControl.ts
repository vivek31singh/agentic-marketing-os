// Mission Control Dashboard Mock Data

export interface StatusChip {
  id: string;
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  count?: number;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export interface DomainSnapshot {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'idle';
  health: number;
  lastUpdated: string;
  activeAgents: number;
  moduleSlug: string;
}

export interface ActiveThreadPreview {
  id: string;
  title: string;
  module: string;
  status: 'active' | 'paused' | 'blocked' | 'completed';
  progress: number;
  assignedAgents: string[];
  lastActivity: string;
}

export const mockStatusChips: StatusChip[] = [
  { id: '1', label: 'System Online', variant: 'success' },
  { id: '2', label: 'All Services Operational', variant: 'success' },
  { id: '3', label: 'Pending Actions', variant: 'warning', count: 3 },
  { id: '4', label: 'Critical Issues', variant: 'danger', count: 0 },
  { id: '5', label: 'Last Sync: 2 min ago', variant: 'neutral' },
];

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: '1',
    label: 'System Health',
    value: 94,
    change: '+2%',
    trend: 'up',
    description: 'Overall system performance score',
  },
  {
    id: '2',
    label: 'Active Threads',
    value: 12,
    change: '+3',
    trend: 'up',
    description: 'Currently running agent workflows',
  },
  {
    id: '3',
    label: 'Pending Actions',
    value: 8,
    change: '-2',
    trend: 'down',
    description: 'Awaiting user approval or input',
  },
  {
    id: '4',
    label: 'Active Agents',
    value: 7,
    change: '0',
    trend: 'neutral',
    description: 'AI agents currently operational',
  },
];

export const mockDomainSnapshots: DomainSnapshot[] = [
  {
    id: '1',
    name: 'Business Audit',
    status: 'healthy',
    health: 92,
    lastUpdated: '5 min ago',
    activeAgents: 2,
    moduleSlug: 'business-audit',
  },
  {
    id: '2',
    name: 'SEO Cluster',
    status: 'warning',
    health: 78,
    lastUpdated: '12 min ago',
    activeAgents: 3,
    moduleSlug: 'seo-cluster',
  },
  {
    id: '3',
    name: 'Content Factory',
    status: 'healthy',
    health: 88,
    lastUpdated: '8 min ago',
    activeAgents: 2,
    moduleSlug: 'content-factory',
  },
  {
    id: '4',
    name: 'Social Growth',
    status: 'critical',
    health: 45,
    lastUpdated: '1 hour ago',
    activeAgents: 0,
    moduleSlug: 'social-growth',
  },
  {
    id: '5',
    name: 'SaaS Launch Ops',
    status: 'idle',
    health: 0,
    lastUpdated: '2 days ago',
    activeAgents: 0,
    moduleSlug: 'saas-launch-ops',
  },
  {
    id: '6',
    name: 'Competitor Intel',
    status: 'healthy',
    health: 95,
    lastUpdated: '3 min ago',
    activeAgents: 1,
    moduleSlug: 'competitor-intel',
  },
];

export const mockActiveThreads: ActiveThreadPreview[] = [
  {
    id: 'thread-1',
    title: 'Q1 Keyword Research - Technology Cluster',
    module: 'SEO Cluster',
    status: 'active',
    progress: 65,
    assignedAgents: ['SEO_Specialist', 'Content_Strategist'],
    lastActivity: '2 min ago',
  },
  {
    id: 'thread-2',
    title: 'Social Media Campaign - Viral Lab',
    module: 'Social Growth',
    status: 'blocked',
    progress: 30,
    assignedAgents: ['Social_Manager', 'Creative_Director'],
    lastActivity: '15 min ago',
  },
  {
    id: 'thread-3',
    title: 'Technical SEO Audit - Crawl Analysis',
    module: 'SEO Cluster',
    status: 'active',
    progress: 85,
    assignedAgents: ['Tech_Lead', 'Crawl_Spider'],
    lastActivity: '5 min ago',
  },
  {
    id: 'thread-4',
    title: 'Blog Post Generation - Product Launch',
    module: 'Content Factory',
    status: 'active',
    progress: 45,
    assignedAgents: ['Content_Writer', 'SEO_Analyst'],
    lastActivity: '8 min ago',
  },
];
