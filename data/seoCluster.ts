// SEO Cluster specific mock data

export interface SEOThread {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'critical';
  objective: string;
  agent: string;
  lastUpdated: string;
  progress: number;
}

export interface SEOMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  status: 'healthy' | 'warning' | 'critical' | 'neutral';
}

export interface SEOAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

// SEO Metrics Data
export const mockSEOMetrics: SEOMetric[] = [
  {
    id: 'crawl-health',
    label: 'Crawl Health',
    value: 94,
    change: '+2.5%',
    trend: 'up',
    status: 'healthy'
  },
  {
    id: 'indexed-pages',
    label: 'Indexed Pages',
    value: '12,847',
    change: '+156',
    trend: 'up',
    status: 'healthy'
  },
  {
    id: 'site-speed',
    label: 'Avg Load Time',
    value: '1.8s',
    change: '-0.3s',
    trend: 'up',
    status: 'healthy'
  },
  {
    id: 'core-web-vitals',
    label: 'Core Web Vitals',
    value: '98%',
    change: '-1%',
    trend: 'down',
    status: 'warning'
  },
  {
    id: 'organic-traffic',
    label: 'Organic Traffic',
    value: '45.2K',
    change: '+12.3%',
    trend: 'up',
    status: 'healthy'
  },
  {
    id: 'keyword-rankings',
    label: 'Top 10 Keywords',
    value: 234,
    change: '+18',
    trend: 'up',
    status: 'healthy'
  }
];

// SEO Active Threads Data
export const mockSEOThreads: SEOThread[] = [
  {
    id: 'seo-thread-001',
    title: 'Crawl Budget Optimization',
    status: 'active',
    priority: 'high',
    objective: 'Optimize crawl budget by identifying and fixing crawl traps, reducing unnecessary parameters, and prioritizing high-value pages.',
    agent: 'Crawl_Spider_Agent',
    lastUpdated: '2 min ago',
    progress: 67
  },
  {
    id: 'seo-thread-002',
    title: 'Schema Markup Audit',
    objective: 'Audit and implement structured data markup for product pages, articles, and local business information.',
    agent: 'Schema_Agent',
    lastUpdated: '15 min ago',
    progress: 45,
    status: 'active',
    priority: 'medium'
  },
  {
    id: 'seo-thread-003',
    title: 'Internal Linking Strategy',
    objective: 'Develop and execute an internal linking strategy to distribute page authority and improve topical relevance.',
    agent: 'Link_Architect_Agent',
    lastUpdated: '1 hour ago',
    progress: 23,
    status: 'active',
    priority: 'medium'
  },
  {
    id: 'seo-thread-004',
    title: 'Core Web Vitals Remediation',
    objective: 'Address LCP, FID, and CLS issues identified in PageSpeed Insights reports.',
    agent: 'Performance_Agent',
    lastUpdated: '3 hours ago',
    progress: 89,
    status: 'pending',
    priority: 'critical'
  },
  {
    id: 'seo-thread-005',
    title: 'Content Gap Analysis',
    objective: 'Analyze competitor content strategies and identify keyword gaps to guide new content creation.',
    agent: 'Content_Research_Agent',
    lastUpdated: '5 hours ago',
    progress: 12,
    status: 'active',
    priority: 'low'
  },
  {
    id: 'seo-thread-006',
    title: 'Technical SEO Audit',
    objective: 'Comprehensive technical audit covering sitemap, robots.txt, canonical tags, and hreflang implementation.',
    agent: 'Tech_Lead_Agent',
    lastUpdated: '1 day ago',
    progress: 100,
    status: 'completed',
    priority: 'high'
  }
];

// SEO Alerts Data
export const mockSEOAlerts: SEOAlert[] = [
  {
    id: 'alert-001',
    type: 'error',
    message: 'Critical: 404 errors increased by 23% in the last 24 hours',
    timestamp: '10 min ago'
  },
  {
    id: 'alert-002',
    type: 'warning',
    message: 'Warning: Googlebot encountered 5xx errors on /blog/* pages',
    timestamp: '45 min ago'
  },
  {
    id: 'alert-003',
    type: 'info',
    message: 'Info: New sitemap submitted successfully',
    timestamp: '2 hours ago'
  },
  {
    id: 'alert-004',
    type: 'warning',
    message: 'Warning: Core Web Vitals passing rate dropped below 90%',
    timestamp: '3 hours ago'
  }
];

// Module metadata
export const seoClusterModuleInfo = {
  id: 'SEO_Cluster',
  name: 'SEO Cluster',
  description: 'Technical SEO operations, crawl management, and search performance optimization',
  activeThreadsCount: 5,
  healthScore: 92,
  lastSync: 'Just now'
};
