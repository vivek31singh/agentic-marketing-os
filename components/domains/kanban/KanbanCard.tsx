'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Clock, AlertTriangle, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KanbanCardProps {
  id: string;
  title: string;
  domain: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp?: Date | string;
  agents?: Array<{
    name: string;
    avatar?: string;
  }>;
  className?: string;
  onClick?: () => void;
}

// Helper function to format timestamps consistently
const formatTimestamp = (timestamp?: Date | string): string | undefined => {
  if (!timestamp) return undefined;
  
  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Handle Date object
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getPriorityVariant = (priority: KanbanCardProps['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'destructive';
    case 'high':
      return 'warning';
    case 'medium':
      return 'neutral';
    case 'low':
      return 'ghost';
    default:
      return 'neutral';
  }
};

const getPriorityIcon = (priority: KanbanCardProps['priority']) => {
  switch (priority) {
    case 'urgent':
    case 'high':
      return <AlertTriangle className="w-3 h-3" />;
    case 'medium':
      return <Flame className="w-3 h-3" />;
    default:
      return null;
  }
};

export const KanbanCard = ({
  id,
  title,
  domain,
  status,
  priority,
  timestamp,
  agents = [],
  className,
  onClick,
}: KanbanCardProps) => {
  return (
    <Card
      className={cn(
        'p-4 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all duration-200 bg-white border-slate-200/60',
        priority === 'urgent' && 'border-rose-300/60 bg-rose-50/30',
        className
      )}
      onClick={onClick}
    >
      {/* Header: Domain and Priority */}
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" size="sm" className="text-[10px] uppercase tracking-wider">
          {domain}
        </Badge>
        <Badge variant={getPriorityVariant(priority)} size="sm" className="text-[10px]">
          <span className="flex items-center gap-1">
            {getPriorityIcon(priority)}
            {priority}
          </span>
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 mb-3 leading-snug line-clamp-2">
        {title}
      </h3>

      {/* Footer: Agents and Timestamp */}
      <div className="flex items-center justify-between">
        {/* Agent avatars */}
        <div className="flex -space-x-2">
          {agents.slice(0, 3).map((agent, idx) => (
            <Avatar
              key={idx}
              src={agent.avatar}
              name={agent.name}
              size="xs"
              className="w-6 h-6 text-[10px] border-2 border-white"
            />
          ))}
          {agents.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-medium text-slate-500">
              +{agents.length - 3}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            <time>{formatTimestamp(timestamp)}</time>
          </div>
        )}
      </div>
    </Card>
  );
};
