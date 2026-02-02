import { MetricStat as MetricStatType, Thread } from './mockData';

export const saasLaunchOpsMetrics: MetricStatType[] = [
  {
    id: 'launch-readiness',
    label: 'Launch Readiness',
    value: '87%',
    trend: '+12%',
    trendDirection: 'up',
    status: 'success',
    icon: 'rocket',
  },
  {
    id: 'asset-approval-queue',
    label: 'Asset Approval Queue',
    value: '24',
    trend: '-3',
    trendDirection: 'down',
    status: 'warning',
    icon: 'file-check',
  },
  {
    id: 'stakeholder-alignment',
    label: 'Stakeholder Alignment',
    value: '94%',
    trend: '+5%',
    trendDirection: 'up',
    status: 'success',
    icon: 'users',
  },
  {
    id: 'gtm-progress',
    label: 'GTM Progress',
    value: '68%',
    trend: '+8%',
    trendDirection: 'up',
    status: 'active',
    icon: 'target',
  },
];

export const saasLaunchOpsThreads: Thread[] = [
  {
    id: 'gtm-strategy',
    title: 'Go-To-Market Strategy',
    status: 'active',
    objective: 'Define and align GTM strategy across all channels including pricing, positioning, and launch timeline.',
    events: [],
  },
  {
    id: 'q1-asset-review',
    title: 'Q1 Asset Review',
    status: 'needs_approval',
    objective: 'Review and approve all marketing assets for Q1 launch including landing pages, email sequences, and sales collateral.',
    events: [],
  },
  {
    id: 'product-launch-sequence',
    title: 'Product Launch Sequence',
    status: 'in_progress',
    objective: 'Coordinate the phased rollout sequence from beta to public launch, ensuring all systems and teams are ready.',
    events: [],
  },
  {
    id: 'sales-enablement-prep',
    title: 'Sales Enablement Prep',
    status: 'pending',
    objective: 'Prepare sales team with training materials, competitive intelligence, and objection handling guides.',
    events: [],
  },
  {
    id: 'launch-event-coordination',
    title: 'Launch Event Coordination',
    status: 'active',
    objective: 'Plan and execute virtual launch event including technical setup, speaker coordination, and attendee management.',
    events: [],
  },
  {
    id: 'onboarding-flow-optimization',
    title: 'Onboarding Flow Optimization',
    status: 'needs_attention',
    objective: 'Optimize the new user onboarding experience to maximize activation rates and reduce time-to-value.',
    events: [],
  },
];
