import { Thread, Event, Conflict, Agent } from './mockData';

// Define sample agents for the thread
const techLeadAgent: Agent = {
  id: 'agent-tech-lead',
  name: 'Tech_Lead',
  role: 'Technical Oversight',
  avatar: 'TL',
  metrics: {
    accuracy: 0.92,
    latency: 120
  }
};

const crawlSpiderAgent: Agent = {
  id: 'agent-crawl-spider',
  name: 'Crawl_Spider',
  role: 'Data Extraction',
  avatar: 'CS',
  metrics: {
    accuracy: 0.88,
    latency: 450
  }
};

const contentStrategistAgent: Agent = {
  id: 'agent-content-strategist',
  name: 'Content_Strategist',
  role: 'Content Planning',
  avatar: 'CS',
  metrics: {
    accuracy: 0.95,
    latency: 200
  }
};

// Define events for the thread
const threadEvents: Event[] = [
  {
    type: 'message',
    timestamp: '2024-01-15T09:00:00Z',
    agent: contentStrategistAgent,
    content: 'Initiating Q1 blog content pipeline for the "AI in Marketing" series. Need to align with SEO cluster findings.',
    meta: {
      priority: 'high',
      tags: ['content', 'blog', 'Q1']
    }
  },
  {
    type: 'system',
    timestamp: '2024-01-15T09:01:15Z',
    agent: { id: 'system', name: 'System', role: 'Automation', avatar: 'SYS', metrics: { accuracy: 1, latency: 0 } },
    content: 'Workflow triggered: Content_Pipeline_Q1_v2. Analyzing SEO cluster data...',
    logicChain: ['Trigger workflow', 'Fetch SEO cluster data', 'Identify target keywords']
  },
  {
    type: 'message',
    timestamp: '2024-01-15T09:02:30Z',
    agent: techLeadAgent,
    content: 'Technical audit complete. Page load times are within acceptable ranges. However, I detected 3 critical redirects that need fixing before content launch.',
    meta: {
      severity: 'warning',
      issues: ['redirect-chain', '404-errors']
    }
  },
  {
    type: 'message',
    timestamp: '2024-01-15T09:03:45Z',
    agent: crawlSpiderAgent,
    content: 'Crawl data analysis suggests we should prioritize long-tail keywords over high-volume short-tail. The competition on short-tail is too aggressive for Q1 launch timeline.',
    logicChain: ['Analyze crawl data', 'Compare keyword difficulty', 'Recommend strategy shift']
  },
  {
    type: 'conflict',
    timestamp: '2024-01-15T09:05:00Z',
    agent: techLeadAgent,
    content: 'DISAGREEMENT: Technical debt needs to be addressed before new content. The redirect issues will impact SEO performance of new articles.',
    meta: {
      conflictId: 'conf-001',
      severity: 'high'
    }
  },
  {
    type: 'message',
    timestamp: '2024-01-15T09:05:30Z',
    agent: contentStrategistAgent,
    content: 'Counterpoint: Q1 content calendar is locked. Delaying for technical fixes will miss our strategic timing window. Can we proceed in parallel?',
    meta: {
      conflictId: 'conf-001',
      severity: 'high'
    }
  },
  {
    type: 'system',
    timestamp: '2024-01-15T09:06:00Z',
    agent: { id: 'system', name: 'System', role: 'Automation', avatar: 'SYS', metrics: { accuracy: 1, latency: 0 } },
    content: 'CONFLICT DETECTED: Resource allocation priority requires human resolution. Awaiting decision...',
    logicChain: ['Detect conflicting strategies', 'Calculate impact scores', 'Request human intervention']
  }
];

// Define the conflict for the thread
const threadConflict: Conflict = {
  id: 'conf-001',
  reason: 'Technical debt vs. Content deadline - Agents disagree on task prioritization',
  options: [
    {
      agent: techLeadAgent,
      label: 'Fix Technical Debt First',
      description: 'Pause content production to resolve the 3 critical redirects and 404 errors. Estimated delay: 3 days. Long-term benefit: +15% SEO performance.',
      outcome: 'Technical fixes completed before content launch. Reduced bounce risk. Content calendar adjusted by 1 week.'
    },
    {
      agent: contentStrategistAgent,
      label: 'Proceed with Content Launch',
      description: 'Continue content production as planned. Address technical issues in parallel or in next sprint. Meets Q1 strategic deadlines.',
      outcome: 'Content launched on schedule. Some SEO performance impact observed due to redirects. Technical debt carried to Q2.'
    },
    {
      agent: crawlSpiderAgent,
      label: 'Hybrid Approach',
      description: 'Proceed with high-priority content only while fixing redirects concurrently. Split resources 60/40 between content and technical.',
      outcome: '3 of 5 articles launched on time. Critical redirects fixed. Balanced delivery with 70% of original goals met.'
    }
  ]
};

// Define the sample thread
export const sampleThread: Thread = {
  id: 'thread-q1-content-pipeline',
  slug: 'q1-content-pipeline',
  title: 'Q1 Content Pipeline - AI in Marketing Series',
  status: 'awaiting_resolution',
  objective: 'Plan and execute the Q1 blog content series focused on "AI in Marketing". This involves coordinating between content strategy, technical SEO, and data extraction agents to produce 5 high-quality articles aligned with SEO cluster findings and business goals.',
  events: threadEvents,
  conflict: threadConflict,
  meta: {
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T09:06:00Z',
    priority: 'high',
    assignedTo: 'contentStrategistAgent'
  }
};

// Helper function to get thread by slug
export const getThreadBySlug = (slug: string): Thread | undefined => {
  if (slug === sampleThread.slug) {
    return sampleThread;
  }
  return undefined;
};
