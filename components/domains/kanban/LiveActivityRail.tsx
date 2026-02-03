import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export interface LiveActivity {
  id: string;
  agent: string;
  action: string;
  target: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

interface LiveActivityRailProps {
  activities: LiveActivity[];
}

export function LiveActivityRail({ activities }: LiveActivityRailProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 h-fit">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-slate-500" />
        <h3 className="font-semibold text-slate-800">Live Activity</h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "p-3 rounded-lg border",
              activity.type === "success" && "bg-emerald-50 border-emerald-100",
              activity.type === "warning" && "bg-amber-50 border-amber-100",
              activity.type === "info" && "bg-blue-50 border-blue-100"
            )}
          >
            <div className="flex items-start justify-between mb-1">
              <span className="font-medium text-slate-800">{activity.agent}</span>
              <span className="text-xs text-slate-500">{activity.timestamp}</span>
            </div>
            <p className="text-sm text-slate-600">
              {activity.action} <span className="font-medium">{activity.target}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}