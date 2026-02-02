# Development Guidelines

## File Structure
```
app/
  layout.tsx (Root)
  workspaces/
    [workspaceId]/
      layout.tsx (Shell - LeftNav, TopBar, RightRail)
      page.tsx (Mission Control)
      mission-control/
        page.tsx
      modules/
        [moduleSlug]/
          page.tsx (General Module View)
          [threadSlug]/
            page.tsx (Thread Detail)
        seo-cluster/
          page.tsx
        content-factory/
          page.tsx
        social-growth/
          page.tsx
        saas-launch-ops/
          page.tsx
      settings/
        page.tsx
components/
  ui/ (Primitives: Button, Card, Badge, Avatar, ProgressBar, Tag, MetricStat, Accordion, SegmentedControl)
  layout/ (Shell parts: Sidebar, Topbar)
  domains/ (Feature specific: AgentScorecard, ConflictPanel, Timeline)
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
UI Skeletons during 'loading' states. Empty State components when data is missing. Error Boundary components to catch runtime errors. Try-catch blocks in mock API functions to simulate error scenarios (e.g., 'ERR_TIMEOUT_LLM').

## Dependencies
next: latest, react: latest, react-dom: latest, typescript: latest, tailwindcss: latest, lucide-react: latest, clsx: latest, tailwind-merge: latest, framer-motion: latest (for smooth animations), class-variance-authority: latest.

## Configuration
- next.config.js (standard config)
- tailwind.config.ts (Imports `theme` from `lib/theme.ts` for colors, fonts, animation definitions)
- tsconfig. (path aliases, strict mode)
- .eslintrc. (airbnb or standard next rules)