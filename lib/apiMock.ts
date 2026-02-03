// Mock API Layer - Simulates async data fetching with delays

import { 
  mockWorkspaces, 
  mockModules, 
  type Workspace, 
  type Module, 
  type Thread, 
  type Event,
  type Agent 
} from '@/data/mockData';
import { mockMissionControlData } from '@/data/missionControl';
import { mockSEOThreads, mockSEOMetrics } from '@/data/seoCluster';
import { mockContentThreads, mockContentMetrics } from '@/data/contentFactory';
import { mockSocialThreads, mockSocialMetrics } from '@/data/socialGrowth';
import { mockSaaSThreads, mockSaaSMetrics } from '@/data/saasLaunchOps';
import { mockWorkspaceSettings } from '@/data/workspaceSettings';

// Simulated delay for API calls (ms)
const API_DELAY = 800;

/**
 * Simulates a network delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get workspace by ID
 */
export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  await delay(API_DELAY);
  
  const workspace = mockWorkspaces.find(w => w.id === workspaceId);
  
  if (!workspace) {
    throw new Error(`Workspace with ID ${workspaceId} not found`);
  }
  
  return workspace;
}

/**
 * Get all workspaces
 */
export async function getWorkspaces(): Promise<Workspace[]> {
  await delay(API_DELAY);
  return mockWorkspaces;
}

/**
 * Get module data for a specific workspace
 */
export async function getModule(workspaceId: string, moduleSlug: string): Promise<{
  module: Module;
  threads: Thread[];
  metrics: any[];
}> {
  await delay(API_DELAY);
  
  const module = mockModules.find(m => m.slug === moduleSlug);
  
  if (!module) {
    throw new Error(`Module ${moduleSlug} not found`);
  }
  
  let threads: Thread[] = [];
  let metrics: any[] = [];
  
  // Return module-specific data
  switch (moduleSlug) {
    case 'seo-cluster':
      threads = mockSEOThreads;
      metrics = mockSEOMetrics;
      break;
    case 'content-factory':
      threads = mockContentThreads;
      metrics = mockContentMetrics;
      break;
    case 'social-growth':
      threads = mockSocialThreads;
      metrics = mockSocialMetrics;
      break;
    case 'saas-launch-ops':
      threads = mockSaaSThreads;
      metrics = mockSaaSMetrics;
      break;
    default:
      threads = [];
      metrics = [];
  }
  
  return { module, threads, metrics };
}

/**
 * Get thread detail by thread ID
 */
export async function getThread(threadId: string): Promise<Thread> {
  await delay(API_DELAY);
  
  // Search across all module thread collections
  const allThreads = [
    ...mockSEOThreads,
    ...mockContentThreads,
    ...mockSocialThreads,
    ...mockSaaSThreads
  ];
  
  const thread = allThreads.find(t => t.id === threadId);
  
  if (!thread) {
    throw new Error(`Thread with ID ${threadId} not found`);
  }
  
  return thread;
}

/**
 * Get Mission Control dashboard data
 */
export async function getMissionControlData(workspaceId: string) {
  await delay(API_DELAY);
  return mockMissionControlData;
}

/**
 * Post a command to a thread (simulated)
 */
export async function postCommand(threadId: string, command: string): Promise<Event> {
  await delay(API_DELAY);
  
  const newEvent: Event = {
    id: `evt_${Date.now()}`,
    type: 'message',
    timestamp: new Date().toISOString(),
    agent: {
      id: 'user',
      name: 'User',
      role: 'Administrator',
      avatar: '',
      metrics: { accuracy: 100, latency: 0 }
    },
    content: command,
    meta: { source: 'user_input' }
  };
  
  return newEvent;
}

/**
 * Get workspace settings
 */
export async function getWorkspaceSettings(workspaceId: string) {
  await delay(API_DELAY);
  return mockWorkspaceSettings;
}

/**
 * Update workspace settings (simulated)
 */
export async function updateWorkspaceSettings(workspaceId: string, settings: any) {
  await delay(API_DELAY);
  return { success: true, settings };
}