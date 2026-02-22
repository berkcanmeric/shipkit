"use client";

import { useState, useMemo } from "react";
import { ChevronDown, SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolCard } from "@/components/cards/tool-card";
import { webTools, webCategories } from "@/data/web-tools";

const FEATURED_IDS = ["shadcn-ui", "supabase", "stripe", "aceternity-ui"];
const INITIAL_SHOW = 4;

export function WebClient() {
  const [category, setCategory] = useState("all");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      category === "all"
        ? webTools
        : webTools.filter((t) => t.category === category),
    [category]
  );

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: webTools.length };
    for (const t of webTools) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Group by category for "all" view
  const grouped = useMemo(() => {
    const groups: { category: { id: string; label: string }; tools: typeof webTools }[] = [];
    for (const cat of webCategories) {
      if (cat.id === "all") continue;
      const tools = webTools.filter((t) => t.category === cat.id);
      if (tools.length > 0) groups.push({ category: cat, tools });
    }
    return groups;
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const showGrouped = category === "all";

  return (
    <>
      <CategoryFilter
        categories={webCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
        itemCounts={itemCounts}
      />

      {showGrouped ? (
        <div className="space-y-10">
          {grouped.map(({ category: cat, tools }) => {
            const isExpanded = expandedSections.has(cat.id);
            const visibleTools = isExpanded ? tools : tools.slice(0, INITIAL_SHOW);
            const hasMore = tools.length > INITIAL_SHOW;

            return (
              <section key={cat.id}>
                <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {cat.label}
                  <span className="text-muted-foreground/40 ml-2">{tools.length}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visibleTools.map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      name={tool.name}
                      description={tool.description}
                      url={tool.url}

                      tags={tool.tags}
                      index={i}
                      featured={FEATURED_IDS.includes(tool.id)}
                      iconUrl={tool.iconUrl}
                    />
                  ))}
                </div>
                {hasMore && !isExpanded && (
                  <button
                    onClick={() => toggleSection(cat.id)}
                    className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-cyan transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    Show all {tools.length}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((tool, i) => (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                url={tool.url}
                tags={tool.tags}
                index={i}
                featured={FEATURED_IDS.includes(tool.id)}
                iconUrl={tool.iconUrl}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1">No libraries in this category yet.</p>
              <p className="text-sm text-muted-foreground/60 mb-4">Try browsing a different category.</p>
              <button
                onClick={() => setCategory("all")}
                className="text-sm text-cyan hover:underline"
              >
                View all libraries
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
