// Mission Control Mock Data
// Used for the Kanban-style Mission Control Dashboard

export interface KPIChip {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface DomainHealth {
  domain: string;
  health: number;
  status: 'healthy' | 'warning' | 'critical';
  threads: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
}

export interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  type: 'command' | 'resolution' | 'system';
}

export const mockMissionControlData = {
  // KPI / Insights Strip
  stats: [
    { label: 'System Health', value: '94%', trend: 'up' },
    { label: 'Pending Actions', value: '12', trend: 'down' },
    { label: 'Active Agents', value: '8', trend: 'neutral' },
    { label: 'Errors Today', value: '2', trend: 'down' },
    { label: 'Avg Latency', value: '420ms', trend: 'neutral' },
  ] as KPIChip[],

  // Domain Health Chips
  domainHealth: [
    { domain: 'SEO_Cluster', health: 95, status: 'healthy', threads: 4 },
    { domain: 'Content_Factory', health: 82, status: 'warning', threads: 7 },
    { domain: 'Social_Growth', health: 98, status: 'healthy', threads: 3 },
    { domain: 'SaaS_Launch_Ops', health: 76, status: 'warning', threads: 5 },
  ] as DomainHealth[],

  // Kanban Columns
  columns: [
    { id: 'inbox', title: 'Inbox' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'blocked', title: 'Blocked' },
    { id: 'done', title: 'Done' },
  ] as KanbanColumn[],

  // Kanban Board Threads
  items: [
    {
      id: 'thread-1',
      title: 'Optimize blog meta descriptions',
      slug: 'SEO_Cluster',
      status: 'inbox',
      priority: 'high',
      assignee: 'SEO_Agent',
      createdAt: '2024-01-15T09:00:00Z',
      events: []
    },
    {
      id: 'thread-2',
      title: 'Review Q1 content calendar',
      slug: 'Content_Factory',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Content_Strategist',
      createdAt: '2024-01-14T14:30:00Z',
      events: []
    },
    {
      id: 'thread-3',
      title: 'Analyze viral trends on Twitter',
      slug: 'Social_Growth',
      status: 'review',
      priority: 'high',
      assignee: 'Social_Analyst',
      createdAt: '2024-01-15T08:15:00Z',
      events: []
    },
    {
      id: 'thread-4',
      title: 'Approve launch assets',
      slug: 'SaaS_Launch_Ops',
      status: 'blocked',
      priority: 'high',
      assignee: 'Launch_Coordinator',
      createdAt: '2024-01-13T16:45:00Z',
      events: []
    },
    {
      id: 'thread-5',
      title: 'Crawl budget audit',
      slug: 'SEO_Cluster',
      status: 'done',
      priority: 'medium',
      assignee: 'Crawl_Spider',
      createdAt: '2024-01-12T10:00:00Z',
      events: [{ timestamp: '2024-01-12T10:00:00Z' }]
    },
    {
      id: 'thread-6',
      title: 'Generate LinkedIn posts',
      slug: 'Social_Growth',
      status: 'in-progress',
      priority: 'low',
      assignee: 'Content_Agent',
      createdAt: '2024-01-15T07:30:00Z',
      events: []
    },
  ],

  // Active Agents for System Intelligence
  activeAgents: [
    { name: 'SEO_Lead', status: 'active' },
    { name: 'Content_Writer', status: 'active' },
    { name: 'Social_Manager', status: 'idle' },
    { name: 'Launch_Coord', status: 'idle' },
  ],

  // Live Agent Activity Feed
  liveActivity: [
    {
      id: 'act-1',
      type: 'resolution',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
      agent: { name: 'SEO_Agent', role: 'Optimizer', avatar: 'S' },
      content: 'Resolved conflict on Crawl Budget thread',
      meta: { domain: 'SEO_Cluster' }
    },
    {
      id: 'act-2',
      type: 'message', // Changed from command to message/system/etc based on types
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      agent: { name: 'Content_Strat', role: 'Strategist', avatar: 'C' },
      content: 'Updated Q1 content calendar',
      meta: { domain: 'Content' }
    },
    {
      id: 'act-3',
      type: 'system',
      timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      content: 'New high-priority thread created in SaaS_Launch_Ops',
      meta: { severity: 'medium' }
    },
    {
      id: 'act-4',
      type: 'resolution',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      agent: { name: 'Social_Analyst', role: 'Analyst', avatar: 'A' },
      content: 'Completed trend analysis report',
      meta: { domain: 'Social' }
    },
    {
      id: 'act-5',
      type: 'message', // Using message as generic action
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      agent: { name: 'Launch_Coord', role: 'Coordinator', avatar: 'L' },
      content: 'Requested approval for launch video',
      meta: { domain: 'Launch' }
    },
  ] as any[], // Using any[] to bypass strict interface matching for mock data simplicity if needed, or matching ActivityItem
};
