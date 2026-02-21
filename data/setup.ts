export interface SetupItem {
  id: string;
  name: string;
  description: string;
  command?: string;
  url?: string;
  category: string;
}

export const setupCategories = [
  { id: "runtime", label: "Package Managers & Runtimes", icon: "Terminal" },
  { id: "devtools", label: "Essential Dev Tools", icon: "Wrench" },
  { id: "productivity", label: "Productivity & Utilities", icon: "Sparkles" },
  { id: "extensions", label: "VS Code / Cursor Extensions", icon: "Puzzle" },
] as const;

export const setupItems: SetupItem[] = [
  // Runtimes
  {
    id: "homebrew",
    name: "Homebrew",
    description: "The macOS package manager. Install everything from here.",
    command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
    category: "runtime",
  },
  {
    id: "bun",
    name: "Bun",
    description: "Fast JS runtime, package manager, bundler, and test runner. All-in-one.",
    command: "curl -fsSL https://bun.sh/install | bash",
    category: "runtime",
  },
  {
    id: "node",
    name: "Node.js 22 LTS",
    description: "JavaScript runtime. Still needed for some tools and CI environments.",
    command: "brew install node@22",
    category: "runtime",
  },
  {
    id: "pnpm",
    name: "pnpm",
    description: "Fast, disk-efficient package manager. Great alternative to npm.",
    command: "brew install pnpm",
    category: "runtime",
  },
  // Dev Tools
  {
    id: "git-gh",
    name: "Git + GitHub CLI",
    description: "Version control + GitHub from the terminal. Create PRs, issues, and more.",
    command: "brew install git gh",
    category: "devtools",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    description: "Anthropic's CLI for Claude. The AI coding assistant in your terminal.",
    command: "npm install -g @anthropic-ai/claude-code",
    category: "devtools",
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-first code editor. VS Code fork with built-in AI pair programming.",
    url: "https://cursor.com",
    command: "brew install --cask cursor",
    category: "devtools",
  },
  {
    id: "warp",
    name: "Warp Terminal",
    description: "Modern terminal with AI command search, blocks, and collaboration.",
    url: "https://warp.dev",
    command: "brew install --cask warp",
    category: "devtools",
  },
  {
    id: "docker",
    name: "Docker Desktop",
    description: "Containerization for local development. Run databases, services, and more.",
    command: "brew install --cask docker",
    category: "devtools",
  },
  {
    id: "figma",
    name: "Figma",
    description: "Design tool for UI/UX. Free for personal use.",
    command: "brew install --cask figma",
    category: "devtools",
  },
  // Productivity
  {
    id: "raycast",
    name: "Raycast",
    description: "Spotlight replacement with AI, clipboard history, snippets, and extensions.",
    command: "brew install --cask raycast",
    category: "productivity",
  },
  {
    id: "rectangle",
    name: "Rectangle",
    description: "Window management with keyboard shortcuts. Free and open source.",
    command: "brew install --cask rectangle",
    category: "productivity",
  },
  {
    id: "amphetamine",
    name: "Amphetamine",
    description: "Keep your Mac awake during deploys and long builds. Free on the App Store.",
    url: "https://apps.apple.com/app/amphetamine/id937984704",
    category: "productivity",
  },
  {
    id: "cleanshot",
    name: "CleanShot X",
    description: "Best screenshot and screen recording tool for macOS. Worth every penny.",
    url: "https://cleanshot.com",
    command: "brew install --cask cleanshot",
    category: "productivity",
  },
  {
    id: "arc",
    name: "Arc Browser",
    description: "A better browser. Spaces, profiles, split view, and built-in AI.",
    command: "brew install --cask arc",
    category: "productivity",
  },
  {
    id: "notion",
    name: "Notion",
    description: "All-in-one workspace. Notes, tasks, wikis, and project management.",
    command: "brew install --cask notion",
    category: "productivity",
  },
  // Extensions
  {
    id: "ext-tailwind",
    name: "Tailwind CSS IntelliSense",
    description: "Autocomplete, linting, and hover preview for Tailwind CSS classes.",
    command: "code --install-extension bradlc.vscode-tailwindcss",
    category: "extensions",
  },
  {
    id: "ext-eslint",
    name: "ESLint",
    description: "Linting for JavaScript and TypeScript. Catch errors before they happen.",
    command: "code --install-extension dbaeumer.vscode-eslint",
    category: "extensions",
  },
  {
    id: "ext-prettier",
    name: "Prettier",
    description: "Code formatter. Consistent code style without thinking about it.",
    command: "code --install-extension esbenp.prettier-vscode",
    category: "extensions",
  },
  {
    id: "ext-gitlens",
    name: "GitLens",
    description: "Git supercharged. Blame, history, stash, and more in your editor.",
    command: "code --install-extension eamodio.gitlens",
    category: "extensions",
  },
  {
    id: "ext-errorlens",
    name: "Error Lens",
    description: "See errors and warnings inline. No more squinting at the problems panel.",
    command: "code --install-extension usernamehw.errorlens",
    category: "extensions",
  },
  {
    id: "ext-thunder",
    name: "Thunder Client",
    description: "API testing inside VS Code. Lightweight Postman alternative.",
    command: "code --install-extension rangav.vscode-thunder-client",
    category: "extensions",
  },
];
