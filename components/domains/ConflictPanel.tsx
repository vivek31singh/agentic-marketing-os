import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ConflictPanelProps {
  conflict: any;
  selectedOptionId?: string | null;
  onApprove: (optionId: string) => void;
}

export function ConflictPanel({ conflict, selectedOptionId, onApprove }: ConflictPanelProps) {
  const isSelected = (optionId: string) => selectedOptionId === optionId;

  return (
    <Card className="p-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-error" />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">Agent Conflict Detected</h3>
          <p className="text-xs text-muted-foreground">{conflict.reason}</p>
        </div>
      </div>

      <div className="space-y-2">
        {conflict.options?.map((option: any) => (
          <div
            key={option.id}
            className={cn(
              'p-3 rounded-lg border transition-all',
              isSelected(option.id)
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{option.agent.avatar}</span>
                <div>
                  <span className="font-medium text-sm">{option.agent.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {option.agent.role}
                  </Badge>
                </div>
              </div>
              {isSelected(option.id) && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}
            </div>

            <p className="text-sm mb-2">{option.description}</p>
            <p className="text-xs text-muted-foreground mb-3">
              <span className="font-medium">Expected Outcome:</span> {option.outcome}
            </p>

            {!isSelected(option.id) && (
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => onApprove(option.id)}
              >
                Approve This Solution
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}