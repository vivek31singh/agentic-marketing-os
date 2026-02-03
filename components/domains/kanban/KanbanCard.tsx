import { GripVertical, MessageSquare, Paperclip } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  id: string;
  title: string;
  domain: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  agent?: {
    name: string;
    avatar: string;
  };
  eventsCount?: number;
  attachmentsCount?: number;
  onClick?: () => void;
  className?: string;
}

export function KanbanCard({
  id,
  title,
  domain,
  status,
  priority,
  agent,
  eventsCount = 0,
  attachmentsCount = 0,
  onClick,
  className,
}: KanbanCardProps) {
  const priorityConfig = {
    low: 'bg-slate-100 text-slate-600 border-slate-200',
    medium: 'bg-blue-50 text-blue-600 border-blue-200',
    high: 'bg-amber-50 text-amber-600 border-amber-200',
    urgent: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  };

  return (
    <div
      className={cn(
        "group relative bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <Badge 
          variant="outline" 
          className={cn("text-[10px] px-1.5 py-0.5 font-medium", priorityConfig[priority])}
        >
          {priorityLabels[priority]}
        </Badge>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="text-sm font-medium text-slate-900 mb-2 line-clamp-2 leading-snug">
        {title}
      </h4>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {domain}
          </span>
          <Badge 
            variant="ghost"
            className="text-[10px] text-slate-500 bg-slate-50 hover:bg-slate-100 px-1.5 py-0"
          >
            {status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          {(eventsCount > 0 || attachmentsCount > 0) && (
            <div className="flex items-center gap-2">
              {eventsCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MessageSquare className="w-3 h-3" />
                  <span>{eventsCount}</span>
                </div>
              )}
              {attachmentsCount > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Paperclip className="w-3 h-3" />
                  <span>{attachmentsCount}</span>
                </div>
              )}
            </div>
          )}
          
          {agent && (
            <Avatar
              src={agent.avatar}
              alt={agent.name}
              size="sm"
              className="w-6 h-6"
            />
          )}
        </div>
      </div>
    </div>
  );
}
