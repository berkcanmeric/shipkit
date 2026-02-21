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
  { id: "all", label: "All", icon: "Layers" },
  { id: "setup", label: "Project Setup", icon: "Hammer" },
  { id: "ui", label: "UI/UX Generation", icon: "Palette" },
  { id: "api", label: "API & Backend", icon: "Plug" },
  { id: "mobile", label: "Mobile", icon: "Smartphone" },
  { id: "testing", label: "Testing", icon: "FlaskConical" },
  { id: "deploy", label: "Deployment", icon: "Rocket" },
  { id: "debug", label: "Debugging", icon: "Bug" },
  { id: "docs", label: "Documentation", icon: "FileText" },
] as const;

export const prompts: Prompt[] = [
  {
    id: "nextjs-fullstack",
    title: "Full-Stack Next.js App",
    description: "Scaffold a complete Next.js 16 app with auth, database, and payments",
    prompt: `Create a full-stack Next.js 16 application with the following setup:

- Runtime: Bun
- Styling: Tailwind CSS v4 + shadcn/ui components
- Auth: Supabase Auth with email/password and Google OAuth
- Database: Supabase (Postgres) with Drizzle ORM
- Payments: Stripe with checkout sessions and webhooks
- File structure: app router with route groups for (auth) and (dashboard)
- Include middleware for protected routes
- Add a landing page, login/signup pages, and a dashboard layout
- Set up environment variables in .env.example
- Include proper TypeScript types throughout

Make it production-ready with error handling, loading states, and proper SEO metadata.`,
    category: "setup",
    tags: ["claude", "cursor"],
    bestWith: "Claude Opus",
    upvotes: 342,
  },
  {
    id: "expo-starter",
    title: "Expo App with Navigation & Auth",
    description: "Complete Expo app setup with file-based routing and authentication",
    prompt: `Create an Expo (React Native) application with:

- Expo Router (file-based navigation) with tab and stack layouts
- Supabase Auth integration (email + Apple Sign In + Google Sign In)
- Bottom tab navigation with 4 tabs: Home, Explore, Profile, Settings
- NativeWind (Tailwind for RN) for styling
- Zustand for state management
- MMKV for secure local storage
- Expo Notifications setup
- Dark mode support with useColorScheme
- Proper TypeScript configuration
- App.json with splash screen and icon configs

Include a complete auth flow: onboarding screens → login/signup → main app tabs.`,
    category: "mobile",
    tags: ["claude", "cursor"],
    bestWith: "Claude Opus",
    upvotes: 287,
  },
  {
    id: "pricing-page",
    title: "Animated Pricing Page",
    description: "Build a stunning pricing page with glass cards and animations",
    prompt: `Build a pricing page component with:

- 3 tiers: Free, Pro ($19/mo), Enterprise (Custom)
- Glass morphism card design with subtle backdrop blur
- The Pro tier should be highlighted/featured with a glowing border
- Monthly/Annual toggle with 20% discount on annual
- Framer Motion stagger animations on scroll reveal
- Each card has: plan name, price, feature list with checkmarks, CTA button
- Hover effects: subtle scale + glow
- Responsive: stack on mobile, side-by-side on desktop
- Use Tailwind CSS for styling
- Include a "Most Popular" badge on the Pro tier

Make it dark theme with cyan (#00f0ff) accent color. No dependencies beyond React, Tailwind, and Framer Motion.`,
    category: "ui",
    tags: ["claude", "cursor", "v0"],
    bestWith: "Claude Sonnet",
    upvotes: 256,
  },
  {
    id: "rest-api",
    title: "REST API with Auth & Rate Limiting",
    description: "Production-ready API routes with middleware stack",
    prompt: `Create a Next.js API route structure with:

- RESTful endpoints for a resource (e.g., /api/posts - CRUD operations)
- Authentication middleware using JWT tokens
- Rate limiting middleware (100 requests/minute per IP)
- Request validation using Zod schemas
- Proper error handling with consistent error response format
- CORS configuration
- Response caching headers
- Pagination support with cursor-based pagination
- TypeScript types for all request/response shapes
- Example middleware composition pattern

Use Next.js App Router route handlers (route.ts files). Include proper HTTP status codes and error messages.`,
    category: "api",
    tags: ["claude", "cursor"],
    bestWith: "Claude Opus",
    upvotes: 198,
  },
  {
    id: "component-tests",
    title: "Comprehensive Component Tests",
    description: "Full test suite for React components with Vitest",
    prompt: `Write comprehensive tests for the following React component using Vitest and React Testing Library:

[PASTE YOUR COMPONENT HERE]

Include:
- Unit tests for all props and variations
- User interaction tests (clicks, form submissions, keyboard navigation)
- Accessibility tests (ARIA labels, roles, keyboard focus)
- Edge cases (empty states, error states, loading states)
- Snapshot tests for visual regression
- Mock any external dependencies (API calls, hooks, context)
- Use describe blocks to group related tests
- Add meaningful test descriptions

Use @testing-library/user-event for realistic user interactions. Include setup/teardown where needed.`,
    category: "testing",
    tags: ["claude", "cursor"],
    bestWith: "Claude Sonnet",
    upvotes: 176,
  },
  {
    id: "vercel-cicd",
    title: "Vercel CI/CD Pipeline",
    description: "Complete GitHub Actions workflow for Vercel deployment",
    prompt: `Create a GitHub Actions CI/CD pipeline for deploying a Next.js app to Vercel:

- Trigger on push to main (production) and pull requests (preview)
- Steps:
  1. Install dependencies with Bun
  2. Run TypeScript type checking
  3. Run ESLint
  4. Run tests with Vitest
  5. Build the project
  6. Deploy to Vercel (preview for PRs, production for main)
- Environment variables from GitHub Secrets
- Cache Bun dependencies for faster builds
- Add status checks and deployment URLs as PR comments
- Include a separate workflow for running tests on PRs
- Proper job dependencies and conditional steps

Output the complete .github/workflows/deploy.yml file.`,
    category: "deploy",
    tags: ["claude", "cursor"],
    bestWith: "Claude Sonnet",
    upvotes: 154,
  },
  {
    id: "debug-error",
    title: "Debug Any Error",
    description: "Systematic error analysis and fix generation",
    prompt: `I'm getting this error in my application:

[PASTE ERROR MESSAGE AND STACK TRACE HERE]

Here's the relevant code:

[PASTE CODE HERE]

Please:
1. Explain what's causing this error in plain English
2. Identify the exact line/section causing the issue
3. Provide the fix with the corrected code
4. Explain why the fix works
5. Suggest how to prevent similar errors in the future
6. If applicable, add proper error handling around this code

Keep the explanation concise — I want to fix this and move on.`,
    category: "debug",
    tags: ["claude", "cursor", "chatgpt"],
    bestWith: "Claude Opus",
    upvotes: 312,
  },
  {
    id: "api-docs",
    title: "Generate API Documentation",
    description: "Auto-generate API docs from your codebase",
    prompt: `Generate comprehensive API documentation for the following API routes:

[PASTE YOUR API ROUTE FILES HERE]

For each endpoint, document:
- HTTP method and path
- Description of what it does
- Request headers (including auth)
- Request body schema (with types and required/optional)
- Query parameters
- Response schema for success (200/201)
- Error responses (400, 401, 403, 404, 500)
- Example request (curl command)
- Example response (JSON)

Format as clean Markdown. Group endpoints by resource. Include a table of contents at the top.`,
    category: "docs",
    tags: ["claude", "cursor", "chatgpt"],
    bestWith: "Claude Sonnet",
    upvotes: 143,
  },
  {
    id: "dashboard-ui",
    title: "Admin Dashboard Layout",
    description: "Complete dashboard with sidebar, charts, and data tables",
    prompt: `Build a modern admin dashboard layout with:

- Collapsible sidebar with navigation items and icons
- Top header bar with search, notifications bell, and user avatar dropdown
- Main content area with:
  - 4 stat cards (revenue, users, orders, conversion) with trend indicators
  - A line chart showing revenue over time (last 12 months)
  - A recent orders data table with sorting, filtering, and pagination
- Responsive: sidebar becomes a sheet/drawer on mobile
- Dark theme with subtle glass effects
- Use shadcn/ui components (Sheet, Table, Card, Badge, Avatar, DropdownMenu)
- Framer Motion for mount animations
- Tailwind CSS for all styling
- Mock data — no API calls needed

Make it look premium. No bright whites — use subtle grays and accent colors.`,
    category: "ui",
    tags: ["claude", "cursor", "v0"],
    bestWith: "Claude Opus",
    upvotes: 267,
  },
  {
    id: "supabase-auth",
    title: "Supabase Auth Setup",
    description: "Complete auth flow with email, OAuth, and protected routes",
    prompt: `Set up Supabase authentication in my Next.js app:

1. Install and configure @supabase/ssr
2. Create a Supabase client utility (server + client components)
3. Build auth pages:
   - /login — Email/password + Google OAuth button
   - /signup — Email/password with email confirmation
   - /forgot-password — Password reset flow
4. Auth middleware to protect /dashboard/* routes
5. Auth context/hook for accessing user session
6. Sign out functionality
7. Callback route handler for OAuth redirects (/auth/callback)
8. Row Level Security (RLS) policies for a "profiles" table
9. Proper error handling and loading states

Use the Next.js App Router pattern with Server Components where possible. Include all environment variables needed in .env.example.`,
    category: "setup",
    tags: ["claude", "cursor"],
    bestWith: "Claude Opus",
    upvotes: 231,
  },
  {
    id: "landing-hero",
    title: "Hero Section with Animations",
    description: "Eye-catching hero section with gradient text and particles",
    prompt: `Create a stunning hero section for a SaaS landing page:

- Large bold headline with gradient text (cyan to violet)
- Typewriter effect on a subheadline cycling through 3 value propositions
- Two CTA buttons: "Get Started" (primary, filled) and "See Demo" (outline)
- Animated background with subtle floating particles or grid pattern
- Trusted by section with company logos (use placeholder gray boxes)
- Framer Motion entrance animations (stagger children from bottom)
- Fully responsive — stacks on mobile
- Dark background (#09090b)
- Use Tailwind CSS and Framer Motion only

The design should feel like a premium SaaS product — clean, modern, confident. No clip art or illustrations.`,
    category: "ui",
    tags: ["claude", "cursor", "v0"],
    bestWith: "Claude Sonnet",
    upvotes: 289,
  },
  {
    id: "stripe-integration",
    title: "Stripe Payments Integration",
    description: "Complete Stripe checkout with webhooks and subscription management",
    prompt: `Integrate Stripe payments into my Next.js app:

1. Install stripe and @stripe/stripe-js
2. Create a Stripe utility with server-side client
3. API routes:
   - POST /api/stripe/checkout — Create checkout session
   - POST /api/stripe/webhook — Handle Stripe webhooks
   - POST /api/stripe/portal — Create customer portal session
4. Webhook handler for events:
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_failed
5. Client-side checkout redirect function
6. Pricing table component with Stripe price IDs
7. Subscription status check utility
8. Proper webhook signature verification

Include .env.example with all required Stripe keys. Use the latest Stripe API version.`,
    category: "api",
    tags: ["claude", "cursor"],
    bestWith: "Claude Opus",
    upvotes: 208,
  },
];
