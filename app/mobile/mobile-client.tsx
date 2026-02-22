"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { ToolCard } from "@/components/cards/tool-card";
import { mobileTools, mobileCategories } from "@/data/mobile-tools";
import { PricingBadge } from "@/components/ui/pricing-badge";

const INITIAL_SHOW = 3;

export function MobileClient() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let result = category === "all"
      ? mobileTools
      : mobileTools.filter((t) => t.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.platforms.some((p) => p.toLowerCase().includes(q))
      );
    }
    return result;
  }, [category, search]);

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mobileTools.length };
    for (const t of mobileTools) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, []);

  const grouped = useMemo(() => {
    const groups: { category: { id: string; label: string }; tools: typeof mobileTools }[] = [];
    for (const cat of mobileCategories) {
      if (cat.id === "all") continue;
      const tools = mobileTools.filter((t) => t.category === cat.id);
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

  const showGrouped = category === "all" && !search.trim();

  return (
    <>
      <div className="relative max-w-full sm:max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <label htmlFor="mobile-search" className="sr-only">Search tools</label>
        <input
          id="mobile-search"
          type="text"
          placeholder="Search mobile tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all"
        />
      </div>

      <CategoryFilter
        categories={mobileCategories}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleTools.map((tool, i) => (
                    <ToolCard
                      key={tool.id}
                      name={tool.name}
                      description={tool.description}
                      url={tool.url}

                      tags={tool.platforms}
                      index={i}
                      extra={<PricingBadge pricing={tool.pricing} />}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool, i) => (
              <ToolCard
                key={tool.id}
                name={tool.name}
                description={tool.description}
                url={tool.url}
                tags={tool.platforms}
                index={i}
                extra={<PricingBadge pricing={tool.pricing} />}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1">
                {search.trim() ? `No tools matching "${search}"` : "No tools in this category yet."}
              </p>
              <p className="text-sm text-muted-foreground/60 mb-4">Try a different search term or browse another category.</p>
              <button
                onClick={() => { setSearch(""); setCategory("all"); }}
                className="text-sm text-cyan hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
