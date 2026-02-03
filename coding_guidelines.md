# Development Guidelines

## File Structure
```
app/
  layout.tsx (Root)
  page.tsx (Root Landing Page)
  workspaces/
    [workspaceId]/
      layout.tsx (Shell - LeftNav, TopBar, RightRail)
      loading.tsx (Loading Boundary - Skeletons)
      error.tsx (Error Boundary - EmptyState)
      page.tsx (Mission Control)
      mission-control/
        loading.tsx
        page.tsx
      modules/
        [moduleSlug]/
          page.tsx (General Module View)
          loading.tsx (Module Loading Boundary)
          error.tsx (Module Error Boundary)
          [threadSlug]/
            page.tsx (Thread Detail)
            loading.tsx (Thread Loading Boundary)
            error.tsx (Thread Error Boundary)
        seo-cluster/
          page.tsx
          loading.tsx
          error.tsx
        content-factory/
          page.tsx
          loading.tsx
          error.tsx
        social-growth/
          page.tsx
          loading.tsx
          error.tsx
        saas-launch-ops/
          page.tsx
          loading.tsx
          error.tsx
      settings/
        page.tsx
components/
  ui/ (Primitives: Button, Card, Badge, Avatar, ProgressBar, Tag, MetricStat, Accordion, SegmentedControl, Modal, Skeleton, EmptyState)
  layout/ (Shell parts: Sidebar, Topbar)
  domains/ (Feature specific: AgentScorecard, ConflictPanel, Timeline, KanbanBoard, BoardHeader, LiveActivityRail)
  providers/
data/
  mockData.ts (Interfaces and Mock Data)
  missionControl.ts
  seoCluster.ts
  contentFactory.ts
  socialGrowth.ts
  saasLaunchOps.ts
  workspaceSettings.ts
lib/
  utils.ts
  theme.ts (Design Tokens)
hooks/
```

## Naming Conventions
Files: PascalCase for components (e.g., `AgentScorecard.tsx`), camelCase for utilities/hooks (e.g., `useMockData.ts`). Directories: kebab-case or camelCase. Components: PascalCase. Functions/Variables: camelCase. Constants: UPPER_SNAKE_CASE.

## Coding Standards
- Use TypeScript strict mode.
- Functional components with Hooks.
- Use 'use client' directive only when necessary for interactivity (state/event listeners).
- Prefer Server Components for layouts and data fetching.
- Use Tailwind CSS for all styling, avoiding inline styles.
- Use Lucide React for icons.
- Maintain clear separation between UI logic and business logic.
- Use Class Variance Authority (CVA) for component variant definitions (e.g., Button, Badge).

## Testing Strategy
Visual Testing: Ensure pages match reference designs manually. Unit Testing: Test logic for conflict resolution and state changes using Jest/React Testing Library. E2E Testing: Use Playwright to verify critical paths (Navigation to modules, clicking 'Approve' buttons).

## Error Handling
- **Loading States:** UI Skeletons during 'loading' states. Implemented via Next.js `loading.tsx` files which utilize the `Skeleton` component to mimic the structure of the page being loaded (e.g., MetricStats, Cards, Sidebars, Timelines).
- **Error States:** Empty State components when data is missing or runtime errors occur. Implemented via Next.js `error.tsx` files utilizing the `EmptyState` component to provide user-friendly feedback and recovery actions. This applies to all routing levels (Workspace, Modules, Threads).

## Dependencies
next: latest, react: latest, react-dom: latest, typescript: latest, tailwindcss: latest, lucide-react: latest, clsx: latest, tailwind-merge: latest, framer-motion: latest (for smooth animations), class-variance-authority: latest.

## Configuration
- next.config.js (standard config)
- tailwind.config.ts (Imports `theme` from `lib/theme.ts` for colors, fonts, animation definitions)
- tsconfig. (path aliases, strict mode)
- .eslintrc. (airbnb or standard next rules)


---