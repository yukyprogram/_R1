"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ClothingItem, SwipeDirection } from "@/types";
import Image from "next/image";

interface SwipeCardProps {
  item: ClothingItem;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
}

export default function SwipeCard({ item, onSwipe, isTop }: SwipeCardProps) {
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const superLikeOpacity = useTransform(y, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 120;
    const velocityThreshold = 500;

    if (
      info.offset.x > threshold ||
      info.velocity.x > velocityThreshold
    ) {
      setExitDirection("right");
      onSwipe("right");
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      setExitDirection("left");
      onSwipe("left");
    } else if (
      info.offset.y < -threshold ||
      info.velocity.y < -velocityThreshold
    ) {
      setExitDirection("up");
      onSwipe("up");
    }
  };

  if (!isTop) {
    return (
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{ scale: 0.95, y: 10 }}
      >
        <div className="w-full h-full bg-neutral-900 rounded-3xl border border-neutral-800" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing card-enter"
      style={{ x, y, rotate, zIndex: 10 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection === "left"
          ? { x: -500, opacity: 0, transition: { duration: 0.3 } }
          : exitDirection === "right"
          ? { x: 500, opacity: 0, transition: { duration: 0.3 } }
          : exitDirection === "up"
          ? { y: -500, opacity: 0, transition: { duration: 0.3 } }
          : {}
      }
    >
      <div className="w-full h-full rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative">
        {/* Image */}
        <div className="relative w-full h-[65%] bg-gradient-to-b from-neutral-800 to-neutral-900 flex items-center justify-center">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={300}
            height={375}
            className="object-contain w-[75%] h-[90%] drop-shadow-2xl"
            priority
          />

          {/* Like stamp */}
          <motion.div
            className="absolute top-8 left-8 border-4 border-green-400 rounded-xl px-4 py-2 -rotate-12"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-green-400 font-black text-3xl tracking-wider">
              LIKE
            </span>
          </motion.div>

          {/* Nope stamp */}
          <motion.div
            className="absolute top-8 right-8 border-4 border-red-400 rounded-xl px-4 py-2 rotate-12"
            style={{ opacity: nopeOpacity }}
          >
            <span className="text-red-400 font-black text-3xl tracking-wider">
              NOPE
            </span>
          </motion.div>

          {/* Super Like stamp */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 border-4 border-blue-400 rounded-xl px-4 py-2"
            style={{ opacity: superLikeOpacity }}
          >
            <span className="text-blue-400 font-black text-2xl tracking-wider">
              SUPER LIKE
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
              {item.brand}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400 text-xs">{item.category}</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-gold-400 font-bold text-lg">
              ¥{item.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
