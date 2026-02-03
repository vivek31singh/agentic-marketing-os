'use client';

import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Clock, User, Bot, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'message' | 'conflict' | 'system' | 'resolution';
  timestamp: Date | string;
  agent?: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  meta?: {
    domain?: string;
    severity?: 'low' | 'medium' | 'high';
  };
}

interface LiveActivityRailProps {
  activities: ActivityItem[];
  className?: string;
}

// Helper function to format timestamps consistently
const formatTimestamp = (timestamp: Date | string): string => {
  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }
  return timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
};

export const LiveActivityRail = ({ activities, className }: LiveActivityRailProps) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'message':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'conflict':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'system':
        return <Bot className="w-4 h-4 text-slate-500" />;
      case 'resolution':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getActivityTypeLabel = (type: ActivityItem['type']) => {
    switch (type) {
      case 'message':
        return 'Message';
      case 'conflict':
        return 'Conflict';
      case 'system':
        return 'System';
      case 'resolution':
        return 'Resolution';
      default:
        return 'Activity';
    }
  };

  const getSeverityVariant = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200/60 bg-slate-50/50">
        <Clock className="w-4 h-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-700">Live Activity Feed</h3>
        <Badge variant="ghost" size="sm" className="ml-auto">
          {activities.length} events
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <Clock className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="relative pl-6 pb-4 border-l-2 border-slate-200 last:pb-0 last:border-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
              
              {/* Activity card */}
              <Card className="p-3 bg-white border-slate-200/60 shadow-sm">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="mt-0.5 p-1.5 rounded-full bg-slate-50">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {activity.agent && (
                        <div className="flex items-center gap-1.5">
                          <Avatar 
                            src={activity.agent.avatar} 
                            name={activity.agent.name}
                            size="xs"
                            className="w-5 h-5 text-[10px]"
                          />
                          <span className="text-xs font-medium text-slate-700">
                            {activity.agent.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {activity.agent.role}
                          </span>
                        </div>
                      )}
                      <Badge variant={getSeverityVariant(activity.meta?.severity)} size="sm">
                        {getActivityTypeLabel(activity.type)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed mb-2">
                      {activity.content}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <time>{formatTimestamp(activity.timestamp)}</time>
                      {activity.meta?.domain && (
                        <>
                          <span>•</span>
                          <span className="text-slate-500">{activity.meta.domain}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
