"use client";

import { motion } from "framer-motion";
import { Terminal, Wrench, Sparkles, Puzzle } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SetupCard } from "@/components/cards/setup-card";
import { setupItems, setupCategories } from "@/data/setup";
import { GridBackground } from "@/components/effects/grid-background";

const iconMap: Record<string, React.ElementType> = {
  Terminal,
  Wrench,
  Sparkles,
  Puzzle,
};

export default function SetupPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          title="Mac Dev"
          accent="Setup"
          description="The perfect Mac development environment. Checklist-style with copy-ready commands. Check them off as you go."
        />

        <div className="space-y-12">
          {setupCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Terminal;
            const items = setupItems.filter((i) => i.category === cat.id);

            return (
              <motion.section
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 border border-[#00f0ff]/10">
                    <Icon className="w-4 h-4 text-[#00f0ff]" />
                  </div>
                  <h2 className="text-xl font-bold">{cat.label}</h2>
                </div>

                <div className="space-y-2">
                  {items.map((item, i) => (
                    <SetupCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
