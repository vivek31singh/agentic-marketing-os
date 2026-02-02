// SaaS Launch Ops specific types and data

export interface LaunchAgent {
  id: string;
  name: string;
  avatar?: string;
}

export interface LaunchConflictOption {
  id: string;
  agent: string;
  label: string;
  description: string;
}

export interface LaunchConflict {
  reason: string;
  options: LaunchConflictOption[];
}

export interface LaunchThread {
  id: string;
  title: string;
  status: string;
  objective: string;
  tags: string[];
  timeToLaunch: string;
  pendingApprovals: number;
  progress: number;
  hasError?: boolean;
  conflict?: LaunchConflict;
  agents: LaunchAgent[];
}

export interface LaunchMetrics {
  launchReadiness: number;
  approvalQueue: number;
  activeCampaigns: number;
}

export const saasLaunchOpsMetrics: LaunchMetrics = {
  launchReadiness: 87,
  approvalQueue: 24,
  activeCampaigns: 5,
};

export const saasLaunchOpsThreads: LaunchThread[] = [
  {
    id: 'gtm-strategy',
    title: 'Go-To-Market Strategy',
    status: 'active',
    objective: 'Define and align GTM strategy across all channels including pricing, positioning, and launch timeline.',
    tags: ['GTM', 'Strategy', 'Q1'],
    timeToLaunch: '14 days',
    pendingApprovals: 3,
    progress: 75,
    agents: [
      { id: 'agent-1', name: 'Strategy Lead' },
      { id: 'agent-2', name: 'Product Manager' },
    ],
  },
  {
    id: 'q1-asset-review',
    title: 'Q1 Asset Review',
    status: 'needs_approval',
    objective: 'Review and approve all marketing assets for Q1 launch including landing pages, email sequences, and sales collateral.',
    tags: ['Assets', 'Review', 'Marketing'],
    timeToLaunch: '7 days',
    pendingApprovals: 8,
    progress: 45,
    conflict: {
      reason: 'Multiple stakeholders have different preferences for the hero image',
      options: [
        { id: 'opt-1', agent: 'Design Lead', label: 'Option A', description: 'Use the modern gradient background' },
        { id: 'opt-2', agent: 'Marketing Lead', label: 'Option B', description: 'Use the product screenshot hero' },
      ],
    },
    agents: [
      { id: 'agent-3', name: 'Design Lead' },
      { id: 'agent-4', name: 'Marketing Lead' },
    ],
  },
  {
    id: 'product-launch-sequence',
    title: 'Product Launch Sequence',
    status: 'in_progress',
    objective: 'Coordinate the phased rollout sequence from beta to public launch, ensuring all systems and teams are ready.',
    tags: ['Launch', 'Rollout', 'Coordination'],
    timeToLaunch: '21 days',
    pendingApprovals: 2,
    progress: 60,
    hasError: true,
    agents: [
      { id: 'agent-5', name: 'Tech Lead' },
      { id: 'agent-6', name: 'DevOps' },
    ],
  },
  {
    id: 'sales-enablement-prep',
    title: 'Sales Enablement Prep',
    status: 'pending',
    objective: 'Prepare sales team with training materials, competitive intelligence, and objection handling guides.',
    tags: ['Sales', 'Training', 'Enablement'],
    timeToLaunch: '28 days',
    pendingApprovals: 0,
    progress: 20,
    agents: [
      { id: 'agent-7', name: 'Sales Ops' },
    ],
  },
];
