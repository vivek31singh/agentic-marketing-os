import { Thread } from '@/data/mockData';

export interface SocialMetric {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}

export const socialGrowthMetrics: SocialMetric[] = [
  {
    label: 'Viral Potential',
    value: 87,
    trend: 12.5,
    icon: 'flame'
  },
  {
    label: 'Trend Alerts',
    value: 24,
    trend: -5.2,
    icon: 'bell'
  },
  {
    label: 'Engagement Rate',
    value: '4.8%',
    trend: 8.1,
    icon: 'heart'
  },
  {
    label: 'Influencer Reach',
    value: '1.2M',
    trend: 22.3,
    icon: 'users'
  }
];

export const socialThreads: Thread[] = [
  {
    id: 'trend-analysis',
    title: 'Trend Analysis',
    status: 'active',
    objective: 'Monitor emerging trends in the tech industry and identify viral content opportunities',
    events: [],
  },
  {
    id: 'influencer-outreach',
    title: 'Influencer Outreach',
    status: 'review',
    objective: 'Coordinate outreach campaigns with identified key influencers and track engagement',
    events: [],
  },
  {
    id: 'viral-campaign',
    title: 'Viral Campaign Launch',
    status: 'pending',
    objective: 'Prepare and launch viral marketing campaign targeting Gen Z audience',
    events: [],
  },
  {
    id: 'social-audit',
    title: 'Social Platform Audit',
    status: 'active',
    objective: 'Analyze performance across LinkedIn, Twitter/X, and Instagram channels',
    events: [],
  }
];
