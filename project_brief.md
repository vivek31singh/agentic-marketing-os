# Project Brief: agentic-marketing-os

## Project Type
Web Application (Frontend / Dashboard)

## Project Goals (Golden Context)
To create a production-ready, multi-page UI for the Agentic Marketing OS that replicates the look and feel of the provided TechStart/Doddle references. The application must feature a Discord-like persistent shell, a Kanban-style Mission Control board, navigable modules (SEO, Content, Social, etc.), detailed thread views with conflict resolution, agent scorecards, and rich interactive components, all driven by mock data.

## Current Status
- **Phase 1 & 2 Complete:** Project architecture, Workspace Shell, and Design System (tokens, primitives) are fully implemented.
- **Mission Control Dashboard:** Refactored to a Kanban-style board. Features `BoardHeader`, `BoardInsightsStrip` (KPI chips), `KanbanBoard` (Inbox, In Progress, Review, etc.), and a `LiveActivityRail` for real-time event monitoring.
- **Module Implementation:** The SEO Cluster, Content Factory, Social Growth, and SaaS Launch Ops modules have been implemented with specific views, metrics, and full interactivity (conflict resolution, recovery actions).
- **Workspace Settings:** Implemented with views for General Information, Integrations, and Guardrails.
- **Thread Detail View & Interactivity:** Implemented with domain components for `ThreadTimeline` and `ConflictPanel`. Includes View Toggles (Standard, Logic, Debug), "Send Command" functionality, and Agent Scorecards.
- **Root Landing Page:** Implemented to display a list of available workspaces.
- **Comprehensive Loading & Error States:** Fully implemented `Skeleton` and `EmptyState` primitives. Added boundaries (`loading.tsx`, `error.tsx`) for Workspace, Mission Control, all specific Module sub-pages, Thread Detail views, and Settings, ensuring graceful degradation and loading indicators at every routing level.
- **Bug Fixes:** Resolved import errors, TypeScript strict mode issues, and `undefined` prop handling in Kanban components.

## Complexity
Moderate to High. While no backend logic is required, the project demands a high degree of UI fidelity, complex component composition (timelines, conflict panels, accordions, kanban boards), specific routing architecture, and intricate state management for simulating agent interactions and workflows.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React (Icons), React Hook Form (for inputs), Class Variance Authority (CVA) for component variants, Framer Motion (for transitions/accordions).