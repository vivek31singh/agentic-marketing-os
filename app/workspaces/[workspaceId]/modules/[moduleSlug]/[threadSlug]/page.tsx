'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { SegmentedControl, type SegmentedControlItem } from '@/components/ui/SegmentedControl';
import { ThreadTimeline, type ViewMode } from '@/components/domains/ThreadTimeline';
import { ConflictPanel } from '@/components/domains/ConflictPanel';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { getThread } from '@/lib/apiMock';

export default function ThreadDetailPage() {
  const params = useParams();
  const { workspaceId, moduleSlug, threadSlug } = params as {
    workspaceId: string;
    moduleSlug: string;
    threadSlug: string;
  };

  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const [commandInput, setCommandInput] = useState('');
  const [thread, setThread] = React.useState(getThread(threadSlug));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const viewModeItems: SegmentedControlItem[] = [
    { label: 'Standard', value: 'standard' },
    { label: 'Logic', value: 'logic' },
    { label: 'Debug', value: 'debug' },
  ];

  const handleSendCommand = async () => {
    if (!commandInput.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create new user event
    const newUserEvent = {
      type: 'message' as const,
      timestamp: new Date().toISOString(),
      agent: {
        id: 'user',
        name: 'User',
        role: 'human',
        avatar: '/avatars/user.png',
        metrics: { accuracy: 100, latency: 0 },
      },
      content: commandInput,
    };

    // Update thread with new event
    setThread((prev: any) => ({
      ...prev,
      events: [...prev.events, newUserEvent],
    }));

    setCommandInput('');
    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendCommand();
    }
  };

  const conflict = thread.conflict;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/workspaces/${workspaceId}/modules/${moduleSlug}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{thread.title}</h1>
            <p className="text-neutral-500 mt-1">{thread.objective}</p>
          </div>
        </div>
        <Badge variant={thread.status === 'active' ? 'success' : thread.status === 'error' ? 'error' : 'default'}>
          {thread.status}
        </Badge>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Thread Timeline</h2>
        <SegmentedControl
          items={viewModeItems}
          value={viewMode}
          onValueChange={(value) => setViewMode(value as ViewMode)}
        />
      </div>

      {/* Conflict Panel */}
      {conflict && (
        <ConflictPanel
          conflict={conflict}
          onResolve={(option) => {
            console.log('Resolved with option:', option);
          }}
        />
      )}

      {/* Timeline */}
      <ThreadTimeline events={thread.events} viewMode={viewMode} />

      {/* Command Input */}
      <Card className="p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a command to the thread..."
            className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
            disabled={isSubmitting}
          />
          <Button
            onClick={handleSendCommand}
            disabled={!commandInput.trim() || isSubmitting}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
