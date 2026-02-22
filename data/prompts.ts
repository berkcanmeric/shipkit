export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  bestWith: string;
  upvotes: number;
}

export const promptCategories = [
  { id: "all", label: "All" },
] as const;

export const prompts: Prompt[] = [];
