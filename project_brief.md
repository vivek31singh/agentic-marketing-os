# Project Brief: agentic-marketing-os

## Project Type
Web Application (Frontend / Dashboard)

## Project Goals (Golden Context)
To create a production-ready, multi-page UI for the Agentic Marketing OS that replicates the look and feel of the provided TechStart/Doddle references. The application must feature a Discord-like persistent shell, navigable modules (SEO, Content, Social, etc.), detailed thread views with conflict resolution, agent scorecards, and rich interactive components, all driven by mock data.

## Current Status
- **Phase 1 & 2 Complete:** Project architecture, Workspace Shell, and Design System (tokens, primitives) are fully implemented.
- **Mission Control Dashboard:** Refactored to a Kanban-style board with a Live Activity Rail. Features dynamic KPI chips, drag-and-drop style columns (Inbox, In Progress, Review, etc.), and a real-time activity feed.
- **Module Implementation:** The SEO Cluster, Content Factory, Social Growth, and SaaS Launch Ops modules have been implemented with specific views, metrics, and interactivity. 
- **Workspace Settings:** Implemented with views for General Information, Integrations, and Guardrails.
- **Thread Detail View & Interactivity:** Implemented with domain components for `ThreadTimeline` and `ConflictPanel`. Interactivity (conflict resolution approval, recovery actions) has been added to key modules using client-side state management. Includes View Toggles (Standard, Logic, Debug) and "Send Command" functionality.
- **Agent Scorecards:** Implemented in the Right Rail (and specific page contexts) to display active agent details (name, role) and performance metrics (Accuracy, Latency).
- **Root Landing Page:** Implemented to display a list of available workspaces and provide navigation links to specific workspace IDs.
- **Comprehensive Loading & Error States:** Implemented `Skeleton` and `EmptyState` primitives. Added boundaries for Workspace, Mission Control, **all specific Module sub-pages**, and **Thread Detail views**, ensuring graceful degradation and loading indicators at every routing level.

## Complexity
Moderate to High. While no backend logic is required, the project demands a high degree of UI fidelity, complex component composition (timelines, conflict panels, accordions, kanban boards), specific routing architecture, and intricate state management for simulating agent interactions and workflows.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React (Icons), React Hook Form (for inputs), Class Variance Authority (CVA) for component variants, Framer Motion (for transitions/accordions).


---

---