import { Workspace, Module, Thread, Agent, Event } from '@/data/mockData';
import workspaces from '@/data/mockData';
import missionControlData from '@/data/missionControl';
import { mockSEOThreads, mockSEOMetrics } from '@/data/seoCluster';
import { contentThreads, contentMetrics } from '@/data/contentFactory';
import { socialThreads, socialMetrics } from '@/data/socialGrowth';
import { saasThreads, saasMetrics } from '@/data/saasLaunchOps';

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between min and max milliseconds
const randomDelay = (min: number = 800, max: number = 1500) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return delay(ms);
};

/**
 * Fetches a workspace by ID
 * @param id - The workspace identifier
 * @returns Promise resolving to the Workspace object
 */
export async function getWorkspace(id: string): Promise<Workspace> {
  await randomDelay(800, 1200);
  const workspace = workspaces.workspaces.find(w => w.id === id);
  
  if (!workspace) {
    throw new Error(`Workspace with id "${id}" not found`);
  }
  
  return workspace;
}

/**
 * Fetches a module by ID
 * @param id - The module identifier
 * @returns Promise resolving to the Module object with additional metadata
 */
export async function getModule(id: string): Promise<Module & { metrics?: any; threads?: Thread[] }> {
  await randomDelay(900, 1400);
  
  // Find the module in mockData
  const module = workspaces.workspaces[0]?.modules.find(m => m.id === id);
  
  if (!module) {
    throw new Error(`Module with id "${id}" not found`);
  }

  // Add module-specific data based on the module ID
  let moduleData: any = { ...module };
  
  switch (id) {
    case 'SEO_Cluster':
      moduleData.metrics = mockSEOMetrics;
      moduleData.threads = mockSEOThreads;
      break;
    case 'Content_Factory':
      moduleData.metrics = contentMetrics;
      moduleData.threads = contentThreads;
      break;
    case 'Social_Growth':
      moduleData.metrics = socialMetrics;
      moduleData.threads = socialThreads;
      break;
    case 'SaaS_Launch_Ops':
      moduleData.metrics = saasMetrics;
      moduleData.threads = saasThreads;
      break;
    default:
      // Generic module data
      moduleData.metrics = {};
      moduleData.threads = [];
  }
  
  return moduleData;
}

/**
 * Fetches a thread by ID
 * @param id - The thread identifier
 * @returns Promise resolving to the Thread object
 */
export async function getThread(id: string): Promise<Thread> {
  await randomDelay(1000, 1500);
  
  // Search for the thread across all module data
  const allThreads = [
    ...mockSEOThreads,
    ...contentThreads,
    ...socialThreads,
    ...saasThreads
  ];
  
  const thread = allThreads.find(t => t.id === id);
  
  if (!thread) {
    throw new Error(`Thread with id "${id}" not found`);
  }
  
  return thread;
}

/**
 * Posts a command to a thread
 * @param threadId - The thread identifier
 * @param text - The command text to post
 * @returns Promise resolving to the updated Thread object
 */
export async function postCommand(threadId: string, text: string): Promise<Thread> {
  await randomDelay(500, 1000);
  
  // Create a mock user agent
  const userAgent: Agent = {
    id: 'user-001',
    name: 'You',
    role: 'User',
    avatar: '👤',
    metrics: {
      accuracy: 100,
      latency: 0
    }
  };
  
  // Create a new message event
  const newEvent: Event = {
    type: 'message',
    timestamp: new Date().toISOString(),
    agent: userAgent,
    content: text,
    meta: {
      source: 'user_command'
    }
  };
  
  // Get the current thread and add the new event
  const thread = await getThread(threadId);
  thread.events = [...thread.events, newEvent];
  
  return thread;
}

/**
 * Fetches mission control data for a workspace
 * @param workspaceId - The workspace identifier
 * @returns Promise resolving to mission control data
 */
export async function getMissionControlData(workspaceId: string) {
  await randomDelay(800, 1300);
  return missionControlData;
}

/**
 * Fetches all available workspaces
 * @returns Promise resolving to array of workspaces
 */
export async function getWorkspaces(): Promise<Workspace[]> {
  await randomDelay(600, 1000);
  return workspaces.workspaces;
}
