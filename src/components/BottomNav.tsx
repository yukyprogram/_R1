"use client";

import { motion } from "framer-motion";
import { Flame, Heart, User, Sparkles } from "lucide-react";

export type TabId = "swipe" | "likes" | "avatar" | "tryon";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  likeCount: number;
}

export default function BottomNav({
  activeTab,
  onTabChange,
  likeCount,
}: BottomNavProps) {
  const tabs: { id: TabId; icon: React.ReactNode; label: string }[] = [
    { id: "swipe", icon: <Flame size={22} />, label: "発見" },
    { id: "likes", icon: <Heart size={22} />, label: "LIKE" },
    { id: "avatar", icon: <User size={22} />, label: "アバター" },
    { id: "tryon", icon: <Sparkles size={22} />, label: "試着" },
  ];

  return (
    <nav className="flex items-center justify-around border-t border-neutral-800 bg-black/80 backdrop-blur-xl px-2 py-2 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors"
          >
            <div
              className={`transition-colors ${
                isActive ? "text-gold-400" : "text-neutral-500"
              }`}
            >
              {tab.icon}
              {tab.id === "likes" && likeCount > 0 && (
                <span className="absolute -top-0.5 right-2 min-w-[18px] h-[18px] rounded-full bg-gold-400 text-black text-[10px] font-bold flex items-center justify-center px-1">
                  {likeCount}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] ${
                isActive ? "text-gold-400 font-medium" : "text-neutral-600"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-2 w-8 h-0.5 rounded-full bg-gold-400"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
