'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Settings,
  Save,
  Plug,
  Shield,
  Info,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Link2,
  DollarSign,
  Clock,
  Zap
} from 'lucide-react';
import { workspaceSettings } from '@/data/workspaceSettings';
import type { Integration, Guardrail } from '@/data/workspaceSettings';

export default function WorkspaceSettingsPage() {
  const [settings, setSettings] = useState(workspaceSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage(null);

    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({ type: 'success', text: 'Settings saved successfully' });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 1000);
  };

  const toggleGuardrail = (id: string) => {
    setSettings({
      ...settings,
      guardrails: settings.guardrails.map(gr =>
        gr.id === id ? { ...gr, enabled: !gr.enabled } : gr
      )
    });
  };

  const updateGuardrailValue = (id: string, value: number) => {
    setSettings({
      ...settings,
      guardrails: settings.guardrails.map(gr =>
        gr.id === id ? { ...gr, value } : gr
      )
    });
  };

  const getIntegrationStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-neutral-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-error" />;
    }
  };

  const getIntegrationStatusBadge = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="default">Disconnected</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Workspace Settings</h1>
            <p className="text-sm text-neutral-500">
              Manage your workspace configuration, integrations, and guardrails
            </p>
          </div>
        </div>
        {saveMessage && (
          <div className={`px-4 py-2 rounded-lg text-sm ${saveMessage.type === 'success'
              ? 'bg-success/10 text-success'
              : 'bg-error/10 text-error'
            }`}>
            {saveMessage.text}
          </div>
        )}
      </div>

      {/* General Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">General Information</h2>
            <p className="text-sm text-neutral-500">Basic workspace details and status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Workspace Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Status</label>
            <select
              value={settings.status}
              onChange={(e) => setSettings({ ...settings, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-900 bg-white"
            >
              <option value="active">Active</option>
              <option value="idle">Idle</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Created</label>
            <div className="px-4 py-2 bg-neutral-50 rounded-lg text-sm text-neutral-600">
              {new Date(settings.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Last Updated</label>
            <div className="px-4 py-2 bg-neutral-50 rounded-lg text-sm text-neutral-600">
              {new Date(settings.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Integrations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plug className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Integrations</h2>
              <p className="text-sm text-neutral-500">Connected services and tools</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Add Integration
          </Button>
        </div>

        <div className="space-y-3">
          {settings.integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-neutral-100 rounded-lg">
                  {integration.type === 'llm' && <Zap className="w-5 h-5 text-neutral-600" />}
                  {integration.type === 'communication' && <Link2 className="w-5 h-5 text-neutral-600" />}
                  {integration.type === 'analytics' && <Clock className="w-5 h-5 text-neutral-600" />}
                  {integration.type === 'storage' && <DollarSign className="w-5 h-5 text-neutral-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-neutral-900">{integration.name}</h3>
                    {getIntegrationStatusIcon(integration.status)}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-neutral-500 uppercase">{integration.type}</span>
                    {integration.lastSync && (
                      <span className="text-xs text-neutral-400">
                        Synced: {new Date(integration.lastSync).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getIntegrationStatusBadge(integration.status)}
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Guardrails */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Guardrails</h2>
              <p className="text-sm text-neutral-500">Budget limits and approval thresholds</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Add Guardrail
          </Button>
        </div>

        <div className="space-y-3">
          {settings.guardrails.map((guardrail) => (
            <div
              key={guardrail.id}
              className={`p-4 border rounded-lg transition-colors ${guardrail.enabled
                  ? 'border-neutral-200 bg-white'
                  : 'border-neutral-100 bg-neutral-50 opacity-60'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-neutral-900">{guardrail.name}</h3>
                    <Badge variant="default">{guardrail.type}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-neutral-600">Value:</label>
                      <input
                        type="number"
                        value={guardrail.value}
                        onChange={(e) => updateGuardrailValue(guardrail.id, parseInt(e.target.value))}
                        disabled={!guardrail.enabled}
                        className="w-24 px-3 py-1.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-900 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-neutral-500">{guardrail.unit}</span>
                    </div>
                    {guardrail.threshold && (
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span>Alert at</span>
                        <Badge variant="warning">{guardrail.threshold}%</Badge>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`relative w-10 h-5 rounded-full transition-colors ${guardrail.enabled ? 'bg-primary' : 'bg-neutral-300'
                      }`}>
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${guardrail.enabled ? 'translate-x-5' : ''
                        }`} />
                    </div>
                    <input
                      type="checkbox"
                      checked={guardrail.enabled}
                      onChange={() => toggleGuardrail(guardrail.id)}
                      className="sr-only"
                    />
                    <span className="text-sm text-neutral-600">
                      {guardrail.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
