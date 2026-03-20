"use client";

import { motion } from "framer-motion";
import { ClothingItem } from "@/types";
import { Heart, Star, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface LikedItemsProps {
  liked: ClothingItem[];
  superLiked: ClothingItem[];
  onRemove: (id: string) => void;
}

export default function LikedItems({
  liked,
  superLiked,
  onRemove,
}: LikedItemsProps) {
  const allItems = [
    ...superLiked.map((item) => ({ ...item, isSuperLiked: true })),
    ...liked.map((item) => ({ ...item, isSuperLiked: false })),
  ];

  if (allItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <ShoppingBag size={64} className="text-neutral-700 mb-4" />
        <h3 className="text-xl font-bold text-neutral-400 mb-2">
          まだアイテムがありません
        </h3>
        <p className="text-neutral-600 text-sm">
          スワイプでお気に入りのアイテムを見つけましょう
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">
          お気に入り{" "}
          <span className="text-gold-400">({allItems.length})</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {allItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative group"
          >
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <div className="relative aspect-[3/4] bg-neutral-800">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.isSuperLiked && (
                  <div className="absolute top-2 left-2 p-1.5 rounded-full bg-blue-500/20 backdrop-blur-sm">
                    <Star size={12} className="text-blue-400" fill="currentColor" />
                  </div>
                )}
                <button
                  onClick={() => onRemove(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs text-gold-400/80 font-medium tracking-wide">
                  {item.brand}
                </p>
                <p className="text-sm font-semibold mt-0.5 line-clamp-1">
                  {item.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gold-400 font-bold text-sm">
                    ¥{item.price.toLocaleString()}
                  </span>
                  <Heart size={14} className="text-red-400" fill="currentColor" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
