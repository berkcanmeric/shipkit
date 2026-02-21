"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Puzzle, Package, Bot, ArrowRight, Copy, Zap } from "lucide-react";
import { GridBackground } from "@/components/effects/grid-background";
import { Typewriter } from "@/components/effects/typewriter";
import { Spotlight } from "@/components/effects/spotlight";

const features = [
  {
    icon: Sparkles,
    title: "Prompts",
    description: "Copy-paste AI prompts for every stage of development.",
    href: "/prompts",
    gradient: "from-cyan/20 to-blue-500/20",
  },
  {
    icon: Puzzle,
    title: "Tools & MCPs",
    description: "The best Claude MCPs, extensions, and dev tools.",
    href: "/mcps",
    gradient: "from-violet/20 to-purple-500/20",
  },
  {
    icon: Package,
    title: "Libraries & SDKs",
    description: "Curated web libraries and mobile SDKs.",
    href: "/web",
    gradient: "from-emerald-500/20 to-cyan/20",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Pre-built agent configs for your dev workflow.",
    href: "/agents",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

const trending = [
  "Claude Code CLI",
  "Supabase MCP",
  "Expo Router v4",
  "shadcn/ui Charts",
  "Drizzle ORM",
  "RevenueCat SDK",
  "Vercel MCP",
  "React 19",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <Spotlight className="min-h-screen">
      <GridBackground />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6">
            <Zap className="w-3 h-3 text-[#00f0ff]" />
            The Vibe Coder&apos;s Toolkit
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Ship apps faster{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] via-blue-400 to-[#a855f7] bg-clip-text text-transparent">
              than ever.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl">
            Every tool. Every prompt. Every shortcut.
          </p>

          <Typewriter />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-blue-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Copy className="w-4 h-4" />
              Browse Prompts
            </Link>
            <Link
              href="/mcps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Explore MCPs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="relative max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariant}>
              <Link href={feature.href} className="block group">
                <div className="glass rounded-2xl p-6 h-full hover:border-[#00f0ff]/20 transition-all duration-300">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/5 w-fit mb-4`}
                  >
                    <feature.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-4 text-xs text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Ticker */}
      <section className="relative border-y border-border/50 py-4 overflow-hidden">
        <div className="flex items-center gap-3 whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {[...trending, ...trending].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Stop learning.{" "}
            <span className="bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">
              Start shipping.
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Every piece of content on this site exists to be copied, clicked, or installed — not read, studied, or bookmarked for later.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-blue-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Set Up Your Mac
            </Link>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </Spotlight>
  );
}
