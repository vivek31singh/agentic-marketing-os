import { Thread, Agent } from './mockData';

// Content Factory specific metrics
export interface ContentFactoryMetrics {
  contentVelocity: {
    current: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
  };
  pendingApproval: number;
  articlesPublished: number;
  activeWriters: number;
  avgReviewTime: string;
}

// Content threads with content-specific metadata
export interface ContentThread extends Thread {
  contentType: 'blog' | 'social' | 'email' | 'landing-page';
  wordCount?: number;
  targetAudience: string;
  assignedAgent?: Agent;
  dueDate: string;
  approvalStage: 'draft' | 'review' | 'final' | 'published';
}

// Mock content factory metrics
export const contentFactoryMetrics: ContentFactoryMetrics = {
  contentVelocity: {
    current: 12,
    target: 15,
    trend: 'up',
  },
  pendingApproval: 8,
  articlesPublished: 47,
  activeWriters: 4,
  avgReviewTime: '2.5 hours',
};

// Mock agents for content factory
const contentAgents: Agent[] = [
  {
    id: 'agent-content-1',
    name: 'CopyWriter_AI',
    role: 'Content Creator',
    avatar: 'CW',
    metrics: {
      accuracy: 92,
      latency: 1.2,
    },
  },
  {
    id: 'agent-content-2',
    name: 'Editor_Bot',
    role: 'Content Editor',
    avatar: 'EB',
    metrics: {
      accuracy: 88,
      latency: 0.8,
    },
  },
  {
    id: 'agent-content-3',
    name: 'SEO_Expert',
    role: 'SEO Specialist',
    avatar: 'SE',
    metrics: {
      accuracy: 95,
      latency: 1.5,
    },
  },
];

// Mock content threads
export const contentThreads: ContentThread[] = [
  {
    id: 'thread-content-1',
    title: 'Q1 Blog Strategy: AI in Marketing',
    status: 'in-progress',
    objective: 'Create comprehensive blog series on AI applications in marketing automation',
    contentType: 'blog',
    wordCount: 2500,
    targetAudience: 'Marketing Directors, CMOs',
    assignedAgent: contentAgents[0],
    dueDate: '2024-02-15',
    approvalStage: 'review',
    events: [],
  },
  {
    id: 'thread-content-2',
    title: 'Product Launch Email Sequence',
    status: 'active',
    objective: 'Design and write 5-part email sequence for SaaS product launch',
    contentType: 'email',
    wordCount: 1800,
    targetAudience: 'Potential SaaS customers',
    assignedAgent: contentAgents[1],
    dueDate: '2024-02-20',
    approvalStage: 'draft',
    events: [],
  },
  {
    id: 'thread-content-3',
    title: 'Social Media Campaign: Spring Trends',
    status: 'pending',
    objective: 'Develop social media content calendar highlighting spring marketing trends',
    contentType: 'social',
    targetAudience: 'Small business owners',
    assignedAgent: contentAgents[2],
    dueDate: '2024-03-01',
    approvalStage: 'draft',
    events: [],
  },
  {
    id: 'thread-content-4',
    title: 'Landing Page Optimization',
    status: 'in-progress',
    objective: 'Rewrite landing page copy to improve conversion rates',
    contentType: 'landing-page',
    wordCount: 800,
    targetAudience: 'Enterprise prospects',
    assignedAgent: contentAgents[0],
    dueDate: '2024-02-10',
    approvalStage: 'final',
    events: [],
  },
  {
    id: 'thread-content-5',
    title: 'White Paper: Future of Automation',
    status: 'active',
    objective: 'Research and write white paper on automation trends',
    contentType: 'blog',
    wordCount: 5000,
    targetAudience: 'Industry analysts, Decision makers',
    assignedAgent: contentAgents[2],
    dueDate: '2024-03-15',
    approvalStage: 'draft',
    events: [],
  },
  {
    id: 'thread-content-6',
    title: 'Newsletter: March Highlights',
    status: 'pending',
    objective: 'Compile and write monthly newsletter with product updates',
    contentType: 'email',
    wordCount: 600,
    targetAudience: 'Existing customers',
    assignedAgent: contentAgents[1],
    dueDate: '2024-03-05',
    approvalStage: 'review',
    events: [],
  },
];

// Get content thread by ID
export const getContentThreadById = (id: string): ContentThread | undefined => {
  return contentThreads.find(thread => thread.id === id);
};

// Get content threads by status
export const getContentThreadsByStatus = (status: string): ContentThread[] => {
  return contentThreads.filter(thread => thread.status === status);
};

// Get content threads by type
export const getContentThreadsByType = (type: string): ContentThread[] => {
  return contentThreads.filter(thread => thread.contentType === type);
};
