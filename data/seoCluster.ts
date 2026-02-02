import { Thread, Metric } from './mockData';

export const mockSEOMetrics: Metric[] = [
  {
    id: 'seo-metric-1',
    label: 'Crawl Health',
    value: 94,
    trend: '+2.4%',
    status: 'success',
  },
  {
    id: 'seo-metric-2',
    label: 'Indexed Pages',
    value: 12450,
    trend: '+18%',
    status: 'success',
  },
  {
    id: 'seo-metric-3',
    label: 'Technical Issues',
    value: 12,
    trend: '-3',
    status: 'warning',
  },
  {
    id: 'seo-metric-4',
    label: 'Critical Errors',
    value: 2,
    trend: '0',
    status: 'error',
  },
];

export const mockSEOThreads: Thread[] = [
  {
    id: 'seo-thread-1',
    title: 'Crawl Budget Optimization',
    status: 'active',
    objective: 'Analyze and optimize crawl budget for high-priority pages',
    events: [],
  },
  {
    id: 'seo-thread-2',
    title: 'Duplicate Content Audit',
    status: 'pending',
    objective: 'Identify and resolve duplicate content issues across the site',
    events: [],
  },
  {
    id: 'seo-thread-3',
    title: 'Core Web Vitals Enhancement',
    status: 'error',
    objective: 'Improve LCP, FID, and CLS scores for mobile pages',
    events: [],
  },
];
