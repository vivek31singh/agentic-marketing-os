import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Agent } from '@/data/mockData';
import { cn } from '@/lib/utils';

type ViewMode = 'standard' | 'logic' | 'debug';

export interface ThreadTimelineProps {
  events: any[];
  viewMode?: ViewMode;
}

export function ThreadTimeline({ events, viewMode = 'standard' }: ThreadTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No events yet
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="relative">
          {/* Timeline line */}
          {index !== events.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
          )}

          <div className="flex gap-4">
            {/* Agent avatar/icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-lg">
              {event.agent.avatar}
            </div>

            {/* Event content */}
            <div className="flex-1 min-w-0">
              <Card className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{event.agent.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {event.agent.role}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <Badge variant={event.type === 'conflict' ? 'error' : event.type === 'system' ? 'warning' : 'secondary'} className="text-xs">
                    {event.type}
                  </Badge>
                </div>

                {/* Content */}
                <p className="text-sm mb-3">{event.content}</p>

                {/* Logic Chain (Logic view) */}
                {viewMode === 'logic' && event.logicChain && event.logicChain.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Logic Chain:</p>
                    <ol className="space-y-1">
                      {event.logicChain.map((step: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-2">
                          <span className="font-mono text-primary">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Debug Metadata (Debug view) */}
                {viewMode === 'debug' && event.meta && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Debug Metadata:</p>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(event.meta, null, 2)}
                    </pre>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}