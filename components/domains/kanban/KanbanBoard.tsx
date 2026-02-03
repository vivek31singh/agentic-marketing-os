import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { KanbanCard } from './KanbanCard';
import { DomainHealthChips } from './DomainHealthChips';

interface Column {
  id: string;
  title: string;
  status: string;
  count: number;
  color: string;
}

interface KanbanBoardProps {
  columns: Column[];
  cards: any[];
  domains: any[];
}

export function KanbanBoard({ columns, cards, domains }: KanbanBoardProps) {
  const columnColors = {
    inbox: 'border-slate-300 bg-slate-50/50',
    'in-progress': 'border-blue-300 bg-blue-50/30',
    review: 'border-amber-300 bg-amber-50/30',
    blocked: 'border-rose-300 bg-rose-50/30',
    done: 'border-emerald-300 bg-emerald-50/30',
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-320px)] min-h-0">
      {columns.map((column) => {
        const columnCards = cards.filter((card) => card.status === column.status);
        
        return (
          <div
            key={column.id}
            className={cn(
              "flex-1 min-w-[280px] max-w-[350px] flex flex-col rounded-xl border-2",
              columnColors[column.id as keyof typeof columnColors]
            )}
          >
            <div className="px-4 py-3 border-b border-slate-200/60">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{column.title}</h3>
                <span className="text-xs font-medium px-2 py-0.5 bg-white rounded-full border border-slate-200 text-slate-600">
                  {column.count}
                </span>
              </div>
              {column.id === 'inbox' && (
                <DomainHealthChips domains={domains} />
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {columnCards.map((card) => (
                <KanbanCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  domain={card.domain}
                  status={card.status}
                  priority={card.priority}
                  agent={card.agent}
                  eventsCount={card.eventsCount}
                  attachmentsCount={card.attachmentsCount}
                />
              ))}
              
              {columnCards.length === 0 && (
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-xs text-slate-400">No cards</p>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-slate-200/60">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
