// Workspace Settings Mock Data

export interface Integration {
  id: string;
  name: string;
  type: 'llm' | 'communication' | 'analytics' | 'storage';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config?: Record<string, string>;
}

export interface Guardrail {
  id: string;
  name: string;
  type: 'budget' | 'approval' | 'rate_limit';
  value: number;
  unit: string;
  threshold?: number;
  enabled: boolean;
}

export interface WorkspaceSettings {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'maintenance';
  createdAt: string;
  updatedAt: string;
  integrations: Integration[];
  guardrails: Guardrail[];
}

export const workspaceSettings: WorkspaceSettings = {
  id: 'ws-techstart',
  name: 'TechStart Marketing',
  status: 'active',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-03-20T14:30:00Z',
  integrations: [
    {
      id: 'int-openai',
      name: 'OpenAI',
      type: 'llm',
      status: 'connected',
      lastSync: '2024-03-20T14:25:00Z',
      config: {
        model: 'gpt-4-turbo',
        apiVersion: 'v1'
      }
    },
    {
      id: 'int-slack',
      name: 'Slack',
      type: 'communication',
      status: 'connected',
      lastSync: '2024-03-20T14:20:00Z',
      config: {
        channel: '#agent-notifications',
        workspace: 'techstart'
      }
    },
    {
      id: 'int-ga',
      name: 'Google Analytics',
      type: 'analytics',
      status: 'error',
      lastSync: '2024-03-19T09:15:00Z'
    },
    {
      id: 'int-aws',
      name: 'AWS S3',
      type: 'storage',
      status: 'disconnected',
      config: {
        bucket: 'techstart-assets'
      }
    },
    {
      id: 'int-notion',
      name: 'Notion',
      type: 'communication',
      status: 'connected',
      lastSync: '2024-03-20T14:28:00Z',
      config: {
        database: 'Content Calendar'
      }
    }
  ],
  guardrails: [
    {
      id: 'gr-monthly-budget',
      name: 'Monthly API Budget',
      type: 'budget',
      value: 500,
      unit: 'USD',
      threshold: 80,
      enabled: true
    },
    {
      id: 'gr-approval-threshold',
      name: 'Approval Threshold',
      type: 'approval',
      value: 1000,
      unit: 'tokens',
      enabled: true
    },
    {
      id: 'gr-rate-limit',
      name: 'Rate Limit',
      type: 'rate_limit',
      value: 100,
      unit: 'requests/min',
      threshold: 90,
      enabled: true
    },
    {
      id: 'gr-content-length',
      name: 'Max Content Length',
      type: 'approval',
      value: 2000,
      unit: 'words',
      enabled: false
    },
    {
      id: 'gr-daily-operations',
      name: 'Daily Operations Limit',
      type: 'rate_limit',
      value: 5000,
      unit: 'operations',
      threshold: 85,
      enabled: true
    }
  ]
};
