import { cn } from "@/lib/utils";

export interface KanbanCardProps {
  id: string;
  title: string;
  domain: string;
  priority: "high" | "medium" | "low";
  status: string;
  assignee?: string;
}

export function KanbanCard({ title, domain, priority, assignee }: KanbanCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <span className={cn(
          "px-2 py-0.5 text-xs font-medium rounded-full uppercase tracking-wide",
          priority === "high" && "bg-rose-100 text-rose-700",
          priority === "medium" && "bg-amber-100 text-amber-700",
          priority === "low" && "bg-slate-100 text-slate-600"
        )}>
          {priority}
        </span>
        <span className="text-xs text-slate-400 font-medium">{domain}</span>
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h4>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {assignee && (
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-600">
              {assignee.charAt(0)}
            </div>
          )}
        </div>
        <span className="text-xs text-slate-400">2h ago</span>
      </div>
    </div>
  );
}