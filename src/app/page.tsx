"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BottomNav, { TabId } from "@/components/BottomNav";
import SwipeCard from "@/components/SwipeCard";
import SwipeActions from "@/components/SwipeActions";
import LikedItems from "@/components/LikedItems";
import AvatarCreator from "@/components/AvatarCreator";
import AvatarTryOn from "@/components/AvatarTryOn";
import { clothingItems } from "@/data/clothing";
import { ClothingItem, AvatarConfig, SwipeDirection } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("swipe");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<ClothingItem[]>([]);
  const [superLiked, setSuperLiked] = useState<ClothingItem[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);
  const [history, setHistory] = useState<
    { item: ClothingItem; direction: SwipeDirection }[]
  >([]);
  const [avatar, setAvatar] = useState<AvatarConfig | null>(null);

  const currentItem = clothingItems[currentIndex];
  const nextItem =
    currentIndex + 1 < clothingItems.length
      ? clothingItems[currentIndex + 1]
      : null;

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!currentItem) return;

      setHistory((prev) => [...prev, { item: currentItem, direction }]);

      if (direction === "right") {
        setLiked((prev) => [...prev, currentItem]);
      } else if (direction === "up") {
        setSuperLiked((prev) => [...prev, currentItem]);
        setLiked((prev) => [...prev, currentItem]);
      } else {
        setDisliked((prev) => [...prev, currentItem.id]);
      }

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    },
    [currentItem]
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    if (last.direction === "right") {
      setLiked((prev) => prev.filter((i) => i.id !== last.item.id));
    } else if (last.direction === "up") {
      setSuperLiked((prev) => prev.filter((i) => i.id !== last.item.id));
      setLiked((prev) => prev.filter((i) => i.id !== last.item.id));
    } else {
      setDisliked((prev) => prev.filter((id) => id !== last.item.id));
    }

    setCurrentIndex((prev) => prev - 1);
  }, [history]);

  const handleRemoveLiked = useCallback((id: string) => {
    setLiked((prev) => prev.filter((i) => i.id !== id));
    setSuperLiked((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const allLiked = Array.from(new Map(liked.map((i) => [i.id, i])).values());

  return (
    <>
      <Header />

      <main className="flex-1 overflow-hidden relative">
        {activeTab === "swipe" && (
          <div className="h-full flex flex-col">
            {/* Card Stack */}
            <div className="flex-1 relative p-4">
              {currentIndex >= clothingItems.length ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gold-400/10 flex items-center justify-center mb-4">
                    <span className="text-4xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">すべて見ました！</h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    新しいアイテムが追加されるまでお待ちください
                  </p>
                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      setHistory([]);
                    }}
                    className="px-6 py-3 rounded-xl bg-gold-400/10 text-gold-400 border border-gold-400/20 hover:bg-gold-400/20 transition"
                  >
                    もう一度見る
                  </button>
                </div>
              ) : (
                <div className="relative h-full">
                  {nextItem && (
                    <SwipeCard
                      key={`next-${nextItem.id}`}
                      item={nextItem}
                      onSwipe={() => {}}
                      isTop={false}
                    />
                  )}
                  {currentItem && (
                    <SwipeCard
                      key={currentItem.id}
                      item={currentItem}
                      onSwipe={handleSwipe}
                      isTop={true}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Counter */}
            {currentIndex < clothingItems.length && (
              <div className="text-center pb-1">
                <span className="text-xs text-neutral-600">
                  {currentIndex + 1} / {clothingItems.length}
                </span>
              </div>
            )}

            {/* Actions */}
            {currentIndex < clothingItems.length && (
              <SwipeActions
                onNope={() => handleSwipe("left")}
                onLike={() => handleSwipe("right")}
                onSuperLike={() => handleSwipe("up")}
                onUndo={handleUndo}
                canUndo={history.length > 0}
              />
            )}
          </div>
        )}

        {activeTab === "likes" && (
          <LikedItems
            liked={liked.filter(
              (i) => !superLiked.find((s) => s.id === i.id)
            )}
            superLiked={superLiked}
            onRemove={handleRemoveLiked}
          />
        )}

        {activeTab === "avatar" && (
          <AvatarCreator
            onBack={() => setActiveTab("swipe")}
            onComplete={(config) => {
              setAvatar(config);
              setActiveTab("tryon");
            }}
          />
        )}

        {activeTab === "tryon" && (
          <>
            {avatar ? (
              <AvatarTryOn
                avatar={avatar}
                likedItems={allLiked}
                onBack={() => setActiveTab("swipe")}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-gold-400/10 flex items-center justify-center mb-4">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  まずアバターを作成しましょう
                </h3>
                <p className="text-neutral-400 text-sm mb-6">
                  AIアバターを作成して、お気に入りの服を試着できます
                </p>
                <button
                  onClick={() => setActiveTab("avatar")}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  アバターを作成
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        likeCount={allLiked.length}
      />
    </>
  );
}
