'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { getWorkspace } from '@/lib/apiMock';
import { Settings as SettingsIcon, Save, ExternalLink, Shield, Zap, AlertCircle } from 'lucide-react';

interface SettingsPageProps {
  workspaceId: string;
}

export default function SettingsPage({ workspaceId }: SettingsPageProps) {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'guardrails'>('general');

  useEffect(() => {
    async function fetchWorkspace() {
      try {
        setLoading(true);
        const data = await getWorkspace(workspaceId);
        setWorkspace(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    fetchWorkspace();
  }, [workspaceId]);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 500));
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-16 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load settings</h3>
          <p className="text-muted-foreground mb-4">{error || 'Unknown error occurred'}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Workspace Settings</h1>
            <p className="text-muted-foreground">Configure your workspace preferences</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'general'
              ? 'border-primary text-foreground font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'integrations'
              ? 'border-primary text-foreground font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab('guardrails')}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeTab === 'guardrails'
              ? 'border-primary text-foreground font-medium'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Guardrails
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">General Information</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Workspace Name</label>
              <Input defaultValue={workspace.name} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Badge variant={workspace.status === 'active' ? 'success' : 'warning'}>
                {workspace.status}
              </Badge>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Workspace ID</label>
              <Input value={workspace.id} disabled />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'integrations' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Connected Services</h2>
          <div className="space-y-4">
            {[
              { name: 'OpenAI', status: 'connected', icon: '🤖' },
              { name: 'Slack', status: 'connected', icon: '💬' },
              { name: 'Google Analytics', status: 'disconnected', icon: '📊' },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <Badge variant={service.status === 'connected' ? 'success' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {service.status === 'connected' ? 'Configure' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'guardrails' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Safety & Budget Limits</h2>
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Monthly Budget Limit ($)
              </label>
              <Input type="number" defaultValue="5000" />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum spend per month on AI operations
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Approval Threshold
              </label>
              <Input type="number" defaultValue="100" />
              <p className="text-xs text-muted-foreground mt-1">
                Actions above this cost require manual approval
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content Safety Level</label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>Strict</option>
                <option selected>Moderate</option>
                <option>Permissive</option>
              </select>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}