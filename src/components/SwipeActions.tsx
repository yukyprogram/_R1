"use client";

import { motion } from "framer-motion";
import { X, Heart, Star, RotateCcw } from "lucide-react";

interface SwipeActionsProps {
  onNope: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export default function SwipeActions({
  onNope,
  onLike,
  onSuperLike,
  onUndo,
  canUndo,
}: SwipeActionsProps) {
  const buttonBase =
    "rounded-full flex items-center justify-center transition-all duration-200 active:scale-90";

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} w-12 h-12 border border-neutral-700 ${
          canUndo
            ? "text-yellow-500 hover:bg-yellow-500/10"
            : "text-neutral-700 cursor-not-allowed"
        }`}
        onClick={onUndo}
        disabled={!canUndo}
      >
        <RotateCcw size={18} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} w-16 h-16 border-2 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500`}
        onClick={onNope}
      >
        <X size={28} strokeWidth={3} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} w-14 h-14 border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400`}
        onClick={onSuperLike}
      >
        <Star size={24} fill="currentColor" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} w-16 h-16 border-2 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:border-green-500`}
        onClick={onLike}
      >
        <Heart size={28} fill="currentColor" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${buttonBase} w-12 h-12 border border-neutral-700 text-neutral-500 hover:text-gold-400 hover:border-gold-400`}
        onClick={() => {}}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </motion.button>
    </div>
  );
}
