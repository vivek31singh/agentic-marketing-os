# Technical Specification

## Architecture Patterns
Layout Shells (Server Components for layout, Client Components for interactivity), Atomic Design methodology (Atoms, Molecules, Organisms), Provider Pattern (for global UI state/theme), Composition Pattern (for complex cards), Component Variants (using CVA or Tailwind variants).

## Component Hierarchy
AppLayout -> WorkspaceShell -> (LeftNav, TopBar, MainContent, RightRail). Page Components -> DomainSpecificSections (e.g., AgentTimeline, ConflictPanel). UI Primitives -> Button, Card, Badge, Avatar, Accordion, Modal.

## Data Models
Workspace: { id, name, status, health }. Module: { id, name, description, activeThreadsCount }. Thread: { id, title, status, objective, events: Event[] }. Agent: { id, name, role, avatar, metrics: { accuracy, latency } }. Event: { type: 'message' | 'conflict' | 'system', timestamp, agent, content, logicChain?, meta? }. Conflict: { id, reason, options: Option[] }. Option: { agent, description, label, outcome }.

## API Design
N/A (UI Only). Mock functions in `/lib/apiMock.ts` will simulate async data fetching using `Promise.resolve` with delays to mimic loading states. Endpoints to mock: `getWorkspace(id)`, `getModule(id)`, `getThread(id)`, `postCommand(threadId, text)`.
