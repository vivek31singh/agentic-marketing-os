// Mission Control Mock Data

// Status Pills
export interface StatusPill {
  id: string;
  label: string;
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  count?: number;
}

// KPI Trend
export interface KPITrend {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  previousValue: string;
  icon?: string;
}

// Domain Health Detail
export interface DomainHealthDetail {
  id: string;
  name: string;
  health: number; // 0-100
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
  lastUpdated: string;
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

// Active Thread Item
export interface ActiveThreadItem {
  id: string;
  title: string;
  module: string;
  status: 'active' | 'pending' | 'blocked' | 'completed';
  priority: 'high' | 'medium' | 'low';
  lastActivity: string;
  agents: {
    name: string;
    avatar?: string;
  }[];
}

// Live Agent Activity
export interface LiveAgentActivity {
  id: string;
  agentName: string;
  agentRole: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

// Mission Control Data
export const missionControlData = {
  workspaceId: 'ws-techstart-001',
  workspaceName: 'TechStart Marketing',
  
  // Status Pills for header
  statusPills: [
    { id: '1', label: 'System Online', status: 'success' },
    { id: '2', label: 'Agents Active', status: 'success', count: 8 },
    { id: '3', label: 'Pending Reviews', status: 'warning', count: 5 },
    { id: '4', label: 'Critical Issues', status: 'error', count: 1 },
  ] as StatusPill[],

  // KPI Summary Trends
  kpiTrends: [
    {
      id: 'kpi-1',
      label: 'System Health',
      value: '94%',
      trend: 'up',
      trendValue: '+3%',
      previousValue: '91%',
      icon: 'Activity',
    },
    {
      id: 'kpi-2',
      label: 'Active Threads',
      value: '24',
      trend: 'up',
      trendValue: '+4',
      previousValue: '20',
      icon: 'MessageSquare',
    },
    {
      id: 'kpi-3',
      label: 'Avg Response Time',
      value: '1.2s',
      trend: 'down',
      trendValue: '-0.3s',
      previousValue: '1.5s',
      icon: 'Clock',
    },
    {
      id: 'kpi-4',
      label: 'Tasks Completed',
      value: '156',
      trend: 'up',
      trendValue: '+28',
      previousValue: '128',
      icon: 'CheckCircle',
    },
    {
      id: 'kpi-5',
      label: 'Conflicts Resolved',
      value: '12',
      trend: 'neutral',
      trendValue: '0',
      previousValue: '12',
      icon: 'GitMerge',
    },
    {
      id: 'kpi-6',
      label: 'Agent Accuracy',
      value: '97%',
      trend: 'up',
      trendValue: '+2%',
      previousValue: '95%',
      icon: 'Target',
    },
  ] as KPITrend[],

  // Domain Health Details
  domainHealth: [
    {
      id: 'dh-1',
      name: 'SEO Cluster',
      health: 92,
      status: 'healthy',
      issues: [],
      lastUpdated: '2 mins ago',
      metrics: [
        { label: 'Crawl Health', value: '95%', trend: 'up' },
        { label: 'Indexed Pages', value: '12,450', trend: 'up' },
        { label: 'Technical Errors', value: '3', trend: 'down' },
      ],
    },
    {
      id: 'dh-2',
      name: 'Content Factory',
      health: 88,
      status: 'healthy',
      issues: ['One draft pending review for >24h'],
      lastUpdated: '5 mins ago',
      metrics: [
        { label: 'Content Velocity', value: '8/day', trend: 'up' },
        { label: 'Pending Approval', value: '5', trend: 'down' },
        { label: 'Quality Score', value: '4.8/5', trend: 'neutral' },
      ],
    },
    {
      id: 'dh-3',
      name: 'Social Growth',
      health: 76,
      status: 'warning',
      issues: ['Engagement rate below target', '2 viral opportunities missed'],
      lastUpdated: '12 mins ago',
      metrics: [
        { label: 'Viral Potential', value: 'High', trend: 'down' },
        { label: 'Trend Alerts', value: '3', trend: 'up' },
        { label: 'Engagement Rate', value: '2.1%', trend: 'down' },
      ],
    },
    {
      id: 'dh-4',
      name: 'SaaS Launch Ops',
      health: 65,
      status: 'critical',
      issues: ['Asset approval backlog', 'Launch timeline at risk'],
      lastUpdated: '8 mins ago',
      metrics: [
        { label: 'Launch Readiness', value: '65%', trend: 'down' },
        { label: 'Asset Queue', value: '14', trend: 'up' },
        { label: 'Approved Assets', value: '32', trend: 'up' },
      ],
    },
  ] as DomainHealthDetail[],

  // Active Threads
  activeThreads: [
    {
      id: 'th-1',
      title: 'Q1 Blog Strategy Optimization',
      module: 'Content Factory',
      status: 'active',
      priority: 'high',
      lastActivity: '2 mins ago',
      agents: [
        { name: 'Content_Strategist' },
        { name: 'SEO_Specialist' },
      ],
    },
    {
      id: 'th-2',
      title: 'Technical SEO Audit Recovery',
      module: 'SEO Cluster',
      status: 'blocked',
      priority: 'high',
      lastActivity: '8 mins ago',
      agents: [
        { name: 'Tech_Lead' },
        { name: 'Crawl_Spider' },
      ],
    },
    {
      id: 'th-3',
      title: 'Viral Trend Analysis - AI Sector',
      module: 'Social Growth',
      status: 'active',
      priority: 'medium',
      lastActivity: '15 mins ago',
      agents: [
        { name: 'Trend_Analyst' },
        { name: 'Content_Creator' },
      ],
    },
    {
      id: 'th-4',
      title: 'Go-To-Market Asset Approval',
      module: 'SaaS Launch Ops',
      status: 'pending',
      priority: 'high',
      lastActivity: '22 mins ago',
      agents: [
        { name: 'Launch_Manager' },
        { name: 'Brand_Guardian' },
      ],
    },
    {
      id: 'th-5',
      title: 'Backlink Outreach Campaign',
      module: 'SEO Cluster',
      status: 'active',
      priority: 'medium',
      lastActivity: '35 mins ago',
      agents: [
        { name: 'Outreach_Specialist' },
      ],
    },
    {
      id: 'th-6',
      title: 'Influencer Partnership Negotiation',
      module: 'Social Growth',
      status: 'pending',
      priority: 'low',
      lastActivity: '1 hour ago',
      agents: [
        { name: 'Partnership_Manager' },
      ],
    },
  ] as ActiveThreadItem[],

  // Live Agent Activity Feed
  liveAgentActivity: [
    {
      id: 'la-1',
      agentName: 'Content_Strategist',
      agentRole: 'Content',
      action: 'Created draft',
      target: 'Q1 Blog Strategy',
      timestamp: 'Just now',
      status: 'success',
    },
    {
      id: 'la-2',
      agentName: 'SEO_Specialist',
      agentRole: 'SEO',
      action: 'Optimized keywords',
      target: 'Homepage Metadata',
      timestamp: '1 min ago',
      status: 'success',
    },
    {
      id: 'la-3',
      agentName: 'Tech_Lead',
      agentRole: 'Technical',
      action: 'Flagged conflict',
      target: 'Crawl Budget Issue',
      timestamp: '2 mins ago',
      status: 'error',
    },
    {
      id: 'la-4',
      agentName: 'Trend_Analyst',
      agentRole: 'Social',
      action: 'Detected trend',
      target: 'AI Marketing Tools',
      timestamp: '3 mins ago',
      status: 'success',
    },
    {
      id: 'la-5',
      agentName: 'Brand_Guardian',
      agentRole: 'Review',
      action: 'Reviewing asset',
      target: 'Launch Deck v3',
      timestamp: '5 mins ago',
      status: 'pending',
    },
    {
      id: 'la-6',
      agentName: 'Outreach_Specialist',
      agentRole: 'Outreach',
      action: 'Sent email',
      target: 'techblog.com partnership',
      timestamp: '7 mins ago',
      status: 'success',
    },
    {
      id: 'la-7',
      agentName: 'Crawl_Spider',
      agentRole: 'Technical',
      action: 'Completed crawl',
      target: '/blog section',
      timestamp: '8 mins ago',
      status: 'success',
    },
    {
      id: 'la-8',
      agentName: 'Content_Creator',
      agentRole: 'Content',
      action: 'Generated variations',
      target: 'LinkedIn Post Set',
      timestamp: '10 mins ago',
      status: 'success',
    },
    {
      id: 'la-9',
      agentName: 'Launch_Manager',
      agentRole: 'Operations',
      action: 'Updated timeline',
      target: 'Q1 Launch Milestones',
      timestamp: '12 mins ago',
      status: 'success',
    },
    {
      id: 'la-10',
      agentName: 'Partnership_Manager',
      agentRole: 'Social',
      action: 'Negotiating terms',
      target: '@techinfluencer deal',
      timestamp: '15 mins ago',
      status: 'pending',
    },
  ] as LiveAgentActivity[],
};
