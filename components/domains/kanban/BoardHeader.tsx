import { cn } from "@/lib/utils";
import { ChevronDown, Settings } from "lucide-react";

interface BoardHeaderProps {
  workspaceName: string;
  workspaceStatus: "active" | "idle" | "error";
}

export function BoardHeader({ workspaceName, workspaceStatus }: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">{workspaceName}</h1>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <span className={cn(
          "px-3 py-1 text-sm font-medium rounded-full",
          workspaceStatus === "active" && "bg-emerald-50 text-emerald-700",
          workspaceStatus === "idle" && "bg-slate-100 text-slate-600",
          workspaceStatus === "error" && "bg-rose-50 text-rose-700"
        )}>
          {workspaceStatus}
        </span>
      </div>
      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}