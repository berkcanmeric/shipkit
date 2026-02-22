"use client";

import { useState, useMemo } from "react";
import { Search, SearchX } from "lucide-react";
import { CategoryFilter } from "@/components/sections/category-filter";
import { PromptCard } from "@/components/cards/prompt-card";
import { prompts, promptCategories } from "@/data/prompts";

export function PromptsClient() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = category === "all"
      ? prompts
      : prompts.filter((p) => p.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [category, search]);

  // Top 3 by upvotes for featured section
  const featured = useMemo(
    () => [...prompts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3),
    []
  );

  // Item counts per category
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: prompts.length };
    for (const p of prompts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  const showFeatured = category === "all" && !search.trim();

  return (
    <>
      {/* Search input */}
      <div className="relative max-w-full sm:max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <label htmlFor="prompt-search" className="sr-only">Search prompts</label>
        <input
          id="prompt-search"
          type="text"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 transition-all"
        />
      </div>

      <CategoryFilter
        categories={promptCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
        itemCounts={itemCounts}
      />

      {/* Featured section */}
      {showFeatured && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
            Most Popular
          </h2>
          <div className="space-y-4">
            {featured.map((prompt, i) => (
              <PromptCard key={prompt.id} prompt={prompt} index={i} featured />
            ))}
          </div>
        </div>
      )}

      {/* All prompts */}
      {showFeatured && (
        <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
          All Prompts
        </h2>
      )}
      <div className="space-y-4">
        {filtered.map((prompt, i) => (
          <PromptCard key={prompt.id} prompt={prompt} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <SearchX className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground mb-1">
            {search.trim() ? `No prompts matching "${search}"` : "No prompts in this category yet."}
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
