"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Sparkles,
  Bot,
  Puzzle,
  Globe,
  Smartphone,
  Monitor,
  Workflow,
  Copy,
  ExternalLink,
} from "lucide-react";
import { prompts } from "@/data/prompts";
import { agents } from "@/data/agents";
import { mcps } from "@/data/mcps";
import { webTools } from "@/data/web-tools";
import { mobileTools } from "@/data/mobile-tools";
import { copyToClipboard } from "@/lib/copy-to-clipboard";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search prompts, tools, MCPs, libraries..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {[
            { label: "Prompts", href: "/prompts", icon: Sparkles },
            { label: "Agents", href: "/agents", icon: Bot },
            { label: "MCPs", href: "/mcps", icon: Puzzle },
            { label: "Web Libraries", href: "/web", icon: Globe },
            { label: "Mobile SDKs", href: "/mobile", icon: Smartphone },
            { label: "Mac Setup", href: "/setup", icon: Monitor },
            { label: "Workflows", href: "/workflows", icon: Workflow },
          ].map((page) => (
            <CommandItem
              key={page.href}
              onSelect={() => {
                router.push(page.href);
                onOpenChange(false);
              }}
            >
              <page.icon className="mr-2 h-4 w-4" />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Prompts">
          {prompts.slice(0, 5).map((prompt) => (
            <CommandItem
              key={prompt.id}
              onSelect={() => {
                copyToClipboard(prompt.prompt, "Prompt");
                onOpenChange(false);
              }}
            >
              <Copy className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{prompt.title}</span>
                <span className="text-xs text-muted-foreground">
                  {prompt.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="MCPs">
          {mcps.slice(0, 5).map((mcp) => (
            <CommandItem
              key={mcp.id}
              onSelect={() => {
                copyToClipboard(mcp.installCommand, "Install command");
                onOpenChange(false);
              }}
            >
              <Puzzle className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{mcp.name}</span>
                <span className="text-xs text-muted-foreground">
                  {mcp.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Web Libraries">
          {webTools.slice(0, 5).map((tool) => (
            <CommandItem
              key={tool.id}
              onSelect={() => {
                window.open(tool.url, "_blank");
                onOpenChange(false);
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{tool.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tool.description}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
