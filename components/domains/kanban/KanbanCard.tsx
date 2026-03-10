'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Clock, AlertTriangle, Flame, ArrowRight } from 'lucide-react';
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

// Helper function to format timestamps consistently and safely
const formatTimestamp = (timestamp?: Date | string): string | undefined => {
  if (!timestamp) return undefined;

  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    if (isNaN(date.getTime())) return undefined;

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (e) {
    return undefined;
  }
};

const getPriorityVariant = (priority: KanbanCardProps['priority']) => {
  switch (priority) {
    case 'urgent': return 'error';
    case 'high': return 'warning';
    case 'medium': return 'neutral';
    case 'low': return 'ghost';
    default: return 'neutral';
  }
};

const getPriorityIcon = (priority: KanbanCardProps['priority']) => {
  switch (priority) {
    case 'urgent':
    case 'high': return <AlertTriangle className="w-3 h-3" />;
    case 'medium': return <Flame className="w-3 h-3" />;
    default: return null;
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
        'group relative p-3.5 cursor-pointer bg-white border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300/50',
        priority === 'urgent' && 'border-rose-200 bg-rose-50/10',
        className
      )}
      onClick={onClick}
    >
      {/* Header: Domain and Priority */}
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 border-slate-200 bg-slate-50/50">
          {domain}
        </Badge>
        {priority && priority !== 'low' && (
          <Badge variant={getPriorityVariant(priority)} size="sm" className="text-[10px] h-5 px-1.5">
            <span className="flex items-center gap-1">
              {getPriorityIcon(priority)}
              {priority}
            </span>
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-slate-800 mb-3 leading-relaxed line-clamp-3 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>

      {/* Footer: Agents and Timestamp */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        {/* Agent avatars */}
        <div className="flex -space-x-2">
          {agents.slice(0, 3).map((agent, idx) => (
            <Avatar
              key={idx}
              src={agent.avatar}
              alt={agent.name}
              size="xs"
              className="w-5 h-5 text-[9px] border-2 border-white ring-1 ring-slate-100"
            />
          ))}
          {agents.length > 3 && (
            <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-white ring-1 ring-slate-100 flex items-center justify-center text-[9px] font-medium text-slate-500">
              +{agents.length - 3}
            </div>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
            <Clock className="w-3 h-3" />
            <time>{formatTimestamp(timestamp)}</time>
          </div>
        )}
      </div>
    </Card>
  );
};
