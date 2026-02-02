'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Clock,
  Bot,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface Conflict {
  id: string;
  reason: string;
  options: Option[];
  status?: 'pending' | 'resolved';
}

export interface Option {
  agent: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  description: string;
  label: string;
  outcome: string;
}

interface ConflictPanelProps {
  conflict: Conflict;
  onResolve?: (optionId: string) => void;
  className?: string;
}

export const ConflictPanel: React.FC<ConflictPanelProps> = ({ 
  conflict, 
  onResolve,
  className 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const isResolved = conflict.status === 'resolved';

  const handleResolve = () => {
    if (selectedOption && onResolve) {
      onResolve(selectedOption);
    }
  };

  return (
    <Card className={cn('border-warning/50 bg-warning/5', className)}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b border-warning/20 cursor-pointer hover:bg-warning/10 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Agent Conflict Detected</h3>
            <p className="text-sm text-muted-foreground">{conflict.reason}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isResolved && (
            <Badge variant="success" className="gap-1">
              <CheckCircle className="w-3 h-3" />
              Resolved
            </Badge>
          )}
          <ChevronRight 
            className={cn(
              'w-5 h-5 text-muted-foreground transition-transform',
              isExpanded ? 'rotate-90' : ''
            )} 
          />
        </div>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              {/* Options List */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Proposed Resolutions
                </h4>
                
                {conflict.options.map((option, index) => {
                  const isSelected = selectedOption === option.label;
                  const isResolvedThis = isResolved && conflict.options[0]?.label === option.label;
                  
                  return (
                    <div
                      key={index}
                      onClick={() => !isResolved && setSelectedOption(option.label)}
                      className={cn(
                        'p-4 rounded-lg border-2 cursor-pointer transition-all',
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : isResolvedThis
                          ? 'border-success bg-success/5'
                          : 'border-border hover:border-primary/30 hover:bg-primary/5'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar
                          src={option.agent.avatar}
                          fallback={option.agent.name.charAt(0)}
                          className="w-8 h-8 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground text-sm">
                              {option.agent.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {option.agent.role}
                            </Badge>
                            {(isSelected || isResolvedThis) && (
                              <CheckCircle className="w-4 h-4 text-success ml-auto" />
                            )}
                          </div>
                          <p className="text-sm text-foreground mb-2">{option.description}</p>
                          <div className="flex items-start gap-2 text-xs text-muted-foreground">
                            <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" />
                            <span>{option.outcome}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {!isResolved && (
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={handleResolve}
                    disabled={!selectedOption}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolve with Selected Option
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOption(null)}
                    disabled={!selectedOption}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {/* Resolution Info */}
              {isResolved && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-sm text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span>Conflict resolved. System proceeding with selected path.</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ConflictPanel;