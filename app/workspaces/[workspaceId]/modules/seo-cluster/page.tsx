'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricStat } from '@/components/ui/MetricStat';
import { mockSEOThreads, mockSEOMetrics } from '@/data/seoCluster';
import { ChevronRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ConflictState {
  threadId: string;
  selectedOption: string | null;
  isResolved: boolean;
}

interface RecoveryState {
  threadId: string;
  action: 'retry' | 'autofix' | 'ignore' | null;
  status: 'idle' | 'loading' | 'success';
}

export default function SEOClusterPage({ params }: { params: { workspaceId: string } }) {
  const [conflictStates, setConflictStates] = useState<Record<string, ConflictState>>({});
  const [recoveryStates, setRecoveryStates] = useState<Record<string, RecoveryState>>({});

  const handleResolveConflict = (threadId: string, optionLabel: string) => {
    setConflictStates((prev: Record<string, ConflictState>) => ({
      ...prev,
      [threadId]: { threadId, selectedOption: optionLabel, isResolved: true },
    }));
  };

  const handleRecoveryAction = (threadId: string, action: 'retry' | 'autofix' | 'ignore') => {
    setRecoveryStates((prev: Record<string, RecoveryState>) => ({
      ...prev,
      [threadId]: { threadId, action, status: 'loading' },
    }));

    // Simulate async action
    setTimeout(() => {
      setRecoveryStates((prev: Record<string, RecoveryState>) => ({
        ...prev,
        [threadId]: { threadId, action, status: 'success' },
      }));
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'success':
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string): "default" | "primary" | "success" | "warning" | "error" | "outline" | "ghost" => {
    switch (status) {
      case 'active':
        return 'primary';
      case 'success':
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Cluster</h1>
          <p className="text-gray-600 mt-1">Monitor and optimize your search engine performance</p>
        </div>
        <Button variant="primary">Run SEO Audit</Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockSEOMetrics.map((metric) => (
          <MetricStat key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Active Threads</h2>
        <div className="grid gap-4">
          {mockSEOThreads.map((thread) => {
            const conflictState = conflictStates[thread.id];
            const recoveryState = recoveryStates[thread.id];

            return (
              <Card key={thread.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(thread.status)}
                      <Link
                        href={`/workspaces/${params.workspaceId}/modules/seo-cluster/${thread.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600"
                      >
                        {thread.title}
                      </Link>
                      <Badge variant={getStatusBadgeVariant(thread.status)}>{thread.status}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{thread.objective}</p>
                    
                    {/* Recovery Actions for Error Status */}
                    {thread.status === 'error' && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-800">Action Required</p>
                          {recoveryState?.status === 'success' ? (
                            <p className="text-sm text-green-600">
                              {recoveryState.action === 'retry' && 'Retry successful - issue resolved'}
                              {recoveryState.action === 'autofix' && 'Auto-fix applied successfully'}
                              {recoveryState.action === 'ignore' && 'Issue ignored - monitoring'}
                            </p>
                          ) : recoveryState?.status === 'loading' ? (
                            <p className="text-sm text-gray-600">Processing...</p>
                          ) : (
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRecoveryAction(thread.id, 'retry')}
                              >
                                Retry
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRecoveryAction(thread.id, 'autofix')}
                              >
                                Auto-Fix
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRecoveryAction(thread.id, 'ignore')}
                              >
                                Ignore
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/workspaces/${params.workspaceId}/modules/seo-cluster/${thread.id}`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
