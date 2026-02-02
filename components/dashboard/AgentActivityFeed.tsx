'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Activity } from 'lucide-react';

interface ActivityEvent {
    id: string;
    agentName: string;
    agentAvatar: string;
    action: string;
    module: string;
    timestamp: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

const mockInitialEvents: ActivityEvent[] = [
    { id: 'e1', agentName: 'SEO_Lead', agentAvatar: 'SL', action: 'Finished 5k keyword crawl', module: 'SEO Cluster', timestamp: 'Just now', type: 'success' },
    { id: 'e2', agentName: 'Copy_Writer', agentAvatar: 'CW', action: 'Drafted 3 LinkedIn posts', module: 'Content Factory', timestamp: '1m ago', type: 'info' },
    { id: 'e3', agentName: 'Brand_Guard', agentAvatar: 'BG', action: 'Blocked non-compliant ad copy', module: 'Brand Guardrails', timestamp: '3m ago', type: 'warning' },
    { id: 'e4', agentName: 'Launch_Ops', agentAvatar: 'LO', action: 'Validated launch assets', module: 'SaaS Launch Ops', timestamp: '5m ago', type: 'success' },
];

const AGENT_ACTIONS = [
    "Auditing landing page copy...",
    "Running A/B test simulation",
    "Optimizing Meta ad budget",
    "Resolving brand voice conflict",
    "Scraping competitor pricing",
    "Nurturing lead: Sarah J.",
];

const AGENT_PROFILES = [
    { name: 'SEO_Lead', avatar: 'SL' },
    { name: 'Copy_Writer', avatar: 'CW' },
    { name: 'Social_Manager', avatar: 'SM' },
    { name: 'Performance_Bot', avatar: 'PB' },
    { name: 'Brand_Guard', avatar: 'BG' },
];

export function AgentActivityFeed() {
    const [events, setEvents] = useState<ActivityEvent[]>(mockInitialEvents);

    useEffect(() => {
        const interval = setInterval(() => {
            const profile = AGENT_PROFILES[Math.floor(Math.random() * AGENT_PROFILES.length)];
            const newEvent: ActivityEvent = {
                id: Math.random().toString(36).substr(2, 9),
                agentName: profile.name,
                agentAvatar: profile.avatar,
                action: AGENT_ACTIONS[Math.floor(Math.random() * AGENT_ACTIONS.length)],
                module: ['SEO Cluster', 'Content Factory', 'Ads Execution', 'Analytics', 'Email Nurture'][Math.floor(Math.random() * 5)],
                timestamp: 'Just now',
                type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any,
            };

            setEvents(prev => [newEvent, ...prev.map(e => e.timestamp === 'Just now' ? { ...e, timestamp: '1m ago' } : e)].slice(0, 10));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="flex flex-col h-[500px]">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary-500 animate-pulse" />
                    <h3 className="font-semibold text-neutral-900">Live Agent Activity</h3>
                </div>
                <Badge variant="outline" className="animate-pulse bg-white">14 Agents Active</Badge>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-lg border border-transparent transition-all duration-500",
                            event.timestamp === 'Just now' ? "bg-primary-50 border-primary-100 scale-[1.01]" : "hover:bg-neutral-50"
                        )}
                    >
                        <Avatar initials={event.agentAvatar} size="sm" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-neutral-900">{event.agentName}</span>
                                <span className="text-[10px] text-neutral-400 font-medium">{event.timestamp}</span>
                            </div>
                            <p className="text-xs text-neutral-600 mt-0.5">{event.action}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <Badge variant="ghost" className="text-[10px] py-0 px-1 bg-neutral-100">
                                    {event.module}
                                </Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
