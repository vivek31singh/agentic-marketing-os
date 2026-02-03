'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Clock, Bot, MessageSquare, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Event {
  type: 'message' | 'conflict' | 'system';
  timestamp: Date | string;
  agent?: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  logicChain?: string[];
  meta?: Record<string, any>;
}

export interface Conflict {
  id: string;
  reason: string;
  options: Array<{
    agent: {
      id: string;
      name: string;
      role: string;
      avatar?: string;
    };
    description: string;
    label: string;
    outcome: string;
  }>;
}

interface ThreadTimelineProps {
  events: Event[];
  conflicts: Conflict[];
  viewMode?: 'standard' | 'logic' | 'debug';
  selectedOption?: string;
  onOptionSelect?: (conflictId: string, optionLabel: string) => void;
  className?: string;
}

// Helper function to format timestamps consistently
const formatTimestamp = (timestamp: Date | string): string => {
  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return timestamp.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const ThreadTimeline = ({
  events,
  conflicts,
  viewMode = 'standard',
  selectedOption,
  onOptionSelect,
  className,
}: ThreadTimelineProps) => {
  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'conflict':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'system':
        return <Bot className="w-4 h-4 text-slate-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const getEventBadgeVariant = (type: Event['type']) => {
    switch (type) {
      case 'message':
        return 'neutral';
      case 'conflict':
        return 'warning';
      case 'system':
        return 'ghost';
      default:
        return 'neutral';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {events.map((event, idx) => (
        <div key={idx} className="relative pl-6 pb-6 last:pb-0">
          {/* Timeline line */}
          {idx !== events.length - 1 && (
            <div className="absolute left-[7px] top-8 bottom-0 w-0.5 bg-slate-200" />
          )}

          {/* Timeline dot */}
          <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
          </div>

          {/* Event content */}
          <Card className="p-4 bg-white border-slate-200/60 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {event.agent ? (
                  <Avatar
                    src={event.agent.avatar}
                    name={event.agent.name}
                    size="sm"
                    className="w-8 h-8 text-xs"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    {getEventIcon(event.type)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-800">
                      {event.agent?.name || 'System'}
                    </span>
                    <Badge variant={getEventBadgeVariant(event.type)} size="sm">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <time>{formatTimestamp(event.timestamp)}</time>
                    {event.agent?.role && (
                      <>
                        <span>•</span>
                        <span>{event.agent.role}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-sm text-slate-700 leading-relaxed mb-3">
              {event.content}
            </div>

            {/* Logic Chain - Logic View */}
            {viewMode === 'logic' && event.logicChain && event.logicChain.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Bot className="w-3 h-3" />
                  Logic Chain
                </h4>
                <ol className="space-y-1.5">
                  {event.logicChain.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-medium">
                        {stepIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Meta - Debug View */}
            {viewMode === 'debug' && event.meta && Object.keys(event.meta).length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Debug Metadata
                </h4>
                <div className="bg-slate-50 rounded-md p-2">
                  <pre className="text-[10px] text-slate-600 overflow-x-auto">
                    {JSON.stringify(event.meta, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </Card>

          {/* Conflict Card */}
          {event.type === 'conflict' && (
            <Card className="mt-3 p-4 bg-amber-50/50 border-amber-200/60">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-semibold text-amber-800">Conflict Detected</h4>
              </div>
              <p className="text-sm text-amber-700 mb-4">
                {event.content}
              </p>
              <div className="space-y-2">
                {conflicts.find(c => c.id === event.meta?.conflictId)?.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => onOptionSelect?.(event.meta?.conflictId, option.label)}
                    className={cn(
                      'w-full text-left p-3 rounded-md border transition-all',
                      selectedOption === option.label
                        ? 'bg-amber-100 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar
                        src={option.agent.avatar}
                        name={option.agent.name}
                        size="xs"
                        className="w-5 h-5 text-[10px]"
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {option.agent.name}
                      </span>
                      <Badge variant="outline" size="sm" className="text-[10px]">
                        {option.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};
