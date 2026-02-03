import { Thread } from './mockData';

// Kanban Column Definition
export interface KanbanColumn {
  id: string;
  title: string;
  count: number;
}

// Mission Control KPI Stats
export interface MissionControlStats {
  systemHealth: number;
  activeThreads: number;
  pendingActions: number;
  agentsActive: number;
}

// Mission Control Data Structure
export interface MissionControlData {
  columns: KanbanColumn[];
  items: Thread[];
  stats: MissionControlStats;
}

// Define the Kanban columns for Mission Control
export const kanbanColumns: KanbanColumn[] = [
  { id: 'inbox', title: 'Inbox', count: 8 },
  { id: 'in-progress', title: 'In Progress', count: 5 },
  { id: 'review', title: 'Review', count: 3 },
  { id: 'blocked', title: 'Blocked', count: 1 },
  { id: 'done', title: 'Done', count: 12 },
];

// Mock thread items for the Kanban board
export const missionControlItems: Thread[] = [
  {
    id: 'thread-1',
    title: 'Q1 SEO Audit Crawl',
    status: 'inbox',
    objective: 'Complete comprehensive crawl of TechStart domain to identify technical SEO issues.',
    events: []
  },
  {
    id: 'thread-2',
    title: 'Content Strategy Update',
    status: 'inbox',
    objective: 'Review and update Q1 content strategy based on performance metrics.',
    events: []
  },
  {
    id: 'thread-3',
    title: 'Social Media Calendar Sync',
    status: 'in-progress',
    objective: 'Sync social media posting schedule across all platforms for consistency.',
    events: []
  },
  {
    id: 'thread-4',
    title: 'Keyword Gap Analysis',
    status: 'in-progress',
    objective: 'Identify keyword gaps compared to top competitors in the market.',
    events: []
  },
  {
    id: 'thread-5',
    title: 'Blog Post Review - Launch Prep',
    status: 'review',
    objective: 'Review and approve blog posts for the upcoming product launch.',
    events: []
  },
  {
    id: 'thread-6',
    title: 'Influencer Outreach Campaign',
    status: 'review',
    objective: 'Finalize influencer partnerships for viral marketing campaign.',
    events: []
  },
  {
    id: 'thread-7',
    title: 'API Integration Blocker',
    status: 'blocked',
    objective: 'Resolve API rate limiting issues with third-party data provider.',
    events: []
  },
  {
    id: 'thread-8',
    title: 'Competitor Analysis Complete',
    status: 'done',
    objective: 'Analyze competitor backlink profiles and content strategies.',
    events: []
  },
  {
    id: 'thread-9',
    title: 'Homepage Copy Update',
    status: 'done',
    objective: 'Update homepage copy based on new brand messaging guidelines.',
    events: []
  },
  {
    id: 'thread-10',
    title: 'Email Automation Setup',
    status: 'done',
    objective: 'Configure automated email sequences for new user onboarding.',
    events: []
  },
  {
    id: 'thread-11',
    title: 'Brand Guidelines Refresh',
    status: 'inbox',
    objective: 'Refresh brand guidelines to reflect new visual identity.',
    events: []
  },
  {
    id: 'thread-12',
    title: 'Landing Page A/B Test',
    status: 'in-progress',
    objective: 'Set up A/B testing framework for landing page optimization.',
    events: []
  },
  {
    id: 'thread-13',
    title: 'Video Content Production',
    status: 'in-progress',
    objective: 'Produce promotional video content for Q1 marketing campaigns.',
    events: []
  },
  {
    id: 'thread-14',
    title: 'Customer Journey Mapping',
    status: 'review',
    objective: 'Map and optimize customer journey across all touchpoints.',
    events: []
  },
  {
    id: 'thread-15',
    title: 'Press Release Distribution',
    status: 'done',
    objective: 'Distribute press releases to media outlets for launch announcement.',
    events: []
  },
  {
    id: 'thread-16',
    title: 'Analytics Dashboard Setup',
    status: 'done',
    objective: 'Configure analytics dashboard to track key marketing KPIs.',
    events: []
  },
  {
    id: 'thread-17',
    title: 'CRM Data Cleanup',
    status: 'done',
    objective: 'Clean and standardize CRM data for better targeting.',
    events: []
  },
  {
    id: 'thread-18',
    title: 'Paid Campaign Optimization',
    status: 'done',
    objective: 'Optimize paid advertising campaigns for better ROI.',
    events: []
  },
  {
    id: 'thread-19',
    title: 'Lead Scoring Model',
    status: 'done',
    objective: 'Implement lead scoring model for sales team prioritization.',
    events: []
  },
  {
    id: 'thread-20',
    title: 'Website Performance Audit',
    status: 'done',
    objective: 'Audit website performance and implement speed optimizations.',
    events: []
  },
  {
    id: 'thread-21',
    title: 'Mobile Responsiveness Check',
    status: 'done',
    objective: 'Ensure all pages are fully responsive on mobile devices.',
    events: []
  },
  {
    id: 'thread-22',
    title: 'Security Compliance Review',
    status: 'done',
    objective: 'Review security compliance for data handling and privacy.',
    events: []
  },
  {
    id: 'thread-23',
    title: 'Accessibility Improvements',
    status: 'done',
    objective: 'Implement WCAG accessibility improvements across the site.',
    events: []
  },
  {
    id: 'thread-24',
    title: 'User Testing Analysis',
    status: 'done',
    objective: 'Analyze user testing results and implement feedback.',
    events: []
  },
  {
    id: 'thread-25',
    title: 'Content Localization',
    status: 'done',
    objective: 'Localize content for international market expansion.',
    events: []
  },
  {
    id: 'thread-26',
    title: 'SEO Technical Fixes',
    status: 'inbox',
    objective: 'Fix technical SEO issues identified in site audit.',
    events: []
  },
  {
    id: 'thread-27',
    title: 'Backlink Building Strategy',
    status: 'inbox',
    objective: 'Develop and execute backlink building strategy for authority.',
    events: []
  },
  {
    id: 'thread-28',
    title: 'Local SEO Optimization',
    status: 'inbox',
    objective: 'Optimize local SEO presence for regional targeting.',
    events: []
  },
  {
    id: 'thread-29',
    title: 'Content Repurposing Plan',
    status: 'inbox',
    objective: 'Create plan for repurposing existing content across channels.',
    events: []
  },
  {
    id: 'thread-30',
    title: 'Newsletter Performance Review',
    status: 'inbox',
    objective: 'Review and optimize newsletter performance metrics.',
    events: []
  },
  {
    id: 'thread-31',
    title: 'Social Proof Collection',
    status: 'in-progress',
    objective: 'Collect and showcase customer testimonials and case studies.',
    events: []
  },
  {
    id: 'thread-32',
    title: 'Affiliate Program Setup',
    status: 'in-progress',
    objective: 'Set up affiliate program for partner-driven growth.',
    events: []
  },
];

// KPI Stats for Mission Control Dashboard
export const missionControlStats: MissionControlStats = {
  systemHealth: 94,
  activeThreads: 29,
  pendingActions: 8,
  agentsActive: 5,
};

// Export the complete Mission Control data object
export const missionControlData: MissionControlData = {
  columns: kanbanColumns,
  items: missionControlItems,
  stats: missionControlStats,
};

// Export individual parts for flexibility
export { missionControlItems as items, kanbanColumns as columns, missionControlStats as stats };
