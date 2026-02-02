# Technical Specification

## Architecture Patterns
Layout Shells (Server Components for layout, Client Components for interactivity), Atomic Design methodology (Atoms, Molecules, Organisms), Provider Pattern (for global UI state/theme), Composition Pattern (for complex cards), Component Variants (using CVA or Tailwind variants).

## Component Hierarchy
AppLayout -> WorkspaceShell -> (LeftNav, TopBar, MainContent, RightRail). Page Components -> DomainSpecificSections (e.g., AgentTimeline, ConflictPanel). UI Primitives -> Button, Card, Badge, Avatar, Accordion, Modal, MetricStat, Tag, ProgressBar.

## Data Models

**Interfaces defined in `/data/mockData.ts`:**

```typescript
// Workspace: Represents a specific organization or project context
Workspace {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  health: number; // 0-100
}

// Module: Specific functional areas within a workspace (e.g., SEO, Content)
Module {
  id: string;
  name: string;
  description: string;
  activeThreadsCount: number;
}

// Thread: A specific task or conversation sequence managed by agents
Thread {
  id: string;
  title: string;
  status: string;
  objective: string;
  events: Event[];
}

// Agent: AI entities performing tasks
Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    accuracy: number;
    latency: number;
  };
}

// Event: Individual actions within a thread
Event {
  type: 'message' | 'conflict' | 'system';
  timestamp: string;
  agent: Agent;
  content: string;
  logicChain?: string[];
  meta?: Record<string, any>;
}

// Conflict: A disagreement between agents requiring resolution
Conflict {
  id: string;
  reason: string;
  options: Option[];
}

// Option: A proposed resolution to a conflict
Option {
  agent: Agent;
  description: string;
  label: string;
  outcome: string;
}
```

## API Design
N/A (UI Only). Mock functions in `/lib/apiMock.ts` will simulate async data fetching using `Promise.resolve` with delays to mimic loading states. Endpoints to mock: `getWorkspace(id)`, `getModule(id)`, `getThread(id)`, `postCommand(threadId, text)`. 

## Design System Integration
- **Tokens**: Defined in `lib/theme.ts` and imported into `tailwind.config.ts`.
- **Variants**: Components use `class-variance-authority` (CVA) for consistent styling (e.g., `buttonVariants`, `badgeVariants`).
- **Color Naming**: Standardized to semantic names (primary, neutral, success, warning, danger) aligned with `lib/theme.ts`.
