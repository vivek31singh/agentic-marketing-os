import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BoardHeaderProps {
  workspaceName: string;
  workspaceId: string;
  status: 'active' | 'idle' | 'error';
}

export function BoardHeader({ workspaceName, workspaceId, status }: BoardHeaderProps) {
  const statusColors = {
    active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    idle: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    error: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-slate-900">{workspaceName}</h1>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <Badge 
          variant="outline" 
          className={statusColors[status]}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <span className="text-sm text-slate-500">Mission Control</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-600 hover:bg-slate-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
