# Project Brief: agentic-marketing-os

## Project Type
Web Application (Frontend / Dashboard)

## Project Goals (Golden Context)
To create a production-ready, multi-page UI for the Agentic Marketing OS that replicates the look and feel of the provided TechStart/Doddle references. The application must feature a Discord-like persistent shell, navigable modules (SEO, Content, Social, etc.), detailed thread views with conflict resolution, agent scorecards, and rich interactive components, all driven by mock data.

## Current Status
- **Phase 1 & 2 Complete:** Project architecture, Workspace Shell, and Design System (tokens, primitives) are fully implemented.
- **Mission Control Dashboard:** The main workspace overview is live, displaying system health, active threads, and module access.
- **Module Implementation:** The SEO Cluster, Content Factory, Social Growth, and SaaS Launch Ops modules have been implemented with specific views and metrics. 
- **Workspace Settings:** Implemented with views for General Information, Integrations, and Guardrails.
- **Thread Detail View & Interactivity:** Implemented with domain components for `ThreadTimeline` and `ConflictPanel`. Interactivity (conflict resolution approval, recovery actions) has been added to key modules using client-side state management.
- **Send Command Functionality:** Users can now send commands in the Thread Detail View, appending new user events to the timeline dynamically.
- **Agent Scorecards:** Implemented in the Right Rail (and specific page contexts) to display active agent details (name, role) and performance metrics (Accuracy, Latency).
- **View Toggles:** Implemented in the Thread Detail view to switch between Standard, Logic, and Debug modes, allowing users to inspect logic chains and metadata.
- **Root Landing Page:** Implemented to display a list of available workspaces and provide navigation links to specific workspace IDs.
- **Modal UI Primitive:** Implemented in `components/ui/Modal.tsx` to support overlay interactions and dialogs.
- **Loading & Error States:** Implemented `Skeleton` and `EmptyState` UI primitives. Added `loading.tsx` and `error.tsx` boundaries for the Workspace and Mission Control routes to improve UX during data fetching and failure scenarios.

## Complexity
Moderate to High. While no backend logic is required, the project demands a high degree of UI fidelity, complex component composition (timelines, conflict panels, accordions), specific routing architecture, and intricate state management for simulating agent interactions and workflows.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React (Icons), React Hook Form (for inputs), Class Variance Authority (CVA) for component variants, Framer Motion (for transitions/accordions).


---