import { KanbanColumn } from '@/data/missionControl';
import { Thread } from '@/data/mockData';
import { KanbanCard } from './KanbanCard';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  columns: KanbanColumn[];
  items?: Thread[]; // Made optional with safety check
}

export function KanbanBoard({ columns, items = [] }: KanbanBoardProps) {
  // Safety check: if items is undefined or null, use empty array
  const safeItems = items || [];

  return (
    <div className="flex gap-4 h-full min-w-max">
      {columns.map((column) => {
        // Filter items for this column - now safely handled with safeItems
        const columnItems = safeItems.filter((item) => item.status === column.id);
        
        return (
          <div
            key={column.id}
            className="flex flex-col w-72 h-full bg-muted/30 rounded-lg border border-border/50"
          >
            {/* Column Header */}
            <div className="p-3 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                column.id === 'inbox' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                column.id === 'in-progress' && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                column.id === 'review' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                column.id === 'blocked' && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
                column.id === 'done' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              )}>
                {columnItems.length}
              </span>
            </div>
            
            {/* Column Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {columnItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No items
                </div>
              ) : (
                columnItems.map((item) => (
                  <KanbanCard key={item.id} thread={item} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
