import { Event } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Clock, GitBranch, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ViewMode = 'standard' | 'logic' | 'debug';

interface ThreadTimelineProps {
  events: Event[];
  viewMode: ViewMode;
}

export function ThreadTimeline({ events, viewMode }: ThreadTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        No events in this thread yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <EventItem key={index} event={event} viewMode={viewMode} />
      ))}
    </div>
  );
}

interface EventItemProps {
  event: Event;
  viewMode: ViewMode;
}

function EventItem({ event, viewMode }: EventItemProps) {
  const isConflict = event.type === 'conflict';
  const isSystem = event.type === 'system';
  const isMessage = event.type === 'message';

  const showLogicChain = viewMode === 'logic' && event.logicChain && event.logicChain.length > 0;
  const showMeta = viewMode === 'debug' && event.meta && Object.keys(event.meta).length > 0;

  return (
    <Card className="p-4 hover:border-neutral-300 transition-colors">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar
            src={event.agent?.avatar}
            alt={event.agent?.name || 'System'}
            size="md"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Agent name and timestamp */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-neutral-900">
              {event.agent?.name || 'System'}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-sm text-neutral-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(event.timestamp).toLocaleTimeString()}
            </span>
            <Badge variant={isConflict ? 'error' : isSystem ? 'neutral' : 'success'} className="ml-auto">
              {event.type}
            </Badge>
          </div>

          {/* Main content */}
          <p className="text-neutral-700 mb-3">{event.content}</p>

          {/* Logic Chain View - for Logic mode */}
          {showLogicChain && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 text-blue-900 font-medium text-sm mb-2">
                <GitBranch className="h-4 w-4" />
                Logic Chain
              </div>
              <ol className="space-y-1.5">
                {event.logicChain!.map((step, idx) => (
                  <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="text-blue-400 font-mono text-xs mt-0.5">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Meta Details View - for Debug mode */}
          {showMeta && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2 text-amber-900 font-medium text-sm mb-2">
                <Settings className="h-4 w-4" />
                Debug Meta
              </div>
              <div className="space-y-2">
                {Object.entries(event.meta!).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-amber-600 font-mono">{key}:</span>
                    <span className="text-amber-900 ml-2">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
