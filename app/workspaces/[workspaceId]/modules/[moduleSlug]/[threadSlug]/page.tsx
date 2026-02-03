'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ThreadTimeline } from '@/components/domains/ThreadTimeline';
import { ConflictPanel } from '@/components/domains/ConflictPanel';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { getThread, postCommand } from '@/lib/apiMock';
import { ArrowLeft, Send, AlertCircle, Eye, Code, Bug } from 'lucide-react';
import Link from 'next/link';

type ViewMode = 'standard' | 'logic' | 'debug';

export default function ThreadDetailPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const moduleSlug = params.moduleSlug as string;
  const threadSlug = params.threadSlug as string;

  const [thread, setThread] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const [commandInput, setCommandInput] = useState('');;
  const [sendingCommand, setSendingCommand] = useState(false);

  // Conflict resolution state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [resolvedConflict, setResolvedConflict] = useState(false);

  useEffect(() => {
    async function fetchThread() {
      try {
        setLoading(true);
        const data = await getThread(threadSlug);
        setThread(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load thread');
      } finally {
        setLoading(false);
      }
    }
    fetchThread();
  }, [threadSlug]);

  const handleSendCommand = async () => {
    if (!commandInput.trim()) return;
    
    try {
      setSendingCommand(true);
      const updatedThread = await postCommand(threadSlug, commandInput);
      setThread(updatedThread);
      setCommandInput('');
    } catch (err) {
      console.error('Failed to send command:', err);
    } finally {
      setSendingCommand(false);
    }
  };

  const handleApproveOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setTimeout(() => {
      setResolvedConflict(true);
    }, 500);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-16 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="h-32 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-80 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (error || !thread) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load thread</h3>
          <p className="text-muted-foreground mb-4">{error || 'Unknown error occurred'}</p>
          <div className="flex gap-2 justify-center">
            <Link href={`/workspaces/${workspaceId}/modules/${moduleSlug}`}>
              <Button variant="outline">Back to Module</Button>
            </Link>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Card>
      </div>
    );
  }

  const activeConflict = thread.conflicts?.[0];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/workspaces/${workspaceId}/modules/${moduleSlug}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold mb-1">{thread.title}</h1>
            <p className="text-muted-foreground text-sm">{thread.objective}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SegmentedControl
            options={[
              { value: 'standard', label: 'Standard', icon: <Eye className="h-4 w-4" /> },
              { value: 'logic', label: 'Logic', icon: <Code className="h-4 w-4" /> },
              { value: 'debug', label: 'Debug', icon: <Bug className="h-4 w-4" /> },
            ]}
            value={viewMode}
            onChange={(v) => setViewMode(v as ViewMode)}
          />
          <Badge variant={thread.status === 'active' ? 'success' : 'warning'}>
            {thread.status}
          </Badge>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thread Info Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {thread.events?.length || 0} events
                </span>
                <span className="text-muted-foreground">
                  {thread.conflicts?.length || 0} conflicts
                </span>
              </div>
              <span className="text-muted-foreground">
                Created: {new Date(thread.events?.[0]?.timestamp || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </Card>

          {/* Timeline */}
          <ThreadTimeline events={thread.events} viewMode={viewMode} />

          {/* Command Input */}
          <Card className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !sendingCommand && handleSendCommand()}
                placeholder="Send a command to the agents..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={sendingCommand}
              />
              <Button 
                onClick={handleSendCommand}
                disabled={!commandInput.trim() || sendingCommand}
              >
                {sendingCommand ? (
                  <span>Sending...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send
                  </span>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Conflict Panel */}
        <div>
          {activeConflict && !resolvedConflict && (
            <ConflictPanel
              conflict={activeConflict}
              selectedOptionId={selectedOptionId}
              onApprove={handleApproveOption}
            />
          )}
          {resolvedConflict && (
            <Card className="p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Conflict Resolved</h3>
                <p className="text-sm text-muted-foreground">
                  The agents will proceed with the approved solution.
                </p>
              </div>
            </Card>
          )}
          {!activeConflict && (
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">No active conflicts</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}