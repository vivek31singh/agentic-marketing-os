import { cn } from "@/lib/utils";

export interface KanbanColumn {
  id: string;
  title: string;
  status: string;
  count: number;
}

export interface KanbanItem {
  id: string;
  title: string;
  domain: string;
  priority: "high" | "medium" | "low";
  status: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
}

export function KanbanBoard({ columns, items }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnItems = items.filter((item) => item.status === column.id);
        return (
          <div
            key={column.id}
            className={cn(
              "flex-shrink-0 w-80 bg-white rounded-lg border border-slate-200 p-4"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">{column.title}</h3>
              <span className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                column.id === "inbox" && "bg-slate-100 text-slate-600",
                column.id === "in-progress" && "bg-blue-50 text-blue-600",
                column.id === "review" && "bg-amber-50 text-amber-600",
                column.id === "blocked" && "bg-rose-50 text-rose-600",
                column.id === "done" && "bg-emerald-50 text-emerald-600"
              )}>
                {column.count}
              </span>
            </div>
            <div className="space-y-3">
              {columnItems.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({ item }: { item: KanbanItem }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium rounded",
          item.priority === "high" && "bg-rose-100 text-rose-700",
          item.priority === "medium" && "bg-amber-100 text-amber-700",
          item.priority === "low" && "bg-slate-100 text-slate-600"
        )}>
          {item.priority}
        </span>
        <span className="text-xs text-slate-400">{item.domain}</span>
      </div>
      <p className="text-sm font-medium text-slate-800">{item.title}</p>
    </div>
  );
}