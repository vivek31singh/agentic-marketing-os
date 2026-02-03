import React from 'react';
import { cn } from '@/lib/utils';
import { KanbanCard } from './KanbanCard';
import type { Thread } from '@/data/mockData';

export interface KanbanBoardProps {
  items?: Thread[];
}

const columns = [
  { id: 'inbox', label: 'Inbox', color: 'slate' },
  { id: 'in-progress', label: 'In Progress', color: 'blue' },
  { id: 'review', label: 'Review', color: 'amber' },
  { id: 'blocked', label: 'Blocked', color: 'rose' },
  { id: 'done', label: 'Done', color: 'emerald' },
] as const;

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ items = [] }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnItems = items.filter((item) => 
          item.status?.toLowerCase().replace(/\s+/g, '-') === column.id ||
          item.status?.toLowerCase() === column.id.replace(/-/g, ' ')
        );

        const colorClasses = {
          slate: 'bg-slate-50 border-slate-200',
          blue: 'bg-blue-50 border-blue-200',
          amber: 'bg-amber-50 border-amber-200',
          rose: 'bg-rose-50 border-rose-200',
          emerald: 'bg-emerald-50 border-emerald-200',
        };

        return (
          <div
            key={column.id}
            className={cn(
              'flex-shrink-0 w-72 rounded-lg border p-3',
              colorClasses[column.color]
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-slate-700">{column.label}</h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600 shadow-sm">
                {columnItems.length}
              </span>
            </div>
            <div className="space-y-2">
              {columnItems.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
              {columnItems.length === 0 && (
                <div className="py-8 text-center text-sm text-slate-400">
                  No items
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};