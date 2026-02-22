import { BackgroundBeams } from "./background-beams";

export function GridBackground({
  colorTint = "cyan",
}: {
  colorTint?: "cyan" | "amber" | "violet" | "emerald" | "blue" | "neutral" | "purple";
}) {
  return <BackgroundBeams colorTint={colorTint} />;
}
