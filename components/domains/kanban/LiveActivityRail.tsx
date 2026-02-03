import { Clock, Bot, User, ArrowRight } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'agent' | 'user' | 'system';
  agent?: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target?: string;
  metadata?: string;
}

interface LiveActivityRailProps {
  activities: ActivityItem[];
}

export function LiveActivityRail({ activities }: LiveActivityRailProps) {
  const typeConfig = {
    agent: {
      icon: <Bot className="w-3.5 h-3.5" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
    },
    user: {
      icon: <User className="w-3.5 h-3.5" />,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
    },
    system: {
      icon: <Clock className="w-3.5 h-3.5" />,
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      textColor: 'text-slate-700',
    },
  };

  return (
    <div className="w-80 border-l border-slate-200/60 bg-white/50 backdrop-blur-sm">
      <div className="px-4 py-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="font-semibold text-slate-800">Live Activity</h3>
          <Badge variant="ghost" className="ml-auto text-xs bg-emerald-50 text-emerald-600 border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>
      
      <div className="h-[calc(100vh-380px)] overflow-y-auto p-4 space-y-4">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          
          return (
            <div
              key={activity.id}
              className={cn(
                "relative pl-4 pb-4 border-l-2",
                activity.type === 'agent' && 'border-l-blue-300',
                activity.type === 'user' && 'border-l-emerald-300',
                activity.type === 'system' && 'border-l-slate-300'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border shrink-0",
                  config.bgColor,
                  config.borderColor,
                  config.textColor
                )}>
                  {config.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {activity.agent && (
                      <>
                        <Avatar
                          src={activity.agent.avatar}
                          alt={activity.agent.name}
                          size="xs"
                          className="w-5 h-5"
                        />
                        <span className="text-xs font-medium text-slate-700">
                          {activity.agent.name}
                        </span>
                        <Badge variant="ghost" className="text-[10px] px-1 py-0 h-auto text-slate-500">
                          {activity.agent.role}
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  <p className="text-sm text-slate-600 leading-snug">
                    {activity.action}
                  </p>
                  
                  {activity.target && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-medium text-slate-500 truncate">
                        {activity.target}
                      </span>
                    </div>
                  )}
                  
                  {activity.metadata && (
                    <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-100">
                      <p className="text-xs text-slate-500 font-mono">
                        {activity.metadata}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-400 mt-1.5">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        {activities.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Clock className="w-8 h-8 text-slate-300 mb-2" />
            <p className="text-sm text-slate-400">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
