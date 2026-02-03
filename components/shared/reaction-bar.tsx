"use client";

import { useState } from "react";
import { handleReaction } from "@/lib/actions/reaction.actions";

interface Props {
  incidentId: string;
  initialCounts: { [key: string]: number };
}

// 1. Emoji Map (Color added for text styling)
const EMOJI_MAP = [
  { label: "justice", emoji: "✅", color: "text-green-600" },
  { label: "haha", emoji: "😆", color: "text-yellow-500" },
  { label: "sad", emoji: "😢", color: "text-blue-500" },
  { label: "angry", emoji: "😡", color: "text-red-500" },
];

export default function ReactionBar({ incidentId, initialCounts }: Props) {
  const [counts, setCounts] = useState(initialCounts);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 2. Logic to sort reactions by count (Highest first)
  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0);
  
  const topReactions = Object.entries(counts)
    .filter(([_, count]) => count > 0) // Remove 0 counts
    .sort((a, b) => b[1] - a[1])       // Sort highest to lowest
    .slice(0, 3);                      // Take top 3

  const onReact = async (type: string) => {
    if (loading) return;
    setLoading(true);
    const result = await handleReaction(incidentId, type);
    if (result.success) {
      window.location.reload(); 
    }
    setLoading(false);
  };

  return (
    <div className="relative mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
      
      {/* --- LEFT SIDE: ACTION BUTTON (Hover Trigger) --- */}
      <div className="group relative">
        {/* The Floating Dock (Hidden by default, shown on group-hover) */}
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex animate-in zoom-in duration-200">
           <div className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-xl ring-1 ring-black/5">
             {EMOJI_MAP.map((item, index) => (
               <button
                 key={item.label}
                 onClick={() => onReact(item.label)}
                 disabled={loading}
                 className="relative h-10 w-10 text-2xl transition-transform hover:scale-125 hover:-translate-y-1 focus:outline-none"
                 style={{ transitionDelay: `${index * 50}ms` }} // Staggered animation
               >
                 {item.emoji}
               </button>
             ))}
           </div>
        </div>

        {/* The Trigger Button */}
        <button className="flex items-center gap-2 rounded px-2 py-1 text-gray-500 hover:bg-gray-50 transition-colors">
          <span className="text-xl">👍</span>
          <span className="font-bold text-sm group-hover:text-gray-700">React</span>
        </button>
      </div>

      {/* --- RIGHT SIDE: THE PILE (Stacked Icons) --- */}
      {totalReactions > 0 && (
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 hover:underline"
        >
          {/* Stacked Emojis */}
          <div className="flex -space-x-1.5">
            {topReactions.map(([type], index) => {
               const emoji = EMOJI_MAP.find(e => e.label === type)?.emoji;
               return (
                 <div key={type} className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-white shadow-sm text-[10px]" style={{ zIndex: 10 - index }}>
                   {emoji}
                 </div>
               );
            })}
          </div>
          {/* Total Count */}
          <span className="text-xs text-gray-500 font-medium">
            {totalReactions}
          </span>
        </button>
      )}

      {/* --- MODAL: BREAKDOWN VIEW --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-2">
              <h3 className="font-black uppercase text-gray-500 text-xs tracking-widest">Reaction Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
            
            <div className="space-y-3">
              {EMOJI_MAP.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className={`text-sm font-bold uppercase ${item.color}`}>{item.label}</span>
                   </div>
                   <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md">
                     {counts[item.label] || 0}
                   </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}