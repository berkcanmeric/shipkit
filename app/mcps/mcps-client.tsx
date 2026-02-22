"use client";

import { useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { MCPCard } from "@/components/cards/mcp-card";
import { mcps, mcpCategories } from "@/data/mcps";

const essentialMCPs = mcps.filter((m) => m.category === "essential");
const nonEssentialMCPs = mcps.filter((m) => m.category !== "essential");

export function MCPsClient() {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      category === "all"
        ? mcps
        : mcps.filter((m) => m.category === category),
    [category]
  );

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mcps.length };
    for (const m of mcps) {
      counts[m.category] = (counts[m.category] || 0) + 1;
    }
    return counts;
  }, []);

  const showMustHave = category === "all";

  return (
    <>
      <CategoryFilter
        categories={mcpCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
        itemCounts={itemCounts}
      />

      {/* Must-Have Hero Section */}
      {showMustHave && (
        <div className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
            Must-Have MCPs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {essentialMCPs.map((mcp, i) => (
              <MCPCard key={mcp.id} mcp={mcp} index={i} prominent />
            ))}
          </div>
        </div>
      )}

      {/* Remaining / Filtered */}
      {showMustHave && (
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
          All MCPs
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(showMustHave ? nonEssentialMCPs : filtered).map(
          (mcp, i) => (
            <MCPCard key={mcp.id} mcp={mcp} index={i} />
          )
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-1">No MCPs in this category yet.</p>
          <p className="text-sm text-muted-foreground/60 mb-4">Try browsing a different category.</p>
          <button
            onClick={() => setCategory("all")}
            className="text-sm text-cyan hover:underline"
          >
            View all MCPs
          </button>
        </div>
      )}
    </>
  );
}
