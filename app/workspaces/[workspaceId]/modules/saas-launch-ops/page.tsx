'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricStat } from '@/components/ui/MetricStat';
import { Tag } from '@/components/ui/Tag';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { CheckCircle2, AlertCircle, Rocket, FileCheck, Clock, RefreshCw, Wand2, XCircle } from 'lucide-react';
import { saasLaunchOpsThreads, saasLaunchOpsMetrics } from '@/data/saasLaunchOps';

interface ThreadCardProps {
  thread: typeof saasLaunchOpsThreads[0];
}

function ThreadCard({ thread }: ThreadCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [approvedOptionId, setApprovedOptionId] = useState<string | null>(null);

  const [retryLoading, setRetryLoading] = useState(false);
  const [autoFixLoading, setAutoFixLoading] = useState(false);
  const [ignoreLoading, setIgnoreLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'retry' | 'autofix' | 'ignore' | null; message: string }>({ type: null, message: '' });

  const handleApprove = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsApproving(true);
    setActionFeedback({ type: null, message: '' });

    setTimeout(() => {
      setApprovedOptionId(optionId);
      setIsApproving(false);
    }, 1000);
  };

  const handleRetry = () => {
    setRetryLoading(true);
    setActionFeedback({ type: null, message: '' });
    setTimeout(() => {
      setRetryLoading(false);
      setActionFeedback({ type: 'retry', message: 'Retry initiated' });
    }, 800);
  };

  const handleAutoFix = () => {
    setAutoFixLoading(true);
    setActionFeedback({ type: null, message: '' });
    setTimeout(() => {
      setAutoFixLoading(false);
      setActionFeedback({ type: 'autofix', message: 'Auto-fix applied successfully' });
    }, 1200);
  };

  const handleIgnore = () => {
    setIgnoreLoading(true);
    setActionFeedback({ type: null, message: '' });
    setTimeout(() => {
      setIgnoreLoading(false);
      setActionFeedback({ type: 'ignore', message: 'Issue marked as ignored' });
    }, 600);
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${thread.status === 'active' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'}`}>
            {thread.status === 'active' ? <Rocket className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">{thread.title}</h3>
            <p className="text-sm text-neutral-500">{thread.objective}</p>
          </div>
        </div>
        <Badge variant={thread.status === 'active' ? 'success' : 'neutral'}>
          {thread.status}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {thread.tags.map((tag) => (
          <Tag key={tag} variant="outline">
            {tag}
          </Tag>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Clock className="w-4 h-4" />
          <span>{thread.timeToLaunch} to launch</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <FileCheck className="w-4 h-4" />
          <span>{thread.pendingApprovals} pending approvals</span>
        </div>
      </div>

      {thread.conflict && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800 mb-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Conflict Resolution Required</span>
          </div>
          <p className="text-sm text-amber-700 mb-3">{thread.conflict.reason}</p>
          
          {!approvedOptionId ? (
            <div className="space-y-2">
              {thread.conflict.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedOptionId === option.id
                      ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-amber-200 bg-white hover:bg-amber-50'
                  }`}
                  onClick={() => !isApproving && handleApprove(option.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{option.agent}</Badge>
                        <span className="font-medium text-sm text-neutral-900">{option.label}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{option.description}</p>
                    </div>
                    {selectedOptionId === option.id && !approvedOptionId && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(option.id);
                        }}
                        disabled={isApproving}
                      >
                        {isApproving ? 'Approving...' : 'Approve'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-700 bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Option approved successfully</span>
            </div>
          )}
        </div>
      )}

      {thread.hasError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 mb-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Recovery Action Required</span>
          </div>
          <p className="text-sm text-red-700 mb-3">
            Asset validation failed. Missing required metadata fields.
          </p>
          
          {actionFeedback.type && (
            <div className={`mb-3 p-2 rounded text-sm ${
              actionFeedback.type === 'ignore' 
                ? 'bg-neutral-100 text-neutral-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {actionFeedback.message}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetry}
              disabled={retryLoading || autoFixLoading || ignoreLoading}
            >
              {retryLoading ? (
                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Retrying...</>
              ) : (
                <><RefreshCw className="w-4 h-4 mr-2" /> Retry</>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAutoFix}
              disabled={retryLoading || autoFixLoading || ignoreLoading}
            >
              {autoFixLoading ? (
                <><Wand2 className="w-4 h-4 mr-2 animate-pulse" /> Fixing...</>
              ) : (
                <><Wand2 className="w-4 h-4 mr-2" /> Auto-Fix</>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleIgnore}
              disabled={retryLoading || autoFixLoading || ignoreLoading}
            >
              {ignoreLoading ? (
                'Ignoring...'
              ) : (
                <><XCircle className="w-4 h-4 mr-2" /> Ignore</>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <ProgressBar value={thread.progress} className="flex-1 mr-4" />
        <span className="text-sm font-medium text-neutral-700">{thread.progress}%</span>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {thread.agents.map((agent) => (
              <Avatar
                key={agent.id}
                src={agent.avatar}
                alt={agent.name}
                size="sm"
                className="border-2 border-white"
              />
            ))}
          </div>
          <Button size="sm" variant="outline">
            View Thread
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function SaasLaunchOpsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">SaaS Launch Ops</h1>
          <p className="text-neutral-600">Manage product launches and go-to-market strategies</p>
        </div>
        <Badge variant="success" withDot>Module Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricStat
          label="Launch Readiness"
          value={saasLaunchOpsMetrics.launchReadiness}
          trend="+8%"
          trendUp={true}
          icon={<Rocket className="w-5 h-5" />}
        />
        <MetricStat
          label="Asset Approval Queue"
          value={saasLaunchOpsMetrics.approvalQueue}
          trend="-2 items"
          trendUp={true}
          icon={<FileCheck className="w-5 h-5" />}
        />
        <MetricStat
          label="Active Campaigns"
          value={saasLaunchOpsMetrics.activeCampaigns}
          trend="+1 new"
          trendUp={true}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Active Threads</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {saasLaunchOpsThreads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </div>
  );
}
