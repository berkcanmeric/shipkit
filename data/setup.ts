export interface SetupItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  iconUrl?: string;
}

export const setupCategories = [
  { id: "runtime", label: "Package Managers & Runtimes", icon: "Terminal" },
  { id: "devtools", label: "Essential Dev Tools", icon: "Wrench" },
  { id: "productivity", label: "Productivity & Utilities", icon: "Star" },
  { id: "extensions", label: "VS Code / Cursor Extensions", icon: "Puzzle" },
] as const;

export const setupItems: SetupItem[] = [
  // Runtimes
  {
    id: "homebrew",
    name: "Homebrew",
    description: "The macOS package manager. Install everything from here.",
    url: "https://brew.sh",
    category: "runtime",
    iconUrl: "https://brew.sh/assets/img/homebrew.svg",
  },
  {
    id: "bun",
    name: "Bun",
    description: "Fast JS runtime, package manager, bundler, and test runner.",
    url: "https://bun.sh",
    category: "runtime",
    iconUrl: "https://bun.sh/logo.svg",
  },
  {
    id: "node",
    name: "Node.js 22 LTS",
    description: "JavaScript runtime. Still needed for some tools and CI.",
    url: "https://nodejs.org",
    category: "runtime",
    iconUrl: "https://nodejs.org/static/logos/nodejsLight.svg",
  },
  // Dev Tools
  {
    id: "git-gh",
    name: "Git + GitHub CLI",
    description: "Version control + GitHub from the terminal.",
    url: "https://cli.github.com",
    category: "devtools",
    iconUrl: "https://github.githubassets.com/favicons/favicon-dark.svg",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's AI coding assistant in your terminal.",
    url: "https://claude.ai/download",
    category: "devtools",
    iconUrl: "https://avatars.githubusercontent.com/u/76263028",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor. VS Code fork with built-in AI.",
    url: "https://cursor.com",
    category: "devtools",
    iconUrl: "https://www.cursor.com/favicon.ico",
  },
  {
    id: "warp",
    name: "Warp Terminal",
    description: "Modern terminal with AI command search and blocks.",
    url: "https://warp.dev",
    category: "devtools",
    iconUrl: "https://avatars.githubusercontent.com/u/71840468",
  },
  {
    id: "docker",
    name: "Docker Desktop",
    description: "Containerization for local development.",
    url: "https://docker.com/products/docker-desktop",
    category: "devtools",
    iconUrl: "https://www.docker.com/wp-content/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design tool for UI/UX. Free for personal use.",
    url: "https://figma.com/downloads",
    category: "devtools",
    iconUrl: "https://static.figma.com/app/icon/1/favicon.png",
  },
  // Productivity
  {
    id: "raycast",
    name: "Raycast",
    description: "Spotlight replacement with AI, clipboard history, and extensions.",
    url: "https://raycast.com",
    category: "productivity",
    iconUrl: "https://www.raycast.com/favicon-production.png",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Window management with keyboard shortcuts. Free and open source.",
    url: "https://rectangleapp.com",
    category: "productivity",
    iconUrl: "https://rectangleapp.com/favicon.ico",
  },
  {
    id: "amphetamine",
    name: "Amphetamine",
    description: "Keep your Mac awake during deploys and long builds.",
    url: "https://apps.apple.com/app/amphetamine/id937984704",
    category: "productivity",
  },
  {
    id: "cleanshot",
    name: "CleanShot X",
    description: "Best screenshot and screen recording tool for macOS.",
    url: "https://cleanshot.com",
    category: "productivity",
    iconUrl: "https://avatars.githubusercontent.com/u/45698031",
  },
  {
    id: "arc",
    name: "Arc Browser",
    description: "A better browser. Spaces, profiles, split view, and built-in AI.",
    url: "https://arc.net",
    category: "productivity",
    iconUrl: "https://arc.net/favicon.png",
  },
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace. Notes, tasks, wikis, and project management.",
    url: "https://notion.so",
    category: "productivity",
    iconUrl: "https://www.notion.com/front-static/favicon.ico",
  },
  // Extensions
  {
    id: "ext-tailwind",
    name: "Tailwind CSS IntelliSense",
    description: "Autocomplete, linting, and hover preview for Tailwind classes.",
    url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss",
    category: "extensions",
    iconUrl: "https://tailwindcss.com/favicons/favicon-32x32.png",
  },
  {
    id: "ext-eslint",
    name: "ESLint",
    description: "Linting for JavaScript and TypeScript.",
    url: "https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint",
    category: "extensions",
    iconUrl: "https://eslint.org/favicon.ico",
  },
  {
    id: "ext-prettier",
    name: "Prettier",
    description: "Code formatter. Consistent style without thinking about it.",
    url: "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode",
    category: "extensions",
    iconUrl: "https://prettier.io/icon.png",
  },
];
