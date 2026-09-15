import { useEffect, useState } from "react";
import { getLevelTitle, getMilestoneInfo } from "@/lib/gamification";

interface MilestoneModalProps {
  level: number;
  onClose: () => void;
}

const CONFETTI = Array.from({ length: 40 }, (_, i) => i);

const TIER_STYLES: Record<string, { emoji: string; label: string; color: string }> = {
  Bronze: { emoji: "🥉", label: "Palier Bronze", color: "#cd7f32" },
  Argent: { emoji: "🥈", label: "Palier Argent", color: "#c0c0c0" },
  Or: { emoji: "🥇", label: "Palier Or", color: "#ffd700" },
};

export default function MilestoneModal({ level, onClose }: MilestoneModalProps) {
  const [showContent, setShowContent] = useState(false);
  const info = getMilestoneInfo(level);
  const tier = TIER_STYLES[info.tier] || TIER_STYLES.Bronze;

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{ background: "color-mix(in srgb, var(--theme-bg) 92%, transparent)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {CONFETTI.map((i) => (
          <div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `confetti-fall ${2 + Math.random()}s ease-in ${Math.random() * 0.8}s forwards`,
            }}
          >
            {["🎉", "✨", "⭐", "🎊", "💫", "🏆", "🥇", "💎"][i % 8]}
          </div>
        ))}
      </div>

      <div
        className="relative card card-glow p-8 w-full max-w-sm text-center animate-scaleIn"
        style={{ borderColor: tier.color }}
      >
        <div className="text-6xl mb-4 animate-float inline-block">{tier.emoji}</div>

        <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: tier.color }}>
          {tier.label} · Palier {info.milestoneNumber}
        </div>

        <h2 className="text-3xl font-extrabold mb-2" style={{ color: "var(--theme-text)" }}>
          Niveau {level}
        </h2>

        <p className="text-sm mb-6" style={{ color: "var(--theme-text-secondary)" }}>
          {getLevelTitle(level)}
        </p>

        {showContent && (
          <div
            className="card p-4 mb-4 animate-scaleIn"
            style={{ borderColor: `color-mix(in srgb, ${tier.color} 40%, transparent)` }}
          >
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--theme-text-muted)" }}>
              Récompense de palier
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
              Tu as atteint un palier légendaire!
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
              Continue sur cette lancée pour débloquer les prochains paliers.
            </div>
          </div>
        )}

        <button onClick={onClose} className="btn-primary w-full mt-2">
          Continuer l'aventure
        </button>
      </div>
    </div>
  );
}
