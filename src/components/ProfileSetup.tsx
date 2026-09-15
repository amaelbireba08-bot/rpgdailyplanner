import { useState } from "react";
import { AVATAR_OPTIONS } from "@/lib/types";
import type { UserProfile } from "@/lib/types";

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleStart = () => {
    if (!name.trim()) return;
    onComplete({
      name: name.trim(),
      avatar,
      level: 1,
      xp: 0,
      totalCompleted: 0,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-6 safe-top safe-bottom">
      <div className="w-full max-w-sm animate-fadeIn">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-float inline-block">⚡</div>
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: "var(--theme-text)" }}>QuestDo</h1>
          <p className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
            Transforme tes tâches en quêtes
          </p>
        </div>

        <div className="card card-glow p-6 mb-4 animate-slideUp stagger-1">
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--theme-text-secondary)" }}>
            Ton nom de héros
          </label>
          <input
            type="text"
            className="input-field"
            placeholder="Entre ton nom..."
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />
        </div>

        <div className="card card-glow p-6 mb-6 animate-slideUp stagger-2">
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--theme-text-secondary)" }}>
            Choisis ton avatar
          </label>
          <div className="grid grid-cols-6 gap-2">
            {AVATAR_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setAvatar(opt)}
                className="text-2xl h-12 rounded-xl flex items-center justify-center transition-all"
                style={
                  avatar === opt
                    ? { background: "color-mix(in srgb, var(--theme-primary) 25%, transparent)", border: "2px solid var(--theme-primary)", transform: "scale(1.1)" }
                    : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-text-muted) 20%, transparent)" }
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="btn-primary w-full animate-slideUp stagger-3"
        >
          Commencer l'aventure
        </button>
      </div>
    </div>
  );
}
