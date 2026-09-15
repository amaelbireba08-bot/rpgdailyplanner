import { BADGES } from "@/lib/types";
import type { UserProfile, Task } from "@/lib/types";

interface BadgesScreenProps {
  profile: UserProfile;
  tasks: Task[];
}

export default function BadgesScreen({ profile, tasks }: BadgesScreenProps) {
  const unlockedCount = BADGES.filter((b) => b.condition(profile, tasks)).length;

  return (
    <div className="px-4 pt-4 pb-24 safe-top">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)" }}>Badges</h2>
        <span className="text-sm" style={{ color: "var(--theme-text-muted)" }}>
          {unlockedCount}/{BADGES.length}
        </span>
      </div>

      <div className="card p-4 mb-4 text-center animate-fadeIn">
        <div className="text-3xl font-bold" style={{ color: "var(--theme-primary)" }}>{unlockedCount}</div>
        <div className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
          Badges débloqués sur {BADGES.length}
        </div>
        <div className="xp-bar mt-3">
          <div className="xp-bar-fill" style={{ width: `${(unlockedCount / BADGES.length) * 100}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {BADGES.map((badge, i) => {
          const unlocked = badge.condition(profile, tasks);
          return (
            <div
              key={badge.id}
              className={`card p-4 flex flex-col items-center text-center animate-slideUp stagger-${Math.min(i + 1, 8)} transition-all`}
              style={{
                opacity: unlocked ? 1 : 0.4,
                borderColor: unlocked ? "color-mix(in srgb, var(--theme-primary) 30%, transparent)" : undefined,
              }}
            >
              <div className={`text-3xl mb-2 ${unlocked ? "animate-float" : "grayscale"}`}>
                {unlocked ? badge.icon : "🔒"}
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: unlocked ? "var(--theme-text)" : "var(--theme-text-muted)" }}
              >
                {badge.label}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--theme-text-muted)" }}>
                {badge.description}
              </div>
              {unlocked && (
                <div
                  className="mt-2 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--theme-primary)" }}
                >
                  Débloqué
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
