import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { MetricStat } from "../ui/MetricStat";
import { Activity, Zap } from "lucide-react";

export interface AgentScorecardProps {
  agent: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    metrics: {
      accuracy: number;
      latency: number;
    };
  };
  isActive?: boolean;
}

export function AgentScorecard({ agent, isActive = false }: AgentScorecardProps) {
  const { name, role, avatar, metrics } = agent;

  return (
    <Card className={"p-4 border-l-4 " + (isActive ? "border-l-primary" : "border-l-transparent")}>
      <div className="flex items-start gap-3">
        <Avatar src={avatar} alt={name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm text-foreground truncate">{name}</h3>
            {isActive && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {role}
          </Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <MetricStat
          label="Accuracy"
          value={`${metrics.accuracy}%`}
          icon={Activity}
          change={metrics.accuracy}
          changeType="percentage"
          size="sm"
        />
        <MetricStat
          label="Latency"
          value={`${metrics.latency}ms`}
          icon={Zap}
          change={metrics.latency <= 500 ? 100 : metrics.latency <= 1000 ? 0 : -100}
          changeType="percentage"
          size="sm"
        />
      </div>
    </Card>
  );
}

/**
 * AgentScorecardList - Displays multiple agent scorecards in a list
 */
export interface AgentScorecardListProps {
  agents: AgentScorecardProps["agent"][];
  title?: string;
  activeAgentId?: string;
}

export function AgentScorecardList({ 
  agents, 
  title = "Active Agents", 
  activeAgentId 
}: AgentScorecardListProps) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No active agents
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {agents.map((agent) => (
          <AgentScorecard
            key={agent.id}
            agent={agent}
            isActive={agent.id === activeAgentId}
          />
        ))}
      </div>
    </div>
  );
}
