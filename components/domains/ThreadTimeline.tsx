'use client';

import React from 'react';
import { Event } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { MessageSquare, AlertTriangle, Settings, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreadTimelineProps {
  events: Event[];
  className?: string;
}

const getEventIcon = (type: Event['type']) => {
  switch (type) {
    case 'message':
      return MessageSquare;
    case 'conflict':
      return AlertTriangle;
    case 'system':
      return Settings;
    default:
      return MessageSquare;
  }
};

const getEventColor = (type: Event['type']) => {
  switch (type) {
    case 'message':
      return 'text-blue-500 bg-blue-50 dark:bg-blue-950';
    case 'conflict':
      return 'text-amber-500 bg-amber-50 dark:bg-amber-950';
    case 'system':
      return 'text-neutral-500 bg-neutral-50 dark:bg-neutral-950';
    default:
      return 'text-neutral-500 bg-neutral-50 dark:bg-neutral-950';
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const ThreadTimeline: React.FC<ThreadTimelineProps> = ({ events, className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-4 h-4 text-neutral-500" />
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Timeline</h3>
        <Badge variant="secondary" className="text-xs">{events.length} events</Badge>
      </div>

      <div className="relative">
        {/* Timeline connector line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

        {events.map((event, index) => {
          const Icon = getEventIcon(event.type);
          const iconColor = getEventColor(event.type);
          const isConflict = event.type === 'conflict';

          return (
            <div key={index} className="relative pl-10 pb-6 last:pb-0">
              {/* Timeline dot with icon */}
              <div className={cn(
                "absolute left-0 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 z-10",
                iconColor
              )}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Event content */}
              <Card className={cn(
                "transition-all hover:shadow-md",
                isConflict && "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20"
              )}>
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar
                      name={event.agent.name}
                      initials={event.agent.avatar}
                      className="w-8 h-8 text-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                          {event.agent.name}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {event.agent.role}
                        </span>
                        <span className="text-xs text-neutral-400 ml-auto">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {event.content}
                      </p>
                    </div>
                  </div>

                  {/* Meta information */}
                  {event.meta && Object.keys(event.meta).length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="meta" className="border-b-0">
                          <AccordionTrigger className="py-1 hover:no-underline">
                            <span className="text-xs text-neutral-500">View Details</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2">
                            <div className="space-y-2 text-xs">
                              {Object.entries(event.meta).map(([key, value]) => {
                                if (key === 'tags' && Array.isArray(value)) {
                                  return (
                                    <div key={key} className="flex items-start gap-2">
                                      <span className="text-neutral-500 capitalize">{key}:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {value.map((tag: string, tagIdx: number) => (
                                          <Badge key={tagIdx} variant="outline" className="text-xs py-0 px-2">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={key} className="flex items-start gap-2">
                                    <span className="text-neutral-500 capitalize">{key}:</span>
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                      {Array.isArray(value) ? value.join(', ') : String(value)}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}

                  {/* Logic chain for system events */}
                  {event.logicChain && event.logicChain.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="logic" className="border-b-0">
                          <AccordionTrigger className="py-1 hover:no-underline">
                            <span className="text-xs text-neutral-500">View Logic Chain</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2">
                            <div className="space-y-2">
                              {event.logicChain.map((step, stepIdx) => (
                                <div key={stepIdx} className="flex items-center gap-2 text-xs">
                                  <div className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                                    {stepIdx + 1}
                                  </div>
                                  <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
