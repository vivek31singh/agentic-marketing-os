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

export interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  timestamp: string;
  type: 'command' | 'resolution' | 'system';
}

export const mockMissionControlData = {
  // KPI / Insights Strip
  kpis: [
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

  // Kanban Board Threads
  threads: [
    {
      id: 'thread-1',
      title: 'Optimize blog meta descriptions',
      domain: 'SEO_Cluster',
      status: 'inbox',
      priority: 'high',
      assignee: 'SEO_Agent',
      createdAt: '2024-01-15T09:00:00Z',
    },
    {
      id: 'thread-2',
      title: 'Review Q1 content calendar',
      domain: 'Content_Factory',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Content_Strategist',
      createdAt: '2024-01-14T14:30:00Z',
    },
    {
      id: 'thread-3',
      title: 'Analyze viral trends on Twitter',
      domain: 'Social_Growth',
      status: 'review',
      priority: 'high',
      assignee: 'Social_Analyst',
      createdAt: '2024-01-15T08:15:00Z',
    },
    {
      id: 'thread-4',
      title: 'Approve launch assets',
      domain: 'SaaS_Launch_Ops',
      status: 'blocked',
      priority: 'high',
      assignee: 'Launch_Coordinator',
      createdAt: '2024-01-13T16:45:00Z',
    },
    {
      id: 'thread-5',
      title: 'Crawl budget audit',
      domain: 'SEO_Cluster',
      status: 'done',
      priority: 'medium',
      assignee: 'Crawl_Spider',
      createdAt: '2024-01-12T10:00:00Z',
    },
    {
      id: 'thread-6',
      title: 'Generate LinkedIn posts',
      domain: 'Social_Growth',
      status: 'in-progress',
      priority: 'low',
      assignee: 'Content_Agent',
      createdAt: '2024-01-15T07:30:00Z',
    },
  ],

  // Live Agent Activity Feed
  activities: [
    {
      id: 'act-1',
      agent: 'SEO_Agent',
      action: 'Resolved conflict on Crawl Budget thread',
      timestamp: '2 min ago',
      type: 'resolution',
    },
    {
      id: 'act-2',
      agent: 'Content_Strategist',
      action: 'Updated Q1 content calendar',
      timestamp: '5 min ago',
      type: 'command',
    },
    {
      id: 'act-3',
      agent: 'System',
      action: 'New high-priority thread created in SaaS_Launch_Ops',
      timestamp: '8 min ago',
      type: 'system',
    },
    {
      id: 'act-4',
      agent: 'Social_Analyst',
      action: 'Completed trend analysis report',
      timestamp: '12 min ago',
      type: 'resolution',
    },
    {
      id: 'act-5',
      agent: 'Launch_Coordinator',
      action: 'Requested approval for launch video',
      timestamp: '15 min ago',
      type: 'command',
    },
  ] as AgentActivity[],
};
