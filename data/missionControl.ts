import { Thread } from './mockData';

export interface MissionControlData {
  threads: Thread[];
  kpis: {
    systemHealth: number;
    activeThreads: number;
    pendingActions: number;
    completedTasks: number;
  };
  liveActivity: {
    timestamp: string;
    agent: string;
    action: string;
    details: string;
  }[];
}

export const mockMissionThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'Q1 SEO Strategy Alignment',
    status: 'inbox',
    objective: 'Align Q1 SEO strategy with content calendar and business goals',
    events: [
      {
        type: 'message',
        timestamp: '2024-01-15T10:30:00Z',
        agent: {
          id: 'agent-1',
          name: 'SEO_Lead',
          role: 'SEO Specialist',
          avatar: '/avatars/seo-lead.png',
          metrics: { accuracy: 95, latency: 200 }
        },
        content: 'Initial keyword research completed. Ready for review.'
      }
    ]
  },
  {
    id: 'thread-2',
    title: 'Content Velocity Analysis',
    status: 'in-progress',
    objective: 'Analyze and optimize content production velocity for Q1',
    events: [
      {
        type: 'message',
        timestamp: '2024-01-15T11:45:00Z',
        agent: {
          id: 'agent-2',
          name: 'Content_Manager',
          role: 'Content Strategist',
          avatar: '/avatars/content-manager.png',
          metrics: { accuracy: 92, latency: 180 }
        },
        content: 'Gathering metrics from all content teams.'
      }
    ]
  },
  {
    id: 'thread-3',
    title: 'Social Media Trend Alert',
    status: 'review',
    objective: 'Review and respond to emerging social media trends',
    events: [
      {
        type: 'message',
        timestamp: '2024-01-15T09:15:00Z',
        agent: {
          id: 'agent-3',
          name: 'Social_Analyst',
          role: 'Social Media Expert',
          avatar: '/avatars/social-analyst.png',
          metrics: { accuracy: 88, latency: 150 }
        },
        content: 'Identified 3 trending topics relevant to our niche.'
      }
    ]
  },
  {
    id: 'thread-4',
    title: 'Technical Audit Report',
    status: 'blocked',
    objective: 'Complete technical SEO audit and generate actionable report',
    events: [
      {
        type: 'conflict',
        timestamp: '2024-01-15T14:20:00Z',
        agent: {
          id: 'agent-1',
          name: 'SEO_Lead',
          role: 'SEO Specialist',
          avatar: '/avatars/seo-lead.png',
          metrics: { accuracy: 95, latency: 200 }
        },
        content: 'Crawl budget allocation conflicts with new sitemap structure.'
      }
    ]
  },
  {
    id: 'thread-5',
    title: 'Keyword Gap Analysis',
    status: 'done',
    objective: 'Identify keyword gaps and prioritize target keywords',
    events: [
      {
        type: 'message',
        timestamp: '2024-01-14T16:30:00Z',
        agent: {
          id: 'agent-4',
          name: 'Keyword_Researcher',
          role: 'Research Analyst',
          avatar: '/avatars/keyword-researcher.png',
          metrics: { accuracy: 97, latency: 220 }
        },
        content: 'Gap analysis complete. 150 new high-priority keywords identified.'
      }
    ]
  },
  {
    id: 'thread-6',
    title: 'Competitor Content Analysis',
    status: 'inbox',
    objective: 'Analyze competitor content strategies and identify opportunities',
    events: []
  },
  {
    id: 'thread-7',
    title: 'Link Building Campaign',
    status: 'in-progress',
    objective: 'Execute Q1 link building campaign with target partners',
    events: [
      {
        type: 'message',
        timestamp: '2024-01-15T13:00:00Z',
        agent: {
          id: 'agent-5',
          name: 'Outreach_Specialist',
          role: 'Link Builder',
          avatar: '/avatars/outreach-specialist.png',
          metrics: { accuracy: 85, latency: 250 }
        },
        content: 'Contacted 25 potential partners. 8 positive responses received.'
      }
    ]
  }
];

export const mockMissionKPIs = {
  systemHealth: 94,
  activeThreads: 12,
  pendingActions: 5,
  completedTasks: 48
};

export const mockLiveActivity = [
  {
    timestamp: '2024-01-15T14:45:00Z',
    agent: 'SEO_Lead',
    action: 'Completed',
    details: 'Technical audit report generation'
  },
  {
    timestamp: '2024-01-15T14:42:00Z',
    agent: 'Content_Manager',
    action: 'Started',
    details: 'Content velocity analysis'
  },
  {
    timestamp: '2024-01-15T14:38:00Z',
    agent: 'Social_Analyst',
    action: 'Flagged',
    details: 'Viral trend alert for tech sector'
  },
  {
    timestamp: '2024-01-15T14:35:00Z',
    agent: 'Outreach_Specialist',
    action: 'Updated',
    details: 'Link building prospect list'
  },
  {
    timestamp: '2024-01-15T14:30:00Z',
    agent: 'Keyword_Researcher',
    action: 'Submitted',
    details: 'Keyword gap analysis results'
  }
];

export const missionControlData: MissionControlData = {
  threads: mockMissionThreads,
  kpis: mockMissionKPIs,
  liveActivity: mockLiveActivity
};
