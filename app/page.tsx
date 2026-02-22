"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useCallback } from "react";
import { MessageSquareText, Puzzle, Package, Bot, ArrowRight, Copy, Zap, Terminal, Braces, Cpu, Layers } from "lucide-react";
import { prompts } from "@/data/prompts";
import { mcps } from "@/data/mcps";
import { webTools } from "@/data/web-tools";
import { mobileTools } from "@/data/mobile-tools";
import { agents } from "@/data/agents";

const AuroraBackground = dynamic(
  () => import("@/components/effects/aurora-background").then((m) => m.AuroraBackground),
  { ssr: true }
);

const Spotlight = dynamic(
  () => import("@/components/effects/spotlight").then((m) => m.Spotlight),
  { ssr: false }
);

const TextGenerateEffect = dynamic(
  () => import("@/components/effects/text-generate-effect").then((m) => m.TextGenerateEffect),
  { ssr: false }
);

const MovingBorder = dynamic(
  () => import("@/components/effects/moving-border").then((m) => m.MovingBorder),
  { ssr: false }
);

const LampContainer = dynamic(
  () => import("@/components/effects/lamp").then((m) => m.LampContainer),
  { ssr: false }
);

const features = [
  {
    title: "Prompts",
    description: "Copy-paste prompts for every stage of development.",
    href: "/prompts",
    glowColor: "rgba(0,240,255,0.20)",
    accent: "text-cyan",
    accentBg: "bg-cyan/10 border-cyan/20",
    iconColor: "text-cyan",
    gradientFrom: "from-cyan/20",
    preview: [
      { icon: Terminal, label: "$ claude", sub: "Start a new project" },
      { icon: Braces, label: "Fix this bug", sub: "Debug with context" },
      { icon: Cpu, label: "Code review", sub: "Review PR changes" },
    ],
  },
  {
    title: "MCPs & Tools",
    description: "Claude MCPs, extensions, and dev tools.",
    href: "/mcps",
    glowColor: "rgba(139,92,246,0.20)",
    accent: "text-violet",
    accentBg: "bg-violet/10 border-violet/20",
    iconColor: "text-violet",
    gradientFrom: "from-violet/20",
    preview: [
      { img: "https://supabase.com/favicon/favicon-196x196.png", label: "Supabase" },
      { img: "https://static.figma.com/app/icon/1/favicon.png", label: "Figma" },
      { img: "https://vercel.com/favicon.ico", label: "Vercel" },
    ],
  },
  {
    title: "Libraries",
    description: "Curated web and mobile libraries for your next build.",
    href: "/web",
    glowColor: "rgba(52,211,153,0.20)",
    accent: "text-emerald-400",
    accentBg: "bg-emerald-400/10 border-emerald-400/20",
    iconColor: "text-emerald-400",
    gradientFrom: "from-emerald-400/20",
    preview: [
      { img: "https://ui.shadcn.com/favicon.ico", label: "shadcn/ui" },
      { img: "https://orm.drizzle.team/favicon.ico", label: "Drizzle ORM" },
      { img: "https://tanstack.com/favicon.ico", label: "TanStack Query" },
    ],
  },
  {
    title: "AI Agents",
    description: "Pre-built agent configs for your dev workflow.",
    href: "/agents",
    glowColor: "rgba(251,191,36,0.20)",
    accent: "text-amber-400",
    accentBg: "bg-amber-400/10 border-amber-400/20",
    iconColor: "text-amber-400",
    gradientFrom: "from-amber-400/20",
    preview: [
      { icon: Bot, label: "Code Agent", sub: "Write & refactor" },
      { icon: Bot, label: "Test Agent", sub: "Generate tests" },
      { icon: Bot, label: "Review Agent", sub: "Review changes" },
    ],
  },
];

const trending = [
  // MCPs
  { name: "Supabase", icon: "https://supabase.com/favicon/favicon-196x196.png" },
  { name: "GitHub", icon: "https://github.githubassets.com/favicons/favicon-dark.svg" },
  { name: "Figma", icon: "https://static.figma.com/app/icon/1/favicon.png" },
  { name: "Notion", icon: "https://www.notion.com/front-static/favicon.ico" },
  { name: "Stripe", icon: "https://github.com/stripe.png" },
  { name: "Vercel", icon: "https://vercel.com/favicon.ico" },
  { name: "Linear", icon: "https://github.com/linear.png" },
  { name: "Sentry", icon: "https://github.com/getsentry.png" },
  { name: "Slack", icon: "https://github.com/slackapi.png" },
  { name: "Next.js", icon: "https://nextjs.org/favicon.ico" },
  { name: "PostgreSQL", icon: "https://www.postgresql.org/media/img/about/press/elephant.png" },
  { name: "Hugging Face", icon: "https://github.com/huggingface.png" },
  { name: "Expo", icon: "https://github.com/expo.png" },
  { name: "Canva", icon: "https://github.com/canva.png" },
  { name: "Granola", icon: "https://www.granola.ai/icon.png" },
  // Web
  { name: "shadcn/ui", icon: "https://ui.shadcn.com/favicon.ico" },
  { name: "TanStack", icon: "https://tanstack.com/favicon.ico" },
  { name: "Lemon Squeezy", icon: "https://github.com/lmsqueezy.png" },
  { name: "Drizzle", icon: "https://orm.drizzle.team/favicon.ico" },
  { name: "Prisma", icon: "https://prisma.io/images/favicon-32x32.png" },
  { name: "PostHog", icon: "https://github.com/PostHog.png" },
  { name: "Resend", icon: "https://github.com/resend.png" },
  { name: "Zustand", icon: "https://github.com/pmndrs.png" },
  { name: "Plausible", icon: "https://github.com/plausible.png" },
  { name: "Sanity", icon: "https://github.com/sanity-io.png" },
  { name: "Magic UI", icon: "https://magicui.design/favicon.ico" },
  // Mobile
  { name: "Apple", icon: "https://github.com/apple.png" },
  { name: "RevenueCat", icon: "https://www.revenuecat.com/favicon-32x32.png" },
  { name: "OneSignal", icon: "https://avatars.githubusercontent.com/u/11823027" },
  { name: "Fastlane", icon: "https://avatars.githubusercontent.com/u/11098337" },
  { name: "Lottie", icon: "https://github.com/LottieFiles.png" },
];

function FeatureGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-card]");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            data-card
            className="group relative overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.20] hover:-translate-y-1"
          >
            {/* Mouse spotlight */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.glowColor}, transparent 40%)`,
              }}
            />

            {/* Top gradient accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${feature.gradientFrom} to-transparent`} />

            {/* Preview area */}
            <div className="relative px-6 pt-6 pb-2">
              <div className="rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] p-2.5 space-y-2">
                {feature.preview.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:border-white/[0.08] transition-colors"
                  >
                    {"img" in item ? (
                      <img src={item.img} alt="" width={20} height={20} className="w-5 h-5 rounded-md object-contain shrink-0" />
                    ) : (
                      <item.icon className={`w-4 h-4 ${feature.iconColor} shrink-0`} />
                    )}
                    <span className="text-sm text-foreground/80 font-medium">{item.label}</span>
                    {"sub" in item && item.sub && (
                      <span className="text-[11px] text-muted-foreground/50 hidden sm:inline ml-auto">{item.sub}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Text content */}
            <div className="relative px-6 pb-6 pt-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <ArrowRight className={`w-4 h-4 ${feature.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ShipKit",
  description: "The Vibe Coder's Toolkit — every tool, prompt, MCP, library, and shortcut you need to build and launch apps at lightning speed.",
  url: "https://shipkit.dev",
};

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Spotlight className="min-h-screen">
        {/* Hero */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-16 sm:pb-24 md:pt-28 md:pb-32">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle text-xs text-muted-foreground mb-6">
              <Zap className="w-3 h-3 text-cyan" aria-hidden="true" />
              The Vibe Coder&apos;s Toolkit
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Ship apps faster{" "}
              <span className="bg-gradient-to-r from-cyan via-blue-400 to-violet bg-clip-text text-transparent">
                than ever.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 max-w-full sm:max-w-2xl">
              Every tool. Every prompt. Every shortcut.
            </p>

            <TextGenerateEffect
              words="Find the perfect MCP. Copy a production-ready prompt. Discover the SDK you need. Ship your app today."
              className="mb-4"
            />

            {/* Stats line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-8">
              <span className="text-cyan font-medium">{prompts.length} Prompts</span>
              <span className="text-white/20">·</span>
              <span className="text-violet font-medium">{mcps.length} MCPs</span>
              <span className="text-white/20">·</span>
              <span className="text-emerald-400 font-medium">{webTools.length + mobileTools.length} Libraries</span>
              <span className="text-white/20">·</span>
              <span className="text-amber-400 font-medium">{agents.length} Agents</span>
            </div>

            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <Link href="/prompts">
                <MovingBorder
                  as="div"
                  className="bg-background hover:bg-background/80 transition-colors"
                  duration={4000}
                >
                  <Copy className="w-4 h-4" />
                  Browse Prompts
                </MovingBorder>
              </Link>
              <Link href="/mcps">
                <MovingBorder
                  as="div"
                  className="bg-background hover:bg-background/80 transition-colors"
                  duration={5000}
                >
                  Explore MCPs
                  <ArrowRight className="w-4 h-4" />
                </MovingBorder>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <FeatureGrid />

        {/* Tool Icons Carousel */}
        <section className="relative border-y border-border/50 py-6 overflow-hidden mask-edges">
          <div className="flex animate-marquee w-fit hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-8 shrink-0 pr-8">
                {trending.map((t) => (
                  <div key={`${t.name}-${copy}`} className="relative group/icon shrink-0">
                    <img
                      src={t.icon}
                      alt={t.name}
                      width={44}
                      height={44}
                      loading="eager"
                      decoding="async"
                      className="w-11 h-11 rounded-xl object-contain bg-white/5 border border-white/10 p-1.5"
                    />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-background border border-border text-[10px] text-foreground whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Motto */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium italic text-muted-foreground/70">
            &ldquo;No need to reinvent the wheel.&rdquo;
          </p>
        </section>

        {/* CTA Section with Lamp */}
        <section className="relative max-w-7xl mx-auto px-6 py-24">
          <LampContainer>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stop learning.{" "}
                <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
                  Start shipping.
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Every piece of content on this site exists to be copied, clicked, or installed — not read, studied, or bookmarked for later.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/prompts">
                  <MovingBorder
                    as="div"
                    className="bg-gradient-to-r from-cyan/10 to-violet/10 hover:from-cyan/20 hover:to-violet/20 transition-colors"
                    duration={4000}
                  >
                    Get Started
                  </MovingBorder>
                </Link>
                <Link href="/setup">
                  <MovingBorder
                    as="div"
                    className="bg-background hover:bg-background/80 transition-colors"
                    duration={5000}
                  >
                    Set Up Your Mac
                  </MovingBorder>
                </Link>
              </div>
            </div>
          </LampContainer>
        </section>
      </Spotlight>
    </AuroraBackground>
  );
}
