import { Thread } from './mockData';

export interface KPI {
  id: string;
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  status: 'inbox' | 'in-progress' | 'review' | 'blocked' | 'done';
  priority: 'high' | 'medium' | 'low';
  domain: string;
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  itemIds: string[];
}

export interface ActivityEvent {
  id: string;
  type: 'log' | 'command' | 'resolution' | 'alert';
  message: string;
  timestamp: Date;
  agent?: string;
}

export interface MissionControlData {
  kpis: KPI[];
  columns: KanbanColumn[];
  items: KanbanItem[];
  activities: ActivityEvent[];
}

export const missionControlKPIs: KPI[] = [
  {
    id: 'system-health',
    label: 'System Health',
    value: 94,
    trend: 'up',
    change: '+2%'
  },
  {
    id: 'active-threads',
    label: 'Active Threads',
    value: 23,
    trend: 'up',
    change: '+5'
  },
  {
    id: 'pending-actions',
    label: 'Pending Actions',
    value: 7,
    trend: 'down',
    change: '-3'
  },
  {
    id: 'agents-active',
    label: 'Active Agents',
    value: 8,
    trend: 'neutral'
  }
];

export const missionControlColumns: KanbanColumn[] = [
  { id: 'inbox', title: 'Inbox', itemIds: ['item-1', 'item-2'] },
  { id: 'in-progress', title: 'In Progress', itemIds: ['item-3'] },
  { id: 'review', title: 'Review', itemIds: ['item-4'] },
  { id: 'blocked', title: 'Blocked', itemIds: [] },
  { id: 'done', title: 'Done', itemIds: ['item-5'] }
];

export const missionControlItems: KanbanItem[] = [
  {
    id: 'item-1',
    title: 'Crawl budget optimization',
    status: 'inbox',
    priority: 'high',
    domain: 'SEO_Cluster'
  },
  {
    id: 'item-2',
    title: 'Q1 blog strategy review',
    status: 'inbox',
    priority: 'medium',
    domain: 'Content_Factory'
  },
  {
    id: 'item-3',
    title: 'Viral trend analysis',
    status: 'in-progress',
    priority: 'high',
    domain: 'Social_Growth'
  },
  {
    id: 'item-4',
    title: 'Go-to-market assets approval',
    status: 'review',
    priority: 'high',
    domain: 'SaaS_Launch_Ops'
  },
  {
    id: 'item-5',
    title: 'Technical audit complete',
    status: 'done',
    priority: 'medium',
    domain: 'Business_Audit'
  }
];

export const missionControlActivities: ActivityEvent[] = [
  {
    id: 'activity-1',
    type: 'log',
    message: 'Crawl spider completed index scan',
    timestamp: new Date(Date.now() - 300000),
    agent: 'Crawl_Spider'
  },
  {
    id: 'activity-2',
    type: 'resolution',
    message: 'Conflict resolved: Keyword priority debate',
    timestamp: new Date(Date.now() - 600000),
    agent: 'Tech_Lead'
  },
  {
    id: 'activity-3',
    type: 'command',
    message: 'Command sent: Generate competitor report',
    timestamp: new Date(Date.now() - 900000),
    agent: 'Content_Strategist'
  },
  {
    id: 'activity-4',
    type: 'alert',
    message: 'High latency detected in API gateway',
    timestamp: new Date(Date.now() - 1200000),
    agent: 'System_Monitor'
  },
  {
    id: 'activity-5',
    type: 'log',
    message: 'Social sentiment analysis updated',
    timestamp: new Date(Date.now() - 1500000),
    agent: 'Sentiment_Analyzer'
  }
];

export const missionControlData: MissionControlData = {
  kpis: missionControlKPIs,
  columns: missionControlColumns,
  items: missionControlItems,
  activities: missionControlActivities
};
