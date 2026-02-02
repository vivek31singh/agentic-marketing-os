import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, FileText, Mail, Share2, Layout } from 'lucide-react';
import { contentFactoryMetrics, contentThreads } from '@/data/contentFactory';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricStat } from '@/components/ui/MetricStat';
import { Avatar } from '@/components/ui/Avatar';

const contentTypeIcons = {
  blog: FileText,
  social: Share2,
  email: Mail,
  'landing-page': Layout,
};

const statusColors = {
  'in-progress': 'primary',
  active: 'success',
  pending: 'warning',
  completed: 'success',
} as const;

const approvalStageColors = {
  draft: 'neutral',
  review: 'primary',
  final: 'success',
  published: 'success',
} as const;

export default function ContentFactoryPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Content Factory
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Manage content workflows, approvals, and publishing pipelines
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-sm">
            Active
          </Badge>
          <Button variant="primary" size="sm">
            + New Thread
          </Button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricStat
          label="Content Velocity"
          value={`${contentFactoryMetrics.contentVelocity.current}/${contentFactoryMetrics.contentVelocity.target}`}
          trend={contentFactoryMetrics.contentVelocity.trend}
          description="Articles per week"
        />
        <MetricStat
          label="Pending Approval"
          value={contentFactoryMetrics.pendingApproval}
          description="Items awaiting review"
        />
        <MetricStat
          label="Articles Published"
          value={contentFactoryMetrics.articlesPublished}
          trend="up"
          description="This quarter"
        />
        <MetricStat
          label="Active Writers"
          value={contentFactoryMetrics.activeWriters}
          description="Agents working"
        />
      </div>

      {/* Quick Stats Bar */}
      <Card className="p-4 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Avg Review Time: <strong>{contentFactoryMetrics.avgReviewTime}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Total Threads: <strong>{contentThreads.length}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Filter by:</span>
            {['All', 'Blog', 'Email', 'Social'].map((filter) => (
              <Badge key={filter} variant="neutral" className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700">
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Active Threads Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Active Content Threads
          </h2>
          <Link href="#" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
            View all threads →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {contentThreads.map((thread) => {
            const ContentTypeIcon = contentTypeIcons[thread.contentType];
            return (
              <Card key={thread.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <ContentTypeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <Badge variant={statusColors[thread.status] || 'neutral'} className="text-xs">
                        {thread.status}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant={approvalStageColors[thread.approvalStage]} className="text-xs">
                    {thread.approvalStage}
                  </Badge>
                </div>

                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  {thread.title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                  {thread.objective}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-500">
                      Audience:
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {thread.targetAudience}
                    </span>
                  </div>

                  {thread.wordCount && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-500">
                        Word Count:
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                        {thread.wordCount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-500">
                      Due Date:
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {new Date(thread.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    {thread.assignedAgent && (
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={thread.assignedAgent.avatar}
                          size="sm"
                          className="w-6 h-6 text-xs"
                        />
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          {thread.assignedAgent.name}
                        </span>
                      </div>
                    )}
                    <Link
                      href={`/workspaces/${params.workspaceId}/modules/content-factory/${thread.id}`}
                    >
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
