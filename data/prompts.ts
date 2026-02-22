export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  bestWith: string;
  upvotes: number;
}

export const promptCategories = [
  { id: "all", label: "All" },
  { id: "debug", label: "Debug" },
] as const;

export const prompts: Prompt[] = [
  {
    id: "performance-audit",
    title: "Performance Audit",
    description: "Deep analysis of code for performance bottlenecks with prioritized, quantified fixes.",
    category: "debug",
    tags: ["performance", "optimization", "profiling", "complexity", "memory", "react", "database"],
    bestWith: "Any LLM",
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
];
