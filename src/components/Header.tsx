"use client";

import { Flame, SlidersHorizontal, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/50">
      <button className="p-2 rounded-lg hover:bg-neutral-800 transition">
        <SlidersHorizontal size={20} className="text-neutral-400" />
      </button>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Flame size={28} className="text-gold-400" fill="currentColor" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        </div>
        <span className="text-xl font-black tracking-tight">
          <span className="text-gold-400">Swipe</span>
          <span className="text-white">Style</span>
        </span>
      </div>

      <button className="relative p-2 rounded-lg hover:bg-neutral-800 transition">
        <Bell size={20} className="text-neutral-400" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
      </button>
    </header>
  );
}
