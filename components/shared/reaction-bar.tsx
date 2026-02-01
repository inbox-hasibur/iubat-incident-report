"use client";

import { useState } from "react";
import { handleReaction } from "@/lib/actions/reaction.actions";

interface Props {
  incidentId: string;
  initialCounts: { [key: string]: number };
}

const EMOJI_MAP = [
  { label: "justice", emoji: "✅" },
  { label: "agree", emoji: "👌" },
  { label: "haha", emoji: "😂" },
  { label: "angry", emoji: "😡" },
  { label: "sad", emoji: "🥲" },
  { label: "support", emoji: "❤️" },
];

export default function ReactionBar({ incidentId, initialCounts }: Props) {
  const [counts, setCounts] = useState(initialCounts);
  const [loading, setLoading] = useState(false);

  const onReact = async (type: string) => {
    if (loading) return;
    setLoading(true);

    const result = await handleReaction(incidentId, type);
    if (result.success) {
      // Refresh local state logic (simplified for 1:1)
      window.location.reload(); 
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-50">
      {EMOJI_MAP.map((item) => (
        <button
          key={item.label}
          onClick={() => onReact(item.label)}
          disabled={loading}
          className="group flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 transition-all hover:bg-red-50 active:scale-90"
        >
          <span className="text-sm grayscale group-hover:grayscale-0 transition-all">
            {item.emoji}
          </span>
          <span className="text-[10px] font-black text-gray-400 group-hover:text-red-600">
            {counts[item.label] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}