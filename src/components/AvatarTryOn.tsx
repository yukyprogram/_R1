"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarConfig, ClothingItem } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  RotateCw,
  Sparkles,
  ShoppingBag,
  Shirt,
} from "lucide-react";
import Image from "next/image";

interface AvatarTryOnProps {
  avatar: AvatarConfig;
  likedItems: ClothingItem[];
  onBack: () => void;
}

export default function AvatarTryOn({
  avatar,
  likedItems,
  onBack,
}: AvatarTryOnProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [rotation, setRotation] = useState(0);

  const currentItem = likedItems[selectedIndex];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  useEffect(() => {
    setGenerated(false);
  }, [selectedIndex]);

  const bodyWidth =
    avatar.bodyType === "slim"
      ? 100
      : avatar.bodyType === "regular"
      ? 120
      : avatar.bodyType === "athletic"
      ? 130
      : 140;

  const bodyHeight = ((avatar.height - 140) / 60) * 100 + 200;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="text-neutral-400 hover:text-white transition"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shirt size={18} className="text-gold-400" />
          AI試着
        </h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white transition">
            <Share2 size={16} />
          </button>
          <button className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white transition">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Avatar + Clothing Display */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-gold-400/30 animate-ping" />
                  <div className="absolute inset-4 rounded-full border-2 border-gold-400/20 animate-ping animation-delay-200" />
                  <div className="absolute inset-8 rounded-full border-2 border-gold-400/10 animate-ping animation-delay-400" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles size={48} className="text-gold-400 animate-pulse" />
                  </div>
                </div>
                <p className="text-gold-400 font-semibold animate-pulse">
                  AIが試着画像を生成中...
                </p>
                <p className="text-neutral-500 text-sm mt-2">
                  アバターにぴったりのスタイルを作成しています
                </p>
              </motion.div>
            ) : generated ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
                style={{ transform: `rotateY(${rotation}deg)` }}
              >
                {/* Generated Avatar with Clothing */}
                <div className="relative glass rounded-3xl p-6 max-w-xs mx-auto">
                  <div
                    className="relative mx-auto"
                    style={{
                      width: `${bodyWidth + 40}px`,
                      height: `${bodyHeight + 40}px`,
                    }}
                  >
                    {/* Avatar Body */}
                    <svg
                      viewBox="0 0 200 400"
                      className="w-full h-full"
                      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
                    >
                      {/* Head */}
                      <circle cx="100" cy="45" r="30" fill={avatar.skinTone} />
                      <circle cx="88" cy="40" r="3" fill="#333" />
                      <circle cx="112" cy="40" r="3" fill="#333" />
                      <path
                        d="M92 52 Q100 58 108 52"
                        stroke="#333"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      {/* Neck */}
                      <rect
                        x="92"
                        y="70"
                        width="16"
                        height="15"
                        fill={avatar.skinTone}
                      />
                      {/* Torso with clothing */}
                      <path
                        d={`M${100 - bodyWidth / 2.5} 85 Q100 80 ${100 + bodyWidth / 2.5} 85 L${100 + bodyWidth / 3} 200 Q100 205 ${100 - bodyWidth / 3} 200 Z`}
                        fill={currentItem?.category === "トップス" ? "#D4AF37" : "#555"}
                        stroke={currentItem?.category === "トップス" ? "#E5C04B" : "#666"}
                        strokeWidth="1"
                      />
                      {/* Arms */}
                      <path
                        d={`M${100 - bodyWidth / 2.5} 85 L${100 - bodyWidth / 2 - 20} 170 L${100 - bodyWidth / 2 - 10} 175 L${100 - bodyWidth / 3} 120`}
                        fill={avatar.skinTone}
                        stroke={avatar.skinTone}
                        strokeWidth="2"
                      />
                      <path
                        d={`M${100 + bodyWidth / 2.5} 85 L${100 + bodyWidth / 2 + 20} 170 L${100 + bodyWidth / 2 + 10} 175 L${100 + bodyWidth / 3} 120`}
                        fill={avatar.skinTone}
                        stroke={avatar.skinTone}
                        strokeWidth="2"
                      />
                      {/* Legs/Pants */}
                      <path
                        d={`M${100 - bodyWidth / 3} 200 L${100 - bodyWidth / 3 - 5} 340 L${100 - bodyWidth / 3 + 20} 340 L100 220 L${100 + bodyWidth / 3 - 20} 340 L${100 + bodyWidth / 3 + 5} 340 L${100 + bodyWidth / 3} 200 Z`}
                        fill={currentItem?.category === "ボトムス" ? "#2C4070" : "#333"}
                        stroke={currentItem?.category === "ボトムス" ? "#3C5080" : "#444"}
                        strokeWidth="1"
                      />
                      {/* Shoes */}
                      <ellipse
                        cx={100 - bodyWidth / 3 + 7}
                        cy="345"
                        rx="15"
                        ry="8"
                        fill="#222"
                      />
                      <ellipse
                        cx={100 + bodyWidth / 3 - 7}
                        cy="345"
                        rx="15"
                        ry="8"
                        fill="#222"
                      />
                    </svg>

                    {/* Overlay clothing image */}
                    {currentItem && (
                      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] opacity-70 mix-blend-overlay">
                        <Image
                          src={currentItem.imageUrl}
                          alt={currentItem.name}
                          width={120}
                          height={150}
                          className="w-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Rotate button */}
                  <button
                    onClick={() => setRotation((r) => (r + 45) % 360)}
                    className="absolute bottom-3 right-3 p-2 rounded-full glass text-neutral-400 hover:text-gold-400 transition"
                  >
                    <RotateCw size={16} />
                  </button>

                  {/* AI Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-gold-400/20 text-gold-400 text-xs font-medium flex items-center gap-1">
                    <Sparkles size={10} /> AI Generated
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                {currentItem ? (
                  <div className="relative">
                    <Image
                      src={currentItem.imageUrl}
                      alt={currentItem.name}
                      width={250}
                      height={312}
                      className="mx-auto rounded-2xl drop-shadow-2xl"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerate}
                      className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold flex items-center gap-2 mx-auto hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg shadow-gold-500/20"
                    >
                      <Sparkles size={18} />
                      AIで試着する
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-neutral-500">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                    <p>まだアイテムがありません</p>
                    <p className="text-sm mt-1">スワイプでアイテムをLIKEしてください</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Item Selector */}
        {likedItems.length > 0 && (
          <div className="border-t border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-neutral-400">
                お気に入りアイテム ({likedItems.length})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedIndex(
                      (i) => (i - 1 + likedItems.length) % likedItems.length
                    )
                  }
                  className="p-1 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setSelectedIndex((i) => (i + 1) % likedItems.length)
                  }
                  className="p-1 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {likedItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedIndex
                      ? "border-gold-400 scale-105"
                      : "border-neutral-800 opacity-60"
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {currentItem && (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{currentItem.name}</p>
                  <p className="text-xs text-neutral-500">{currentItem.brand}</p>
                </div>
                <span className="text-gold-400 font-bold">
                  ¥{currentItem.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
