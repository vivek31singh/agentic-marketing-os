"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getWorkspaceSettings, updateWorkspaceSettings } from '@/lib/apiMock';
import { Save, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function WorkspaceSettingsPage() {
  const params = useParams();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const data = await getWorkspaceSettings(params.workspaceId as string);
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [params.workspaceId]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      await updateWorkspaceSettings(params.workspaceId as string, settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-neutral-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-error mx-auto mb-4" />
          <p className="text-neutral-600">Failed to load settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Workspace Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your workspace configuration</p>
        </div>
        <div className="flex gap-2">
          {saveStatus === 'success' && (
            <Badge variant="success" withDot>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Saved
            </Badge>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Workspace Name</label>
              <input
                type="text"
                value={settings.general.name}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, name: e.target.value }
                })}
                className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Status</label>
              <select
                value={settings.general.status}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, status: e.target.value }
                })}
                className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="active">Active</option>
                <option value="idle">Idle</option>
                <option value="error">Error</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.integrations.map((integration: any) => (
              <div key={integration.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{integration.name}</p>
                  <p className="text-xs text-neutral-500">{integration.status}</p>
                </div>
                <Badge variant={integration.status === 'Connected' ? 'success' : 'neutral'} size="sm">
                  {integration.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Add Integration
            </Button>
          </CardContent>
        </Card>

        {/* Guardrails */}
        <Card>
          <CardHeader>
            <CardTitle>Guardrails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Budget Limit ($)</label>
              <input
                type="number"
                value={settings.guardrails.budgetLimit}
                onChange={(e) => setSettings({
                  ...settings,
                  guardrails: { ...settings.guardrails, budgetLimit: parseInt(e.target.value) }
                })}
                className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Approval Threshold</label>
              <select
                value={settings.guardrails.approvalThreshold}
                onChange={(e) => setSettings({
                  ...settings,
                  guardrails: { ...settings.guardrails, approvalThreshold: e.target.value }
                })}
                className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">Auto-Approve Low Risk</span>
              <input
                type="checkbox"
                checked={settings.guardrails.autoApproveLowRisk}
                onChange={(e) => setSettings({
                  ...settings,
                  guardrails: { ...settings.guardrails, autoApproveLowRisk: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}