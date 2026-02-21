"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: readonly { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={cn(
            "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors",
            activeCategory === cat.id
              ? "text-cyan"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="category-active"
              className="absolute inset-0 rounded-xl bg-cyan/10 border border-cyan/20"
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
