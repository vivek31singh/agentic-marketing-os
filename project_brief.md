# Project Brief: agentic-marketing-os

## Project Type
Web Application (Frontend / Dashboard)

## Project Goals (Golden Context)
To create a production-ready, multi-page UI for the Agentic Marketing OS that replicates the look and feel of the provided TechStart/Doddle references. The application must feature a Discord-like persistent shell, navigable modules (SEO, Content, Social, etc.), detailed thread views with conflict resolution, agent scorecards, and rich interactive components, all driven by mock data.

## Current Status
- **Phase 1 & 2 Complete:** Project architecture and Design System (tokens, primitives) are fully implemented.
- **Mission Control Dashboard:** The main workspace overview is live, displaying system health, active threads, and module access via the `app/workspaces/[workspaceId]/page.tsx` route.

## Complexity
Moderate to High. While no backend logic is required, the project demands a high degree of UI fidelity, complex component composition (timelines, conflict panels, accordions), specific routing architecture, and intricate state management for simulating agent interactions and workflows.

## Tech Stack
Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React (Icons), React Hook Form (for inputs), Class Variance Authority (CVA) for component variants, Framer Motion (for transitions/accordions).