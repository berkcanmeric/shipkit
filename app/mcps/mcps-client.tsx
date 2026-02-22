"use client";

import { useState, useMemo } from "react";
import { Search, SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { MCPCard } from "@/components/cards/mcp-card";
import { mcps, mcpCategories } from "@/data/mcps";

const essentialMCPs = mcps.filter((m) => m.category === "essential");
const nonEssentialMCPs = mcps.filter((m) => m.category !== "essential");

export function MCPsClient() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = category === "all"
      ? mcps
      : mcps.filter((m) => m.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, search]);

  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mcps.length };
    for (const m of mcps) {
      counts[m.category] = (counts[m.category] || 0) + 1;
    }
    return counts;
  }, []);

  const showMustHave = category === "all" && !search.trim();

  return (
    <>
      <div className="relative max-w-full sm:max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <label htmlFor="mcp-search" className="sr-only">Search MCPs</label>
        <input
          id="mcp-search"
          type="text"
          placeholder="Search MCPs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all"
        />
      </div>

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
        {(showMustHave ? nonEssentialMCPs : filtered.filter((m) => !showMustHave || m.category !== "essential")).map(
          (mcp, i) => (
            <MCPCard key={mcp.id} mcp={mcp} index={i} />
          )
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-1">
            {search.trim() ? `No MCPs matching "${search}"` : "No MCPs in this category yet."}
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
  );
}
