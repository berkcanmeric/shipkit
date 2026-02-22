"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal, Wrench, Star, Puzzle, ChevronDown, ChevronUp } from "lucide-react";
import { SetupCard } from "@/components/cards/setup-card";
import { setupItems, setupCategories } from "@/data/setup";

const iconMap: Record<string, React.ElementType> = {
  Terminal, Wrench, Star, Puzzle,
};

function countCompleted() {
  let count = 0;
  for (const item of setupItems) {
    try {
      if (localStorage.getItem(`setup-done-${item.id}`) === "true") count++;
    } catch {}
  }
  return count;
}

function useSetupProgress() {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(countCompleted());

    const handler = () => setCompletedCount(countCompleted());

    // Cross-tab changes only — no polling needed
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Expose a refresh function for same-tab updates
  const refresh = useCallback(() => setCompletedCount(countCompleted()), []);

  return { completedCount, total: setupItems.length, refresh };
}

export function SetupClient() {
  const { completedCount, total, refresh } = useSetupProgress();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const percentage = Math.round((completedCount / total) * 100);

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Progress bar */}
      <div className="max-w-md mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>{completedCount} of {total} complete</span>
          <span className="text-cyan font-medium">{percentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="space-y-10">
        {setupCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || Terminal;
          const items = setupItems.filter((i) => i.category === cat.id);
          const isCollapsed = collapsedSections.has(cat.id);

          return (
            <section key={cat.id}>
              <button
                onClick={() => toggleSection(cat.id)}
                className="flex items-center gap-3 mb-4 group w-full text-left"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan/10 to-violet/10 border border-cyan/10">
                  <Icon className="w-4 h-4 text-cyan" />
                </div>
                <h2 className="text-xl font-bold flex-1">{cat.label}</h2>
                <span className="text-xs text-muted-foreground">{items.length} items</span>
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <SetupCard key={item.id} item={item} index={i} onToggle={refresh} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
