// Kanban Board Data Structures

export interface KanbanColumn {
  id: string;
  title: string;
  status: string;
  count: number;
  color: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  domain: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  agent?: {
    name: string;
    avatar: string;
  };
  eventsCount: number;
  attachmentsCount: number;
}

export interface KPIMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
}

export interface DomainHealth {
  name: string;
  health: 'healthy' | 'warning' | 'error' | 'pending';
  count?: number;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'agent' | 'user' | 'system';
  agent?: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target?: string;
  metadata?: string;
}

// Kanban Columns
export const kanbanColumns: KanbanColumn[] = [
  { id: 'inbox', title: 'Inbox', status: 'new', count: 5, color: 'slate' },
  { id: 'in-progress', title: 'In Progress', status: 'active', count: 3, color: 'blue' },
  { id: 'review', title: 'Review', status: 'review', count: 2, color: 'amber' },
  { id: 'blocked', title: 'Blocked', status: 'blocked', count: 1, color: 'rose' },
  { id: 'done', title: 'Done', status: 'completed', count: 12, color: 'emerald' },
];

// Kanban Cards
export const kanbanCards: KanbanCard[] = [
  {
    id: '1',
    title: 'Audit Q1 SEO performance metrics and identify optimization opportunities',
    domain: 'SEO_Cluster',
    status: 'new',
    priority: 'high',
    agent: { name: 'Tech_Lead', avatar: '🤖' },
    eventsCount: 3,
    attachmentsCount: 2,
  },
  {
    id: '2',
    title: 'Review and approve content calendar for March blog posts',
    domain: 'Content_Factory',
    status: 'new',
    priority: 'medium',
    agent: { name: 'Content_Ops', avatar: '📝' },
    eventsCount: 5,
    attachmentsCount: 1,
  },
  {
    id: '3',
    title: 'Analyze viral trends from TikTok and Instagram for campaign ideation',
    domain: 'Social_Growth',
    status: 'new',
    priority: 'urgent',
    eventsCount: 2,
    attachmentsCount: 0,
  },
  {
    id: '4',
    title: 'Prepare launch assets for Q2 product feature release',
    domain: 'SaaS_Launch_Ops',
    status: 'new',
    priority: 'high',
    agent: { name: 'Launch_Manager', avatar: '🚀' },
    eventsCount: 8,
    attachmentsCount: 4,
  },
  {
    id: '5',
    title: 'Fix critical 404 errors on product documentation pages',
    domain: 'SEO_Cluster',
    status: 'new',
    priority: 'urgent',
    eventsCount: 1,
    attachmentsCount: 0,
  },
  {
    id: '6',
    title: 'Generate social media captions for influencer campaign',
    domain: 'Social_Growth',
    status: 'active',
    priority: 'medium',
    agent: { name: 'Copywriter_Bot', avatar: '✍️' },
    eventsCount: 4,
    attachmentsCount: 3,
  },
  {
    id: '7',
    title: 'Optimize landing page meta tags for organic search visibility',
    domain: 'SEO_Cluster',
    status: 'active',
    priority: 'high',
    agent: { name: 'SEO_Specialist', avatar: '🔍' },
    eventsCount: 6,
    attachmentsCount: 1,
  },
  {
    id: '8',
    title: 'Draft whitepaper on AI-powered marketing strategies',
    domain: 'Content_Factory',
    status: 'active',
    priority: 'low',
    eventsCount: 2,
    attachmentsCount: 0,
  },
  {
    id: '9',
    title: 'Review competitor analysis report for positioning insights',
    domain: 'Business_Audit',
    status: 'review',
    priority: 'medium',
    agent: { name: 'Market_Analyst', avatar: '📊' },
    eventsCount: 3,
    attachmentsCount: 5,
  },
  {
    id: '10',
    title: 'Approve final launch email sequence templates',
    domain: 'SaaS_Launch_Ops',
    status: 'review',
    priority: 'high',
    eventsCount: 7,
    attachmentsCount: 2,
  },
  {
    id: '11',
    title: 'Resolve API integration issues with analytics platform',
    domain: 'SaaS_Launch_Ops',
    status: 'blocked',
    priority: 'urgent',
    agent: { name: 'DevOps_Bot', avatar: '⚙️' },
    eventsCount: 4,
    attachmentsCount: 1,
  },
];

// KPI Metrics
export const kanbanKPIs: KPIMetric[] = [
  { label: 'System Health', value: '94%', trend: 'up', change: '+2%' },
  { label: 'Throughput', value: '23/day', trend: 'up', change: '+5' },
  { label: 'Avg. Completion', value: '2.3h', trend: 'down', change: '-0.4h' },
  { label: 'Active Agents', value: '8/10', trend: 'neutral' },
  { label: 'SLA Adherence', value: '98.5%', trend: 'up', change: '+0.5%' },
];

// Domain Health Data
export const domainHealthData: DomainHealth[] = [
  { name: 'SEO_Cluster', health: 'healthy', count: 8 },
  { name: 'Content_Factory', health: 'healthy', count: 5 },
  { name: 'Social_Growth', health: 'warning', count: 3 },
  { name: 'SaaS_Launch_Ops', health: 'error', count: 2 },
  { name: 'Business_Audit', health: 'pending', count: 1 },
];

// Live Activity Data
export const kanbanActivities: ActivityItem[] = [
  {
    id: '1',
    timestamp: '2 mins ago',
    type: 'agent',
    agent: { name: 'Tech_Lead', avatar: '🤖', role: 'Technical Lead' },
    action: 'Completed SEO audit task',
    target: 'Q1 SEO performance audit',
    metadata: 'Optimization report generated with 15 recommendations',
  },
  {
    id: '2',
    timestamp: '5 mins ago',
    type: 'agent',
    agent: { name: 'Copywriter_Bot', avatar: '✍️', role: 'Content Writer' },
    action: 'Submitted draft for review',
    target: 'Whitepaper: AI Marketing Strategies',
  },
  {
    id: '3',
    timestamp: '8 mins ago',
    type: 'user',
    agent: { name: 'Sarah Chen', avatar: '👩‍💼', role: 'Marketing Manager' },
    action: 'Approved task and moved to Done',
    target: 'February content calendar',
  },
  {
    id: '4',
    timestamp: '12 mins ago',
    type: 'agent',
    agent: { name: 'SEO_Specialist', avatar: '🔍', role: 'SEO Analyst' },
    action: 'Detected critical issue',
    target: 'Product documentation 404 errors',
    metadata: 'Error rate increased to 12% - immediate attention required',
  },
  {
    id: '5',
    timestamp: '15 mins ago',
    type: 'system',
    action: 'Auto-escalated task due to timeout',
    target: 'API integration task',
    metadata: 'Task blocked for 45min - escalated to DevOps team',
  },
  {
    id: '6',
    timestamp: '20 mins ago',
    type: 'agent',
    agent: { name: 'Launch_Manager', avatar: '🚀', role: 'Launch Coordinator' },
    action: 'Created new task',
    target: 'Q2 feature launch preparation',
  },
  {
    id: '7',
    timestamp: '25 mins ago',
    type: 'agent',
    agent: { name: 'Market_Analyst', avatar: '📊', role: 'Market Researcher' },
    action: 'Updated competitor analysis',
    target: 'Competitor positioning report',
    metadata: 'Added 3 new competitor entries',
  },
  {
    id: '8',
    timestamp: '30 mins ago',
    type: 'user',
    agent: { name: 'Alex Rivera', avatar: '👨‍💻', role: 'Product Manager' },
    action: 'Rejected draft and requested revisions',
    target: 'Launch email templates',
    metadata: 'Comments: Tone needs to be more professional',
  },
];

// Export existing mission control data for backward compatibility
export const mockMissionControlData = {
  workspaceId: 'techstart',
  workspaceName: 'TechStart',
  status: 'active',
  systemHealth: 94,
  pendingActions: 12,
  activeThreads: 23,
  activeAgents: 8,
  modules: [
    { id: 'SEO_Cluster', name: 'SEO Cluster', health: 92, activeThreads: 8 },
    { id: 'Content_Factory', name: 'Content Factory', health: 88, activeThreads: 5 },
    { id: 'Social_Growth', name: 'Social Growth', health: 75, activeThreads: 3 },
    { id: 'SaaS_Launch_Ops', name: 'SaaS Launch Ops', health: 95, activeThreads: 2 },
  ],
  recentThreads: kanbanCards.slice(0, 5),
  liveFeed: kanbanActivities.slice(0, 5),
};
