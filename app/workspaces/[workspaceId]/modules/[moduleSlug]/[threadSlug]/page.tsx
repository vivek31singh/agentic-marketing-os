"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getThread, postCommand } from '@/lib/apiMock';
import { ThreadTimeline } from '@/components/domains/ThreadTimeline';
import { ConflictPanel } from '@/components/domains/ConflictPanel';
import { Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Thread, Event } from '@/data/mockData';
import { SegmentedControl } from '@/components/ui/SegmentedControl';

export default function ThreadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [commandInput, setCommandInput] = useState('');
  const [sending, setSending] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'logic' | 'debug'>('standard');

  // Conflict resolution state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    async function loadThread() {
      try {
        setLoading(true);
        const threadData = await getThread(params.threadSlug as string);
        setThread(threadData);
      } catch (err) {
        console.error('Failed to load thread:', err);
      } finally {
        setLoading(false);
      }
    }
    loadThread();
  }, [params.threadSlug]);

  const handleSendCommand = async () => {
    if (!commandInput.trim() || !thread) return;

    setSending(true);
    try {
      const newEvent = await postCommand(thread.id, commandInput);
      setThread({
        ...thread,
        events: [...thread.events, newEvent]
      });
      setCommandInput('');
    } catch (err) {
      console.error('Failed to send command:', err);
    } finally {
      setSending(false);
    }
  };

  const handleResolveConflict = async (optionId: string) => {
    setSelectedOptionId(optionId);
    setResolving(true);

    // Simulate API call
    setTimeout(() => {
      if (thread) {
        const updatedEvents = thread.events.map(event => {
          if (event.type === 'conflict' && event.conflict) {
            return {
              ...event,
              meta: { ...event.meta, resolved: true, resolution: optionId }
            };
          }
          return event;
        });
        setThread({ ...thread, events: updatedEvents });
      }
      setResolving(false);
      setSelectedOptionId(null);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-neutral-200 rounded w-1/2 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-neutral-100 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-neutral-600">Thread not found</p>
          <Link href={`/workspaces/${params.workspaceId}/mission-control`}>
            <Button className="mt-4">Return to Mission Control</Button>
          </Link>
        </div>
      </div>
    );
  }

  const conflictEvent = thread.events.find(e => e.type === 'conflict');
  const isResolved = conflictEvent?.meta?.resolved;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/workspaces/${params.workspaceId}/mission-control`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{thread.title}</h1>
              {isResolved && (
                <Badge variant="success" size="sm" withDot>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Resolved
                </Badge>
              )}
            </div>
            <p className="text-neutral-600 text-sm mt-1">{thread.objective}</p>
          </div>
        </div>
        <SegmentedControl
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'logic', label: 'Logic' },
            { value: 'debug', label: 'Debug' }
          ]}
          value={viewMode}
          onChange={(value) => setViewMode(value as any)}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Thread Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ThreadTimeline 
                events={thread.events} 
                viewMode={viewMode}
              />
            </CardContent>
          </Card>

          {/* Command Input */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
                  placeholder="Send a command to the agents..."
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  disabled={sending}
                />
                <Button 
                  onClick={handleSendCommand}
                  disabled={sending || !commandInput.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Conflict Panel (if exists) */}
        <div>
          {conflictEvent && !isResolved && conflictEvent.conflict && (
            <ConflictPanel
              conflict={conflictEvent.conflict}
              selectedOptionId={selectedOptionId}
              onResolve={handleResolveConflict}
              isResolving={resolving}
            />
          )}

          {/* Thread Info Card */}
          <Card className={conflictEvent && !isResolved ? 'mt-4' : ''}>
            <CardHeader>
              <CardTitle>Thread Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Status</span>
                <Badge variant={thread.status === 'active' ? 'success' : 'neutral'} size="sm">
                  {thread.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Events</span>
                <span className="text-sm font-medium">{thread.events.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Last Updated</span>
                <span className="text-sm font-medium">
                  {new Date(thread.events[thread.events.length - 1]?.timestamp || Date.now()).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}