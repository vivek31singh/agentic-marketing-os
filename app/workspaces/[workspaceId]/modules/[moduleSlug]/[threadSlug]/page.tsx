import React from 'react';
import { Thread } from '@/data/mockData';
import { getThreadBySlug, sampleThread } from '@/data/threadData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ThreadTimeline } from '@/components/domains/ThreadTimeline';
import { ConflictPanel } from '@/components/domains/ConflictPanel';
import { MetricStat } from '@/components/ui/MetricStat';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  Users, 
  AlertCircle, 
  Play, 
  Pause,
  MoreVertical,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    workspaceId: string;
    moduleSlug: string;
    threadSlug: string;
  };
}

// This would normally fetch from the API, but we're using mock data
async function getThread(threadSlug: string): Promise<Thread | null> {
  // Simulate async fetch
  await new Promise(resolve => setTimeout(resolve, 100));
  return getThreadBySlug(threadSlug) || null;
}

export default async function ThreadDetailPage({ params }: PageProps) {
  const { workspaceId, moduleSlug, threadSlug } = params;
  const thread = await getThread(threadSlug);

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            Thread Not Found
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            The thread you're looking for doesn't exist or has been deleted.
          </p>
          <Link href={`/workspaces/${workspaceId}/modules/${moduleSlug}`}>
            <Button>Back to Module</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const hasConflict = thread.status === 'awaiting_resolution' || !!thread.conflict;
  const progress = thread.status === 'completed' ? 100 : 
                   thread.status === 'in_progress' ? 60 : 
                   thread.status === 'awaiting_resolution' ? 45 : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <Link href={`/workspaces/${workspaceId}/modules/${moduleSlug}`}>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {thread.title}
              </h1>
              <Badge 
                variant={thread.status === 'completed' ? 'success' : 
                        thread.status === 'awaiting_resolution' ? 'warning' : 
                        'secondary'}
                className="capitalize"
              >
                {thread.status.replace('_', ' ')}
              </Badge>
            </div>
            
            <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl">
              {thread.objective}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Logs
          </Button>
          <Button variant="secondary" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Thread Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <MetricStat
            label="Progress"
            value={progress}
            suffix="%"
            icon={<Activity className="w-4 h-4" />}
          />
          <ProgressBar value={progress} className="mt-3" />
        </Card>
        
        <Card className="p-4">
          <MetricStat
            label="Events"
            value={thread.events.length}
            icon={<MessageSquare className="w-4 h-4" />}
          />
        </Card>
        
        <Card className="p-4">
          <MetricStat
            label="Agents"
            value={new Set(thread.events.map(e => e.agent.id)).size}
            icon={<Users className="w-4 h-4" />}
          />
        </Card>
        
        <Card className="p-4">
          <MetricStat
            label="Duration"
            value="4m"
            suffix="ago"
            icon={<Clock className="w-4 h-4" />}
          />
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <ThreadTimeline events={thread.events} />
          </Card>
        </div>

        {/* Conflict Panel - Takes 1 column */}
        <div>
          {hasConflict && thread.conflict && (
            <div className="sticky top-6">
              <Card className="p-6">
                <ConflictPanel 
                  conflict={thread.conflict} 
                  onResolve={(option) => {
                    console.log('Conflict resolved with:', option);
                    // In a real app, this would update the thread state
                  }}
                />
              </Card>
            </div>
          )}

          {/* Active Agents Panel */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Active Agents
            </h3>
            <div className="space-y-3">
              {Array.from(new Set(thread.events.map(e => e.agent))).map((agent) => (
                <div key={agent.id} className="flex items-center gap-3">
                  <Avatar
                    name={agent.name}
                    initials={agent.avatar}
                    className="w-8 h-8"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                        {agent.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {agent.role}
                      </Badge>
                    </div>
                    <div className="text-xs text-neutral-500">
                      Accuracy: {(agent.metrics.accuracy * 100).toFixed(0)}% 
                      {' • '}
                      Latency: {agent.metrics.latency}ms
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Thread Actions */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Thread Actions
            </h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <Play className="w-4 h-4 mr-2" />
                Resume Thread
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Pause className="w-4 h-4 mr-2" />
                Pause Thread
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Check
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
