export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];

  upvotes: number;
}

export const promptCategories = [
  { id: "all", label: "All" },
  { id: "debug", label: "Debug" },
  { id: "ui", label: "UI/UX" },
  { id: "product", label: "Product" },
] as const;

export const prompts: Prompt[] = [
  {
    id: "performance-audit",
    title: "Performance Audit",
    description: "Deep analysis of code for performance bottlenecks with prioritized, quantified fixes.",
    category: "debug",
    tags: ["performance", "optimization", "profiling", "complexity", "memory", "react", "database"],

    upvotes: 0,
    prompt: `Analyze this code for performance bottlenecks. Be specific — reference exact lines, quantify impact, and show fixed code.

## What to look for

### 1. Time complexity
- Flag any O(n²) or worse operations (nested loops over the same or related data, repeated .find()/.filter()/.includes() inside loops).
- Check for unnecessary sorting, redundant iterations, or work that could be replaced with a hash map / Set lookup.

### 2. Unnecessary re-renders & redundant computation (React)
- Components re-rendering due to unstable references (inline objects/arrays/callbacks in JSX, missing useMemo/useCallback where it matters).
- Expensive derived state recomputed on every render instead of being memoized.
- State stored too high in the tree causing cascading re-renders.
- Missing \`key\` props or keys that change unnecessarily.

### 3. Database & data-fetching efficiency
- N+1 query patterns (fetching related records inside a loop instead of batching/joining).
- Missing indexes on columns used in WHERE, JOIN, or ORDER BY clauses.
- SELECTing columns that aren't needed (SELECT * on wide tables).
- Unbounded queries with no LIMIT that could return massive result sets.
- Sequential awaits that could run in parallel with Promise.all().

### 4. Memory leaks & excessive allocations
- Event listeners, subscriptions, or timers not cleaned up on unmount.
- Accumulating data in closures, caches, or global state without eviction.
- Creating large intermediate data structures (spreading huge arrays, deep cloning when unnecessary).

### 5. Blocking operations
- Synchronous file I/O, heavy computation, or JSON.parse on large payloads on the main thread.
- Missing streaming/pagination for large data sets.
- Long-running loops without yielding (blocking the event loop in Node or the UI thread in the browser).

## How to report each issue

For every issue found:
1. **Location** — file and line number.
2. **Problem** — what the bottleneck is and why it matters.
3. **Impact** — quantify where possible (e.g., "O(n) → O(1) lookup, ~100× faster at 10k items").
4. **Before** — the problematic code snippet.
5. **After** — the optimized implementation.

## Output format

Return a numbered list sorted by estimated impact (highest first). End with a short summary table:

| # | Issue | Severity | Estimated improvement |
|---|-------|----------|----------------------|

If no significant bottlenecks are found, say so — don't invent issues.`,
  },
  {
    id: "product-audit",
    title: "Product Audit",
    description: "PM-lens review of a feature or app — gaps in UX flows, missing edge cases, and prioritized improvements.",
    category: "product",
    tags: ["product", "audit", "ux", "flows", "edge-cases", "requirements", "prd"],
    upvotes: 0,
    prompt: `You are a senior product manager auditing this product/feature. Be blunt, specific, and actionable — no filler.

## User flows & journeys

### 1. Happy path completeness
- Can a new user accomplish the core task without confusion or dead ends?
- Are there missing steps, unclear CTAs, or moments where the user has to guess what to do next?
- Is the onboarding flow frictionless or does it ask for too much too early?

### 2. Edge cases & error states
- What happens when inputs are empty, malformed, or at boundary limits?
- Are error messages helpful and specific, or generic "something went wrong" walls?
- What happens on slow connections, timeouts, or partial failures?
- How does the product behave with zero data, one item, and 10,000 items?

### 3. Missing flows
- Is there account recovery / password reset?
- Can users undo destructive actions (delete, cancel, remove)?
- Are there confirmation steps before irreversible operations?
- What happens when a session expires mid-task?

## Feature completeness

### 4. Table-stakes features
- Search, filter, sort, pagination — are the basics covered?
- Does the feature handle multi-user / concurrent access correctly?
- Is there proper loading, empty, and error state for every async operation?

### 5. Notification & feedback loops
- Does the user know when an action succeeded or failed?
- Are long-running operations communicated (progress bars, status updates)?
- Are there appropriate confirmation/success messages?

## Business & growth

### 6. Conversion & retention risks
- Where are users most likely to drop off and why?
- Are there unnecessary steps that add friction without adding value?
- Is the value proposition clear within the first 30 seconds?

### 7. Analytics & observability gaps
- Are key user actions tracked (signups, conversions, feature usage)?
- Can you answer "is this feature successful?" with current instrumentation?
- Are there blind spots where user behavior is unmeasured?

## How to report each issue

For every issue found:
1. **Where** — screen, flow, or feature area.
2. **Problem** — what's wrong or missing from the user's perspective.
3. **Impact** — who is affected and how badly (e.g., "blocks 100% of new users", "confuses power users on export").
4. **Recommendation** — concrete fix with scope estimate (quick win / medium / large).
5. **Priority** — P0 (blocking), P1 (high-impact), P2 (nice-to-have).

## Output format

Return a numbered list grouped by priority (P0 first). End with a summary:

| # | Issue | Priority | Effort | Impact |
|---|-------|----------|--------|--------|

If the product is solid, say so — don't invent problems.`,
  },
  {
    id: "ui-ux-audit",
    title: "UI/UX Audit",
    description: "Design-focused review of interface quality — layout, accessibility, responsiveness, and visual consistency.",
    category: "ui",
    tags: ["ui", "ux", "design", "accessibility", "responsive", "layout", "a11y"],
    upvotes: 0,
    prompt: `You are a senior UI/UX designer auditing this interface. Be precise — reference specific elements, not vague generalities.

## Visual design & consistency

### 1. Layout & spacing
- Is the spacing system consistent (margins, padding, gaps between elements)?
- Is there a clear visual hierarchy — can you tell what's most important in under 2 seconds?
- Are elements properly aligned (no off-by-1px misalignments, consistent gutters)?
- Does the layout use whitespace effectively or does it feel cramped/sparse?

### 2. Typography
- Are there too many font sizes, weights, or families in use?
- Is the type scale consistent and intentional (not arbitrary px values)?
- Is body text readable (adequate size, line-height, contrast)?
- Are headings, labels, and body text visually distinct?

### 3. Color & contrast
- Does the color palette feel cohesive or are there rogue one-off colors?
- Do all text/background combinations meet WCAG AA contrast ratios (4.5:1 for body, 3:1 for large text)?
- Is color used as the only indicator for state (error, success) without an icon or label fallback?
- Are interactive elements visually distinct from static content?

## Interaction & usability

### 4. Interactive states
- Do buttons, links, and inputs have visible hover, focus, active, and disabled states?
- Are clickable areas large enough (minimum 44x44px touch targets)?
- Is there visual feedback for every user action (click, submit, toggle)?
- Are loading states shown for async operations?

### 5. Navigation & information architecture
- Can users find what they need within 2-3 clicks?
- Is the current location always clear (active nav states, breadcrumbs)?
- Does the back button work as expected everywhere?
- Are related actions grouped logically?

### 6. Forms & inputs
- Are labels always visible (no placeholder-only labels that disappear on focus)?
- Are required fields marked? Are error messages shown inline next to the field?
- Is tab order logical? Can the form be completed with keyboard alone?
- Do inputs have appropriate types (email, tel, number) for mobile keyboards?

## Responsiveness & accessibility

### 7. Responsive behavior
- Does the layout work at 320px, 768px, 1024px, and 1440px+ breakpoints?
- Do touch targets resize appropriately on mobile?
- Is horizontal scrolling avoided on all screen sizes?
- Do images and media scale without overflow or distortion?

### 8. Accessibility (a11y)
- Do all images have meaningful alt text (or empty alt for decorative images)?
- Can the entire interface be navigated with keyboard only (Tab, Enter, Escape)?
- Are ARIA roles and labels present for custom components (modals, dropdowns, tabs)?
- Is focus management correct for modals and dynamic content (focus trap, return focus on close)?
- Does the page structure use semantic HTML (nav, main, section, headings in order)?

## How to report each issue

For every issue found:
1. **Element** — what specific component or area is affected.
2. **Problem** — what's wrong and why it hurts the user experience.
3. **Severity** — Critical (blocks usage), Major (degrades experience), Minor (polish).
4. **Fix** — concrete recommendation with code or design direction.
5. **Reference** — relevant guideline (WCAG, Material Design, Apple HIG) if applicable.

## Output format

Return a numbered list sorted by severity (critical first). End with a summary:

| # | Issue | Severity | Category | Effort |
|---|-------|----------|----------|--------|

If the interface is well-executed, say so — don't invent flaws.`,
  },
];
