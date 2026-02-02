'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

// Types (matching mockData.ts)
interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    accuracy: number;
    latency: number;
  };
}

interface Event {
  type: 'message' | 'conflict' | 'system';
  timestamp: string;
  agent: Agent;
  content: string;
  logicChain?: string[];
  meta?: Record<string, any>;
}

interface Conflict {
  id: string;
  reason: string;
  options: Option[];
}

interface Option {
  agent: Agent;
  description: string;
  label: string;
  outcome: string;
}

interface Thread {
  id: string;
  title: string;
  status: string;
  objective: string;
  events: Event[];
  conflict?: Conflict;
}

// Mock Thread Data (in real app, this would be fetched)
const mockThread: Thread = {
  id: 'thread-1',
  title: 'Technical Debt Prioritization',
  status: 'active',
  objective: 'Identify and prioritize critical technical debt items for Q1 resolution.',
  events: [
    {
      type: 'message',
      timestamp: '2024-01-15T09:00:00Z',
      agent: {
        id: 'agent-1',
        name: 'Tech_Lead',
        role: 'Engineering',
        avatar: '🤖',
        metrics: { accuracy: 0.95, latency: 120 },
      },
      content: 'Analyzing codebase for technical debt indicators...',
      logicChain: ['Scan codebase', 'Identify patterns', 'Flag potential issues'],
    },
    {
      type: 'message',
      timestamp: '2024-01-15T09:05:00Z',
      agent: {
        id: 'agent-2',
        name: 'Crawl_Spider',
        role: 'Analysis',
        avatar: '🕷️',
        metrics: { accuracy: 0.88, latency: 200 },
      },
      content: 'Found 47 potential debt items. Top priority: Legacy payment integration.',
    },
    {
      type: 'conflict',
      timestamp: '2024-01-15T09:10:00Z',
      agent: {
        id: 'agent-1',
        name: 'Tech_Lead',
        role: 'Engineering',
        avatar: '🤖',
        metrics: { accuracy: 0.95, latency: 120 },
      },
      content: 'Disagreement on priority order.',
    },
  ],
  conflict: {
    id: 'conflict-1',
    reason: 'Priority of refactoring efforts',
    options: [
      {
        agent: {
          id: 'agent-1',
          name: 'Tech_Lead',
          role: 'Engineering',
          avatar: '🤖',
          metrics: { accuracy: 0.95, latency: 120 },
        },
        description: 'Focus on payment integration first',
        label: 'Payment First',
        outcome: 'Immediate security improvements',
      },
      {
        agent: {
          id: 'agent-2',
          name: 'Crawl_Spider',
          role: 'Analysis',
          avatar: '🕷️',
          metrics: { accuracy: 0.88, latency: 200 },
        },
        description: 'Focus on data layer refactoring',
        label: 'Data First',
        outcome: 'Better query performance',
      },
    ],
  },
};

const currentUser: Agent = {
  id: 'user-1',
  name: 'You',
  role: 'User',
  avatar: '👤',
  metrics: { accuracy: 1, latency: 0 },
};

export default function ThreadDetailPage() {
  const params = useParams();
  const { workspaceId, moduleSlug, threadSlug } = params;
  
  const [thread, setThread] = useState<Thread>(mockThread);
  const [command, setCommand] = useState('');
  const [isSending, setIsSending] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;

    setIsSending(true);

    // Create new user event
    const newEvent: Event = {
      type: 'message',
      timestamp: new Date().toISOString(),
      agent: currentUser,
      content: command,
    };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Append to events
    setThread((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));

    setCommand('');
    setIsSending(false);
  };

  const handleResolveConflict = (optionLabel: string) => {
    // Remove conflict and add resolution event
    const resolutionEvent: Event = {
      type: 'system',
      timestamp: new Date().toISOString(),
      agent: currentUser,
      content: `Conflict resolved. Selected option: ${optionLabel}`,
    };

    setThread((prev) => ({
      ...prev,
      events: [...prev.events, resolutionEvent],
      conflict: undefined,
    }));
  };

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-4">
        <div className="flex items-center gap-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 dark:text-neutral-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {thread.title}
          </h1>
          <Badge variant={thread.status === 'active' ? 'success' : 'neutral'}>
            {thread.status}
          </Badge>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          {thread.objective}
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {thread.events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <Avatar className="w-10 h-10 flex-shrink-0 mt-1">
                {event.agent.avatar}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {event.agent.name}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    • {formatTimestamp(event.timestamp)}
                  </span>
                  {event.type !== 'message' && (
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  )}
                </div>
                <Card className="p-4 bg-white dark:bg-neutral-900">
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {event.content}
                  </p>
                  {event.logicChain && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                        Logic Chain:
                      </p>
                      <ol className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                        {event.logicChain.map((step, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflict Panel */}
      {thread.conflict && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 bg-amber-50 dark:bg-amber-950/20 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="warning">Conflict Detected</Badge>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {thread.conflict.reason}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {thread.conflict.options.map((option, index) => (
                <Card
                  key={index}
                  className="p-4 bg-white dark:bg-neutral-900 border-amber-200 dark:border-amber-800 cursor-pointer hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
                  onClick={() => handleResolveConflict(option.label)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6 text-sm">{option.agent.avatar}</Avatar>
                    <span className="font-medium text-neutral-900 dark:text-white text-sm">
                      {option.agent.name}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {option.label}
                    </Badge>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      → {option.outcome}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Command Input */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-4">
        <form onSubmit={handleSendCommand} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type a command or message..."
              disabled={isSending}
              className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={!command.trim() || isSending}
              className="px-6"
            >
              {isSending ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Commands are processed by agents. Use natural language to request actions.
          </p>
        </form>
      </div>
    </div>
  );
}
