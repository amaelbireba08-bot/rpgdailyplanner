import { useEffect, useState } from "react";
import { getLevelTitle } from "@/lib/gamification";

interface LevelUpModalProps {
  xpGained: number;
  newLevel: number;
  leveledUp: boolean;
  onClose: () => void;
}

const CONFETTI = Array.from({ length: 24 }, (_, i) => i);

export default function LevelUpModal({ xpGained, newLevel, leveledUp, onClose }: LevelUpModalProps) {
  const [showLevel, setShowLevel] = useState(false);

  useEffect(() => {
    if (leveledUp) {
      const t = setTimeout(() => setShowLevel(true), 500);
      return () => clearTimeout(t);
    }
  }, [leveledUp]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "color-mix(in srgb, var(--theme-bg) 88%, transparent)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI.map((i) => (
          <div
            key={i}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `confetti-fall ${1.5 + Math.random()}s ease-in ${Math.random() * 0.5}s forwards`,
            }}
          >
            {["🎉", "✨", "⭐", "🎊", "💫"][i % 5]}
          </div>
        ))}
      </div>

      <div className="relative card card-glow p-8 w-full max-w-sm text-center animate-scaleIn">
        <div className="text-5xl mb-4 animate-float inline-block">🎉</div>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: "var(--theme-text)" }}>
          Tâche Complétée!
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--theme-text-secondary)" }}>
          Bien joué, continue comme ça!
        </p>

        <div className="card p-4 mb-4">
          <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--theme-text-muted)" }}>
            XP Gagné
          </div>
          <div className="text-3xl font-bold animate-pop" style={{ color: "var(--theme-primary)" }}>
            +{xpGained} XP
          </div>
        </div>

        {leveledUp && showLevel && (
          <div
            className="card p-4 mb-4 animate-scaleIn"
            style={{ borderColor: "color-mix(in srgb, var(--theme-primary) 40%, transparent)" }}
          >
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--theme-primary)" }}>
              Niveau Supérieur!
            </div>
            <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>Niveau {newLevel}</div>
            <div className="text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>
              {getLevelTitle(newLevel)}
            </div>
          </div>
        )}

        {!leveledUp && (
          <div className="card p-4 mb-4">
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--theme-text-muted)" }}>
              Niveau Actuel
            </div>
            <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>Niveau {newLevel}</div>
            <div className="text-sm mt-1" style={{ color: "var(--theme-text-muted)" }}>
              {getLevelTitle(newLevel)}
            </div>
          </div>
        )}

        <button onClick={onClose} className="btn-primary w-full mt-2">
          Continuer
        </button>
      </div>
    </div>
  );
}
