import { useState } from 'react';
import { KanbanColumn } from '@/data/missionControl';
import { Thread } from '@/data/mockData';
import { KanbanCard } from './KanbanCard';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, ChevronDown, AlignJustify } from 'lucide-react';

interface KanbanBoardProps {
  columns: KanbanColumn[];
  items?: Thread[];
}

export function KanbanBoard({ columns, items = [] }: KanbanBoardProps) {
  const safeItems = items || [];
  // State for the currently expanded column (null means all collapsed, though typically one is open)
  // Defaulting to the first column if available
  const [expandedColumnId, setExpandedColumnId] = useState<string | null>(columns[0]?.id || null);

  const toggleColumn = (id: string) => {
    setExpandedColumnId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex gap-4 h-full min-w-max pb-2">
      {columns.map((column) => {
        const columnItems = safeItems.filter((item) => item.status === column.id);
        const isCollapsed = expandedColumnId !== column.id;

        // Column specific styles
        const getColumnStyles = (id: string) => {
          switch (id) {
            case 'inbox': return { header: 'border-t-blue-500', bg: 'bg-slate-50/50' };
            case 'in-progress': return { header: 'border-t-amber-500', bg: 'bg-slate-50/50' };
            case 'review': return { header: 'border-t-purple-500', bg: 'bg-slate-50/50' };
            case 'blocked': return { header: 'border-t-rose-500', bg: 'bg-rose-50/30' };
            case 'done': return { header: 'border-t-emerald-500', bg: 'bg-emerald-50/30' };
            default: return { header: 'border-t-slate-300', bg: 'bg-slate-50/50' };
          }
        };

        const styles = getColumnStyles(column.id);

        return (
          <div
            key={column.id}
            className={cn(
              "flex flex-col h-full rounded-lg border border-slate-200/60 transition-all duration-300 ease-in-out overflow-hidden",
              styles.bg,
              isCollapsed ? "w-12" : "w-80"
            )}
          >
            {/* Column Header */}
            <div
              className={cn(
                "flex items-center bg-white/50 border-slate-200/60",
                isCollapsed
                  ? "flex-col py-3 border-r border-t-2 rounded-lg h-full gap-4"
                  : "justify-between p-3 border-b rounded-t-lg border-t-2",
                styles.header
              )}
            >
              {isCollapsed ? (
                <button
                  onClick={() => toggleColumn(column.id)}
                  className="p-1 hover:bg-slate-200/50 rounded text-slate-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-slate-700">{column.title}</h3>
                    <span className="text-xs text-slate-400 font-medium bg-white px-2 py-0.5 rounded border border-slate-100">
                      {columnItems.length}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleColumn(column.id)}
                    className="p-1 hover:bg-slate-200/50 rounded text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Column Items - Only show if not collapsed */}
            {!isCollapsed && (
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {columnItems.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm italic border-2 border-dashed border-slate-200/50 rounded-lg m-2">
                    No items
                  </div>
                ) : (
                  columnItems.map((item) => (
                    <KanbanCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      domain={item.slug || 'General'}
                      status={item.status}
                      priority={item.priority as any}
                      agents={item.events?.filter(e => e.agent).map(e => ({ name: e.agent.name, avatar: e.agent.avatar }))}
                      timestamp={item.events?.length > 0 ? item.events[item.events.length - 1].timestamp : undefined}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
