export interface WorkflowStep {
  title: string;
  description: string;
  command?: string;
  prompt?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  steps: WorkflowStep[];
}

export const workflows: Workflow[] = [
  {
    id: "saas-weekend",
    title: "Launch a SaaS in a Weekend",
    description: "From zero to deployed SaaS with auth, payments, and a dashboard.",
    icon: "Rocket",
    duration: "~4 hours",
    steps: [
      {
        title: "Scaffold the project",
        description: "Create a full-stack Next.js app with all the essentials.",
        command: "bunx create-next-app@latest my-saas --ts --tailwind --app --use-bun && cd my-saas && bunx shadcn@latest init -d",
      },
      {
        title: "Set up Supabase",
        description: "Add auth, database, and row-level security.",
        command: "bun add @supabase/ssr @supabase/supabase-js",
        prompt: "Set up Supabase in my Next.js app with email/password auth, Google OAuth, a profiles table with RLS policies, and middleware to protect /dashboard routes.",
      },
      {
        title: "Add Stripe payments",
        description: "Checkout sessions, webhooks, and a customer portal.",
        command: "bun add stripe @stripe/stripe-js",
        prompt: "Integrate Stripe into my Next.js app. Create checkout session API route, webhook handler for subscription events, and a customer portal route. Include a pricing page with Free and Pro tiers.",
      },
      {
        title: "Build the dashboard",
        description: "Create a protected dashboard with sidebar navigation.",
        prompt: "Build a dashboard layout for my SaaS with a collapsible sidebar, top bar with user avatar dropdown, and a main content area. Include pages: Overview (stats cards), Settings (profile form), and Billing (subscription status + manage button). Use shadcn/ui components.",
      },
      {
        title: "Deploy to Vercel",
        description: "Push to GitHub and deploy in one command.",
        command: "git init && git add -A && git commit -m 'Initial commit' && gh repo create my-saas --public --push && vercel --prod",
      },
    ],
  },
  {
    id: "expo-iap",
    title: "Add In-App Purchases to Expo",
    description: "Set up RevenueCat for subscriptions in your Expo app.",
    icon: "CreditCard",
    duration: "~1 hour",
    steps: [
      {
        title: "Install RevenueCat SDK",
        description: "Add the purchases SDK and configure your app.",
        command: "npx expo install react-native-purchases expo-build-properties",
      },
      {
        title: "Configure RevenueCat",
        description: "Initialize RevenueCat with your API key and set up offerings.",
        prompt: "Set up RevenueCat in my Expo app. Create a RevenueCatProvider context that initializes on app start, a useSubscription hook that checks subscription status, and a Paywall component that displays offerings with purchase buttons. Handle restore purchases too.",
      },
      {
        title: "Build the paywall",
        description: "Create a beautiful paywall screen with plan comparison.",
        prompt: "Build a paywall screen for my Expo app with: a 'Pro' header with feature highlights, monthly ($9.99) and annual ($79.99) plan options, a 'Best Value' badge on annual, a prominent subscribe button, a restore purchases link, and terms/privacy links at the bottom. Dark theme with a gradient background.",
      },
      {
        title: "Gate premium features",
        description: "Add subscription checks to premium features.",
        prompt: "Create a PremiumGate component that wraps premium features. If the user is subscribed, show the children. If not, show a teaser with a 'Upgrade to Pro' CTA that opens the paywall. Also create an isPremium() utility function.",
      },
      {
        title: "Test in sandbox",
        description: "Test purchases in the Apple/Google sandbox environment.",
        command: "npx expo run:ios --configuration Debug",
      },
    ],
  },
  {
    id: "full-cicd",
    title: "Set Up Full CI/CD",
    description: "Automated testing, preview deploys, and production releases.",
    icon: "GitBranch",
    duration: "~30 minutes",
    steps: [
      {
        title: "Create GitHub Actions workflow",
        description: "Set up CI pipeline with type checking, linting, and tests.",
        prompt: "Create a GitHub Actions workflow (.github/workflows/ci.yml) for my Next.js app that: installs deps with Bun, runs TypeScript type checking, runs ESLint, runs Vitest tests, and builds the project. Trigger on push to main and pull requests. Cache Bun dependencies.",
      },
      {
        title: "Connect to Vercel",
        description: "Link your repo for automatic preview and production deploys.",
        command: "vercel link && vercel env pull .env.local",
      },
      {
        title: "Add preview deploy comments",
        description: "Get deployment URLs posted on every PR automatically.",
        prompt: "Add a step to my GitHub Actions workflow that posts the Vercel preview deployment URL as a comment on the pull request. Use the Vercel CLI to get the deployment URL.",
      },
      {
        title: "Set up branch protection",
        description: "Require passing checks before merging to main.",
        command: 'gh api repos/{owner}/{repo}/branches/main/protection -X PUT -f "required_status_checks[strict]=true" -f "required_status_checks[contexts][]=ci"',
      },
    ],
  },
  {
    id: "landing-page",
    title: "Ship a Landing Page in 30 Minutes",
    description: "A stunning landing page with hero, features, pricing, and CTA.",
    icon: "Layout",
    duration: "~30 minutes",
    steps: [
      {
        title: "Scaffold with Next.js",
        description: "Create a new project with all the styling tools.",
        command: "bunx create-next-app@latest landing --ts --tailwind --app --use-bun && cd landing && bun add framer-motion lucide-react",
      },
      {
        title: "Generate the hero section",
        description: "Create an eye-catching hero with animations.",
        prompt: "Build a hero section with: a large gradient headline (cyan to violet), an animated typewriter subtitle, two CTA buttons (Get Started + See Demo), and a subtle grid background pattern. Use Framer Motion for entrance animations. Dark theme (#09090b background).",
      },
      {
        title: "Add features and social proof",
        description: "Feature grid and trusted-by logos.",
        prompt: "Create a features section with 6 feature cards in a 3-column grid. Each card has an icon, title, and description. Cards should have glass morphism effect and subtle hover animation. Below, add a 'Trusted by' section with 6 placeholder company logos in a row.",
      },
      {
        title: "Build the pricing section",
        description: "Pricing table with 3 tiers and annual toggle.",
        prompt: "Build a pricing section with 3 tiers (Free, Pro $19/mo, Enterprise). Include a monthly/annual toggle with 20% annual discount. The Pro tier should be highlighted with a glowing border. Each card has features list with checkmarks. Glass morphism design on dark background.",
      },
      {
        title: "Deploy",
        description: "Push to GitHub and deploy to Vercel.",
        command: "git add -A && git commit -m 'Landing page' && gh repo create landing --public --push && vercel --prod",
      },
    ],
  },
  {
    id: "auth-setup",
    title: "Add Auth to Next.js in 10 Minutes",
    description: "Complete authentication with Supabase — login, signup, protected routes.",
    icon: "Lock",
    duration: "~10 minutes",
    steps: [
      {
        title: "Install Supabase",
        description: "Add the Supabase SSR package for Next.js.",
        command: "bun add @supabase/ssr @supabase/supabase-js",
      },
      {
        title: "Create Supabase clients",
        description: "Set up server and client utilities.",
        prompt: "Create Supabase client utilities for my Next.js app: a server client (lib/supabase/server.ts) using createServerClient, a browser client (lib/supabase/client.ts) using createBrowserClient, and middleware (middleware.ts) that refreshes the auth session. Use @supabase/ssr.",
      },
      {
        title: "Build auth pages",
        description: "Login, signup, and forgot password pages.",
        prompt: "Create auth pages for my Next.js app: /login with email/password form and Google OAuth button, /signup with email/password and email confirmation, /forgot-password with reset flow. Use shadcn/ui components. Include error handling and loading states. Redirect to /dashboard on success.",
      },
      {
        title: "Protect routes",
        description: "Add middleware to protect dashboard routes.",
        prompt: "Update my Next.js middleware to protect all /dashboard/* routes. If no session, redirect to /login. If authenticated user visits /login, redirect to /dashboard. Also create an auth callback route handler at /auth/callback for OAuth redirects.",
      },
    ],
  },
  {
    id: "api-backend",
    title: "Build a REST API in 20 Minutes",
    description: "Production-ready API with auth, validation, and rate limiting.",
    icon: "Server",
    duration: "~20 minutes",
    steps: [
      {
        title: "Set up API structure",
        description: "Create the API route structure with shared utilities.",
        prompt: "Create a Next.js API structure with: a shared error handler (lib/api/errors.ts), a response helper (lib/api/response.ts), and middleware utilities for auth verification and rate limiting. Use Zod for request validation.",
      },
      {
        title: "Create CRUD endpoints",
        description: "Build RESTful endpoints for a resource.",
        prompt: "Create CRUD API routes for a 'posts' resource in Next.js App Router: GET /api/posts (list with pagination), POST /api/posts (create), GET /api/posts/[id] (read), PUT /api/posts/[id] (update), DELETE /api/posts/[id] (delete). Include Zod validation, auth middleware, and proper error handling.",
      },
      {
        title: "Add rate limiting",
        description: "Protect your API from abuse.",
        prompt: "Add rate limiting to my Next.js API routes using an in-memory store (Map). Limit to 100 requests per minute per IP. Return 429 with Retry-After header when exceeded. Create it as reusable middleware.",
      },
      {
        title: "Test with Thunder Client",
        description: "Install Thunder Client and test your endpoints.",
        command: "code --install-extension rangav.vscode-thunder-client",
      },
    ],
  },
];
