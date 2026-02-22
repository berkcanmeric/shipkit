"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import {
  Layers,
  Hammer,
  Palette,
  Plug,
  Smartphone,
  FlaskConical,
  Rocket,
  Bug,
  FileText,
  Star,
  Wrench,
  Globe,
  MonitorSmartphone,
  DollarSign,
  Bell,
  BarChart3,
  Store,
  Cpu,
  Library,
  Database,
  CreditCard,
  Mail,
  GitFork,
  SlidersHorizontal,
  Upload,
  BookOpen,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Layers, Hammer, Palette, Plug, Smartphone, FlaskConical, Rocket, Bug, FileText,
  Star, Wrench, Globe, MonitorSmartphone, DollarSign, Bell, BarChart3, Store,
  Cpu, Library, Database, CreditCard, Mail, GitFork, SlidersHorizontal, Upload, BookOpen,
};

interface CategoryFilterProps {
  categories: readonly { id: string; label: string; icon?: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  itemCounts?: Record<string, number>;
}

export const CategoryFilter = memo(function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  itemCounts,
}: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 mb-6 sm:mb-8">
      {categories.map((cat) => {
        const Icon = cat.icon ? iconMap[cat.icon] : null;
        const count = itemCounts?.[cat.id];
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "text-cyan bg-cyan/10 border border-cyan/20"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            )}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {cat.label}
            {count !== undefined && (
              <span className="text-[10px] opacity-60 ml-0.5">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
});
