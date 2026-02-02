# Implementation Plan

## Core Features
- [x] Discord-like Workspace Shell (persistent nav)
- [x] Mission Control Dashboard (domain snapshots, system health)
- [x] SEO Cluster Module (technical health threads, crawl logs)
- [x] Content Factory Module (Q1 blog strategy, content velocity)
- [x] Social Growth Module (viral lab, trend alerts)
- [x] SaaS Launch Ops (content factory pipelines, asset approval)
- [x] Workspace Settings (integrations, guardrails)
- [x] Interactive Components (conflict resolution panels, accordions)
- [x] Send Command Simulation (appending events to timeline)
- [ ] Agent Scorecards (detailed diagnostics in right sidebar)

## User Stories
As a user, I want to view a Mission Control dashboard to see the overall health of the system. As a user, I want to navigate to specific modules like 'SEO_Cluster', 'Content_Factory', 'Social_Growth', and 'SaaS_Launch_Ops' to view detailed threads. As a user, I want to resolve conflicts between agents (e.g., Tech_Lead vs Crawl_Spider) by selecting an option in the Thread Detail view. As a user, I want to view agent scorecards and diagnostics in the right sidebar. As a user, I want to send commands to threads and see them appear in the timeline. As a user, I want to toggle between 'Logic', 'Debug Log', and standard views. As a user, I want to manage workspace settings such as integrations and guardrails.

## Acceptance Criteria
All routes specified in the prompt resolve correctly. The UI matches the visual fidelity of the references (fonts, colors, card styles). Left sidebar and top bar are persistent. Right sidebar is context-aware. Action buttons (Approve, Retry) update the local state/UI immediately. Accordions expand and collapse smoothly. Data is mocked in a centralized `/data` directory. No real backend calls are made. The application is responsive.

## Implementation Steps
- **Phase 1: UI Architecture** - **Complete**. Set up Next.js project, define route structure in `app/` directory, and implement the persistent workspace shell (left nav, top bar, main content, right rail).
- **Phase 2: Design System** - **Complete**. Define design tokens (colors, typography, spacing) and build core UI primitives (Buttons, Cards, Accordions, Modals, Status Chips).
- **Phase 3: Domain Implementation** - **Complete**.
    - [x] Build specific pages for Mission Control.
    - [x] Build SEO Cluster Module page with specific metrics (`data/seoCluster.ts`).
    - [x] Build Content Factory Module page with specific metrics (`data/contentFactory.ts`).
    - [x] Build Social Growth Module page with specific metrics (`data/socialGrowth.ts`).
    - [x] Build Thread Detail View with `ConflictPanel` and `ThreadTimeline` (`data/threadData.ts`).
    - [x] Build SaaS Launch Ops Module (`data/saasLaunchOps.ts`).
    - [x] Build Workspace Settings (`data/workspaceSettings.ts`).
- **Phase 4: State & Interactivity** - **Complete**. Implemented client-side state management for conflict resolution (Option selection), accordions, toggles, and simulating 'Send Command' actions. Recovery/Error actions (Retry, Auto-Fix) now update UI state immediately.
- **Phase 5: Data & Polish** - **In Progress**. Create robust mock data structure for specific modules. Ensure responsive behavior and perform QA against reference designs.


---