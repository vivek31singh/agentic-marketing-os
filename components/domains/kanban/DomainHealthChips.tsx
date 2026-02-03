import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DomainHealth {
  name: string;
  health: 'healthy' | 'warning' | 'error' | 'pending';
  count?: number;
}

interface DomainHealthChipsProps {
  domains: DomainHealth[];
}

export function DomainHealthChips({ domains }: DomainHealthChipsProps) {
  const healthConfig = {
    healthy: {
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    },
    warning: {
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      className: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    },
    error: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      className: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
    },
    pending: {
      icon: <Clock className="w-3.5 h-3.5" />,
      className: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100',
    },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {domains.map((domain, index) => {
        const config = healthConfig[domain.health];
        return (
          <button
            key={index}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
              config.className
            )}
          >
            {config.icon}
            <span>{domain.name}</span>
            {domain.count !== undefined && (
              <span className="bg-white/50 px-1 rounded">{domain.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
