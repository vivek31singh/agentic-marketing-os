import { Thread, Metric } from './mockData';

export const socialMetrics: Metric[] = [
  {
    id: 'social-metric-1',
    label: 'Viral Potential',
    value: 78,
    trend: '+12%',
    status: 'success',
  },
  {
    id: 'social-metric-2',
    label: 'Trend Alerts',
    value: 5,
    trend: '+2',
    status: 'warning',
  },
  {
    id: 'social-metric-3',
    label: 'Engagement Rate',
    value: 4.8,
    trend: '+0.6%',
    status: 'success',
  },
  {
    id: 'social-metric-4',
    label: 'Pending Outreach',
    value: 23,
    trend: '-5',
    status: 'success',
  },
];

export const socialThreads: Thread[] = [
  {
    id: 'social-thread-1',
    title: 'Viral Trend Analysis',
    status: 'active',
    objective: 'Analyze emerging trends and identify viral content opportunities',
    events: [],
  },
  {
    id: 'social-thread-2',
    title: 'Influencer Outreach Campaign',
    status: 'active',
    objective: 'Identify and reach out to relevant influencers for collaboration',
    events: [],
  },
  {
    id: 'social-thread-3',
    title: 'Social Sentiment Monitor',
    status: 'pending',
    objective: 'Monitor brand sentiment across social platforms',
    events: [],
  },
];
