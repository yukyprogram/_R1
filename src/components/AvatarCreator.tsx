"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AvatarConfig } from "@/types";
import { ChevronLeft, Sparkles, User, Ruler, Palette } from "lucide-react";

interface AvatarCreatorProps {
  onBack: () => void;
  onComplete: (config: AvatarConfig) => void;
}

const skinTones = [
  "#FDDBB4", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", "#5C3310",
];

export default function AvatarCreator({ onBack, onComplete }: AvatarCreatorProps) {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<AvatarConfig>({
    gender: "neutral",
    bodyType: "regular",
    skinTone: skinTones[0],
    height: 170,
  });

  const steps = [
    {
      title: "体型タイプ",
      icon: <User size={20} />,
    },
    {
      title: "身長",
      icon: <Ruler size={20} />,
    },
    {
      title: "肌のトーン",
      icon: <Palette size={20} />,
    },
  ];

  const handleComplete = () => {
    onComplete(config);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neutral-800">
        <button onClick={onBack} className="text-neutral-400 hover:text-white transition">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">AIアバター作成</h2>
        <Sparkles size={18} className="text-gold-400" />
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 px-4 pt-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? "bg-gold-400" : "bg-neutral-800"
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    {steps[0].icon} {steps[0].title}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    あなたに近い体型を選んでください
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">性別</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["male", "female", "neutral"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setConfig({ ...config, gender: g })}
                        className={`p-4 rounded-xl border transition-all ${
                          config.gender === g
                            ? "border-gold-400 bg-gold-400/10 text-gold-400"
                            : "border-neutral-800 hover:border-neutral-600 text-neutral-400"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">
                            {g === "male" ? "👤" : g === "female" ? "👤" : "👤"}
                          </div>
                          <span className="text-xs">
                            {g === "male" ? "男性" : g === "female" ? "女性" : "その他"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">体型</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { value: "slim", label: "スリム" },
                        { value: "regular", label: "レギュラー" },
                        { value: "athletic", label: "アスレチック" },
                        { value: "plus", label: "プラス" },
                      ] as const
                    ).map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() =>
                          setConfig({ ...config, bodyType: value })
                        }
                        className={`p-4 rounded-xl border transition-all text-sm ${
                          config.bodyType === value
                            ? "border-gold-400 bg-gold-400/10 text-gold-400"
                            : "border-neutral-800 hover:border-neutral-600 text-neutral-400"
                        }`}
                      >
                        <AvatarSilhouette bodyType={value} selected={config.bodyType === value} />
                        <span className="mt-2 block">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    {steps[1].icon} {steps[1].title}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    身長を設定してください
                  </p>
                </div>

                <div className="flex flex-col items-center gap-6 py-8">
                  <div className="text-6xl font-bold text-gold-400">
                    {config.height}
                    <span className="text-2xl text-neutral-400 ml-1">cm</span>
                  </div>

                  <input
                    type="range"
                    min={140}
                    max={200}
                    value={config.height}
                    onChange={(e) =>
                      setConfig({ ...config, height: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-400
                      [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />

                  <div className="flex justify-between w-full text-xs text-neutral-600">
                    <span>140cm</span>
                    <span>170cm</span>
                    <span>200cm</span>
                  </div>

                  {/* Visual height indicator */}
                  <div className="relative w-24 mt-4">
                    <div
                      className="bg-gradient-to-t from-gold-400/20 to-gold-400/5 rounded-t-full border border-gold-400/30 mx-auto transition-all duration-300"
                      style={{
                        height: `${((config.height - 140) / 60) * 120 + 80}px`,
                        width: "60px",
                      }}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                    {steps[2].icon} {steps[2].title}
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    肌のトーンを選んでください
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4">
                  {skinTones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setConfig({ ...config, skinTone: tone })}
                      className={`aspect-square rounded-2xl border-2 transition-all ${
                        config.skinTone === tone
                          ? "border-gold-400 scale-105 shadow-lg shadow-gold-400/20"
                          : "border-neutral-800 hover:border-neutral-600"
                      }`}
                      style={{ backgroundColor: tone }}
                    />
                  ))}
                </div>

                {/* Avatar Preview */}
                <div className="flex justify-center py-4">
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full border-4 border-gold-400/30"
                      style={{ backgroundColor: config.skinTone }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-6 h-1 bg-black/20 rounded-full mx-auto mb-2 mt-8" />
                          <div className="flex gap-4 mb-3">
                            <div className="w-2 h-2 bg-black/40 rounded-full" />
                            <div className="w-2 h-2 bg-black/40 rounded-full" />
                          </div>
                          <div className="w-4 h-1 bg-black/15 rounded-full mx-auto" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center">
                      <Sparkles size={14} className="text-black" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-neutral-800 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition"
          >
            戻る
          </button>
        )}
        <button
          onClick={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            } else {
              handleComplete();
            }
          }}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold hover:from-gold-400 hover:to-gold-500 transition-all"
        >
          {step < steps.length - 1 ? "次へ" : "アバターを作成"}
        </button>
      </div>
    </div>
  );
}

function AvatarSilhouette({
  bodyType,
  selected,
}: {
  bodyType: string;
  selected: boolean;
}) {
  const color = selected ? "#f59e0b" : "#555";
  const widths: Record<string, { shoulder: number; waist: number; hip: number }> = {
    slim: { shoulder: 16, waist: 10, hip: 12 },
    regular: { shoulder: 18, waist: 14, hip: 16 },
    athletic: { shoulder: 22, waist: 14, hip: 16 },
    plus: { shoulder: 20, waist: 20, hip: 22 },
  };
  const w = widths[bodyType] || widths.regular;

  return (
    <svg viewBox="0 0 50 70" className="w-12 h-16 mx-auto">
      <circle cx="25" cy="10" r="7" fill={color} opacity={0.6} />
      <path
        d={`M${25 - w.shoulder / 2} 20 Q${25 - w.waist / 2} 40 ${25 - w.hip / 2} 55 L${25 + w.hip / 2} 55 Q${25 + w.waist / 2} 40 ${25 + w.shoulder / 2} 20 Z`}
        fill={color}
        opacity={0.4}
      />
    </svg>
  );
}
