'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCw, 
  Wrench, 
  XCircle,
  Rocket,
  FileCheck,
  Users,
  Target
} from 'lucide-react';
import { saasLaunchOpsThreads, saasLaunchOpsMetrics } from '@/data/saasLaunchOps';

interface ConflictOption {
  id: string;
  agent: string;
  description: string;
  label: string;
}

export default function SaaSLaunchOpsPage() {
  const [selectedConflictOption, setSelectedConflictOption] = useState<string | null>(null);
  const [recoveryActions, setRecoveryActions] = useState<Record<string, 'loading' | 'success' | null>>({});

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4" />;
      case 'needs_approval':
        return <AlertTriangle className="h-4 w-4" />;
      case 'in_progress':
        return <RefreshCw className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs_attention':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      active: { variant: 'secondary' as const, label: 'Active' },
      needs_approval: { variant: 'warning' as const, label: 'Needs Approval' },
      in_progress: { variant: 'info' as const, label: 'In Progress' },
      completed: { variant: 'success' as const, label: 'Completed' },
      needs_attention: { variant: 'danger' as const, label: 'Needs Attention' },
      pending: { variant: 'neutral' as const, label: 'Pending' },
    };
    
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="h-5 w-5" />;
      case 'file-check':
        return <FileCheck className="h-5 w-5" />;
      case 'users':
        return <Users className="h-5 w-5" />;
      case 'target':
        return <Target className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const handleConflictApprove = (optionId: string) => {
    setSelectedConflictOption(optionId);
    // In a real app, this would call an API
    setTimeout(() => {
      setSelectedConflictOption(null);
    }, 2000);
  };

  const handleRecoveryAction = (action: string, threadId: string) => {
    setRecoveryActions(prev => ({ ...prev, [threadId]: action }));
    
    if (action === 'retry') {
      setTimeout(() => {
        setRecoveryActions(prev => ({ ...prev, [threadId]: 'success' }));
        setTimeout(() => {
          setRecoveryActions(prev => ({ ...prev, [threadId]: null }));
        }, 2000);
      }, 1000);
    } else if (action === 'autofix') {
      setTimeout(() => {
        setRecoveryActions(prev => ({ ...prev, [threadId]: 'success' }));
        setTimeout(() => {
          setRecoveryActions(prev => ({ ...prev, [threadId]: null }));
        }, 2000);
      }, 1500);
    }
  };

  const mockConflicts: Record<string, ConflictOption[]> = {
    'gtm-strategy': [
      { id: '1', agent: 'Product_Lead', description: 'Launch in 3 weeks with feature complete v1.0', label: 'Feature Complete' },
      { id: '2', agent: 'Marketing_Director', description: 'Delay 2 weeks for additional market research', label: 'Market Research' },
    ],
    'q1-asset-review': [
      { id: '1', agent: 'Brand_Manager', description: 'Approve current assets with minor tweaks', label: 'Approve' },
      { id: '2', agent: 'Creative_Director', description: 'Request major redesign before approval', label: 'Redesign' },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            SaaS Launch Ops
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Coordinate product launches, manage asset approvals, and align go-to-market strategies across teams.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            System Operational
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Rocket className="h-3 w-3" />
            Launch Mode
          </Badge>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {saasLaunchOpsMetrics.map((metric) => (
          <MetricStat
            key={metric.id}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
            trendDirection={metric.trendDirection}
            status={metric.status}
            icon={getMetricIcon(metric.icon)}
          />
        ))}
      </div>

      {/* Threads Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Active Launch Threads
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {saasLaunchOpsThreads.map((thread) => {
            const conflictOptions = mockConflicts[thread.id];
            const currentRecovery = recoveryActions[thread.id];
            
            return (
              <Card key={thread.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(thread.status)}
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                        {thread.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {thread.objective}
                    </p>
                  </div>
                  {getStatusBadge(thread.status)}
                </div>

                {/* Conflict Resolution Panel */}
                {conflictOptions && (
                  <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 text-warning">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">Conflict Detected</span>
                    </div>
                    <div className="space-y-2">
                      {conflictOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            selectedConflictOption === option.id
                              ? 'bg-success/10 border-success/50'
                              : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                          onClick={() => handleConflictApprove(option.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {option.label}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                              {option.agent}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {option.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recovery Actions */}
                {thread.status === 'needs_attention' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentRecovery === 'loading' ? (
                      <Button variant="secondary" size="sm" disabled>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </Button>
                    ) : currentRecovery === 'success' ? (
                      <Button variant="success" size="sm" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolved
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRecoveryAction('retry', thread.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Retry
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRecoveryAction('autofix', thread.id)}
                        >
                          <Wrench className="h-4 w-4 mr-2" />
                          Auto-Fix
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setRecoveryActions(prev => ({ ...prev, [thread.id]: 'ignored' }))}
                        >
                          Ignore
                        </Button>
                      </>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <Link
                    href={`/workspaces/[workspaceId]/modules/saas-launch-ops/${thread.id}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                  >
                    View Thread
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {thread.status === 'needs_approval' && (
                    <Button variant="primary" size="sm">
                      Review Assets
                    </Button>
                  )}
                  {thread.status === 'in_progress' && (
                    <Button variant="secondary" size="sm">
                      View Progress
                    </Button>
                  )}
                  {thread.status === 'pending' && (
                    <Button variant="outline" size="sm">
                      Start Thread
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
