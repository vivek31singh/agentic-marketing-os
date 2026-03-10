'use client';

import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Clock, Activity, Zap, Shield, CheckCircle2, AlertCircle, Bot, User, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface AgentStatus {
  name: string;
  status: 'active' | 'idle' | 'offline';
}

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
  agents?: AgentStatus[];
  className?: string;
}

// Helper: Format Timestamp
const formatTimestamp = (timestamp: Date | string): string => {
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    if (isNaN(date.getTime())) return 'Just now'; // Fallback for invalid dates

    // If today, show time
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Otherwise show Date
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (e) {
    return 'Just now';
  }
};

export const LiveActivityRail = ({ activities = [], agents = [], className }: LiveActivityRailProps) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'message': return <User className="w-3.5 h-3.5 text-blue-500" />;
      case 'conflict': return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      case 'system': return <Bot className="w-3.5 h-3.5 text-slate-500" />;
      case 'resolution': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      default: return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'low': return 'text-slate-600 bg-slate-50 border-slate-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className={cn('flex flex-col h-full gap-6', className)}>

      {/* SECTION: System Intelligence */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Shield className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">System Intelligence</h3>
        </div>

        <Card className="p-4 bg-white border-slate-200 shadow-sm space-y-4">
          {/* Internal Metrics */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">System Health</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-lg font-bold text-slate-800">92%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">Active Agents</p>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-lg font-bold text-slate-800">{agents.filter(a => a.status === 'active').length}</span>
              </div>
            </div>
          </div>

          {/* Agent Status List */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase">Agent Status</p>
            <div className="space-y-2">
              {agents.map((agent, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      agent.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                    )} />
                    <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                      {agent.name}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] px-1.5 py-0 h-5 border-0 font-medium",
                      agent.status === 'active'
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {agent.status}
                  </Badge>
                </div>
              ))}
              {agents.length === 0 && (
                <div className="text-xs text-slate-400 italic">No agent data</div>
              )}
            </div>
          </div>

          {/* Recent Alerts (Placeholder based on user request) */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
              <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
              <span>High latency detected in Content Factory</span>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION: Live Activity Feed */}
      <div className="flex-1 flex flex-col min-h-0">
        {(!activities || activities.length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200/50 rounded-lg bg-slate-50/30 p-6 text-center">
            <Activity className="w-8 h-8 mb-2 opacity-20" />
            <p className="font-medium text-slate-500">No recent activity</p>
            <p className="text-xs text-slate-400 mt-1">Events will appear here when agents are active.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-1 mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Live Activity</h3>
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                {activities.length} events
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id || index} className="relative pl-4 border-l border-slate-200 pb-1 last:border-l-0">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full border-2 border-white ring-1 ring-slate-200",
                    activity.type === 'resolution' ? "bg-emerald-500 ring-emerald-100" :
                      activity.type === 'conflict' ? "bg-amber-500 ring-amber-100" :
                        "bg-blue-500 ring-blue-100"
                  )} />

                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wilder">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                    {activity.meta?.domain && (
                      <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 rounded">
                        {activity.meta.domain}
                      </span>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-2.5">
                      {/* Icon */}
                      <div className="mt-0.5 shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-slate-700 leading-snug group-hover:text-slate-900">
                          {activity.content}
                        </p>

                        {activity.agent && (
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px]">
                              {activity.agent?.avatar || (activity.agent?.name ? activity.agent.name[0] : '?')}
                            </div>
                            <span className="text-xs font-medium text-slate-500">
                              {activity.agent?.name || 'Unknown Agent'}
                            </span>
                            {activity.type === 'resolution' && (
                              <Badge variant="outline" className="text-[9px] h-4 px-1 text-emerald-600 bg-emerald-50 border-emerald-100">
                                Resolved
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
