'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';
import { ArrowRight, AlertTriangle, CheckCircle, Clock, RefreshCw, Wrench, XCircle } from 'lucide-react';
import { contentThreads, contentFactoryMetrics } from '@/data/contentFactory';

interface ConflictOption {
  id: string;
  agent: string;
  description: string;
  outcome: string;
}

interface Conflict {
  id: string;
  reason: string;
  options: ConflictOption[];
}

interface RecoveryAction {
  type: 'retry' | 'autofix' | 'ignore';
  label: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export default function ContentFactoryPage() {
  const [selectedConflicts, setSelectedConflicts] = useState<Record<string, string>>({});
  const [recoveryStates, setRecoveryStates] = useState<Record<string, RecoveryAction>>({});

  const handleConflictApprove = (threadId: string, optionId: string) => {
    setSelectedConflicts((prev) => ({
      ...prev,
      [threadId]: optionId,
    }));
  };

  const handleRecoveryAction = async (threadId: string, actionType: 'retry' | 'autofix' | 'ignore') => {
    // Set loading state
    setRecoveryStates((prev) => ({
      ...prev,
      [threadId]: {
        type: actionType,
        label: actionType === 'retry' ? 'Retry' : actionType === 'autofix' ? 'Auto-Fix' : 'Ignore',
        status: 'loading',
      },
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Set success state
    setRecoveryStates((prev) => ({
      ...prev,
      [threadId]: {
        type: actionType,
        label: actionType === 'retry' ? 'Retried' : actionType === 'autofix' ? 'Fixed' : 'Ignored',
        status: 'success',
      },
    }));

    // Reset after 2 seconds
    setTimeout(() => {
      setRecoveryStates((prev) => {
        const newState = { ...prev };
        delete newState[threadId];
        return newState;
      });
    }, 2000);
  };

  const getRecoveryButton = (threadId: string, actionType: 'retry' | 'autofix' | 'ignore') => {
    const state = recoveryStates[threadId];
    const isActive = state?.type === actionType;

    if (isActive && state.status === 'loading') {
      return (
        <Button variant="outline" size="sm" disabled className="opacity-70">
          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          {state.label}...
        </Button>
      );
    }

    if (isActive && state.status === 'success') {
      return (
        <Button variant="success" size="sm" disabled>
          <CheckCircle className="w-4 h-4 mr-2" />
          {state.label}
        </Button>
      );
    }

    const icons = {
      retry: <RefreshCw className="w-4 h-4 mr-2" />,
      autofix: <Wrench className="w-4 h-4 mr-2" />,
      ignore: <XCircle className="w-4 h-4 mr-2" />,
    };

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleRecoveryAction(threadId, actionType)}
      >
        {icons[actionType]}
        {actionType === 'retry' ? 'Retry' : actionType === 'autofix' ? 'Auto-Fix' : 'Ignore'}
      </Button>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Content Factory</h1>
          <p className="text-neutral-500 mt-1">Manage content production, approval workflows, and publishing pipelines</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricStat
          label="Content Velocity"
          value={contentFactoryMetrics.contentVelocity.current}
          change={contentFactoryMetrics.contentVelocity.current - contentFactoryMetrics.contentVelocity.target}
        />
        <MetricStat
          label="Pending Approval"
          value={contentFactoryMetrics.pendingApproval}
          change={0}
        />
        <MetricStat
          label="Articles Published"
          value={contentFactoryMetrics.articlesPublished}
          change={5}
        />
        <MetricStat
          label="Active Writers"
          value={contentFactoryMetrics.activeWriters}
          change={1}
        />
      </div>

      {/* Active Threads */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">Active Threads</h2>
        <div className="grid grid-cols-1 gap-4">
          {contentThreads.map((thread) => {
            const selectedOptionId = selectedConflicts[thread.id];
            const selectedOption = thread.conflict?.options.find((opt) => opt.id === selectedOptionId);
            const hasConflict = thread.conflict !== undefined;
            const hasError = thread.status === 'error';

            return (
              <Card key={thread.id} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-neutral-900">{thread.title}</h3>
                      <Badge
                        variant={
                          thread.status === 'active'
                            ? 'success'
                            : thread.status === 'error'
                              ? 'error'
                              : 'default'
                        }
                      >
                        {thread.status}
                      </Badge>
                      {hasConflict && (
                        <Badge variant="warning">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Conflict
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500">{thread.objective}</p>
                  </div>
                  <Link href={`/workspaces/demo/modules/content-factory/${thread.id}`}>
                    <Button variant="ghost" size="sm">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Conflict Resolution Section */}
                {hasConflict && thread.conflict && (
                  <div className="mt-4 p-4 bg-warning-50 rounded-lg border border-warning-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-warning-600" />
                      <span className="text-sm font-medium text-warning-900">Conflict Detected</span>
                    </div>
                    <p className="text-sm text-warning-800 mb-3">{thread.conflict.reason}</p>

                    {selectedOption ? (
                      <div className="bg-success-50 border border-success-200 rounded-md p-3">
                        <div className="flex items-center gap-2 text-success-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Resolved: {selectedOption.agent.name}&apos;s option selected</span>
                        </div>
                        <p className="text-xs text-success-600 mt-1">{selectedOption.outcome}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {thread.conflict.options.map((option) => {
                          const isSelected = selectedOptionId === option.id;
                          return (
                            <div
                              key={option.id}
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${isSelected
                                ? 'bg-primary-50 border-primary-300'
                                : 'bg-white border-neutral-200 hover:border-neutral-300'
                                }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-neutral-900">{option.agent.name}</span>
                                  {isSelected && (
                                    <Badge variant="primary">Selected</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-neutral-600">{option.description}</p>
                              </div>
                              <Button
                                variant={isSelected ? 'primary' : 'outline'}
                                size="sm"
                                onClick={() => handleConflictApprove(thread.id, option.id)}
                                disabled={isSelected}
                              >
                                {isSelected ? 'Approved' : 'Approve'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Recovery Actions Section */}
                {hasError && (
                  <div className="mt-4 p-4 bg-error-50 rounded-lg border border-error-200">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-4 h-4 text-error-600" />
                      <span className="text-sm font-medium text-error-900">Action Required</span>
                    </div>
                    <p className="text-sm text-error-800 mb-3">{thread.errorMessage || 'An error occurred during processing.'}</p>
                    <div className="flex items-center gap-2">
                      {getRecoveryButton(thread.id, 'retry')}
                      {getRecoveryButton(thread.id, 'autofix')}
                      {getRecoveryButton(thread.id, 'ignore')}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
