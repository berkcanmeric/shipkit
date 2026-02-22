import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShipKit",
  description: "The Vibe Coder's Toolkit.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">ShipKit</h1>
      </div>
    </div>
  );
}
