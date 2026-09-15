import { Trash2, Star, Zap, Trophy, Target, Bell, Volume2, Vibrate, ShieldAlert } from "lucide-react";
import type { UserProfile, Task } from "@/lib/types";
import { xpProgressInLevel, getLevelTitle } from "@/lib/gamification";
import type { ReminderSettings } from "@/lib/notifications";

interface ProfileScreenProps {
  profile: UserProfile;
  tasks: Task[];
  onReset: () => void;
  reminderSettings: ReminderSettings;
  onUpdateReminderSettings: (settings: ReminderSettings) => void;
  notifPermission: NotificationPermission;
  onRequestNotificationPermission: () => Promise<NotificationPermission>;
}

export default function ProfileScreen({
  profile,
  tasks,
  onReset,
  reminderSettings,
  onUpdateReminderSettings,
  notifPermission,
  onRequestNotificationPermission,
}: ProfileScreenProps) {
  const xpProg = xpProgressInLevel(profile.xp);
  const levelTitle = getLevelTitle(profile.level);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalXpEarned = completedTasks.reduce((sum, t) => {
    const xp = t.difficulty === "easy" ? 10 : t.difficulty === "medium" ? 25 : 50;
    return sum + xp;
  }, 0);

  const difficultyBreakdown = {
    easy: completedTasks.filter((t) => t.difficulty === "easy").length,
    medium: completedTasks.filter((t) => t.difficulty === "medium").length,
    hard: completedTasks.filter((t) => t.difficulty === "hard").length,
  };

  return (
    <div className="px-4 pt-4 pb-24 safe-top">
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--theme-text)" }}>Profil</h2>

      <div className="card card-glow p-6 mb-4 text-center animate-fadeIn">
        <div className="text-6xl mb-3 animate-float inline-block">{profile.avatar}</div>
        <h3 className="text-xl font-bold" style={{ color: "var(--theme-text)" }}>{profile.name}</h3>
        <div className="text-sm mt-1" style={{ color: "var(--theme-primary)" }}>{levelTitle}</div>
        <div className="text-3xl font-extrabold mt-3" style={{ color: "var(--theme-text)" }}>
          Niveau {profile.level}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: "var(--theme-text-secondary)" }}>{xpProg.current} / {xpProg.needed} XP</span>
            <span style={{ color: "var(--theme-text-muted)" }}>Niv. {profile.level + 1}</span>
          </div>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: `${xpProg.percent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="card p-4 animate-slideUp stagger-1">
          <Zap size={18} className="mb-2" style={{ color: "var(--theme-primary)" }} />
          <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>{profile.xp}</div>
          <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>XP Total</div>
        </div>
        <div className="card p-4 animate-slideUp stagger-2">
          <Trophy size={18} className="text-amber-400 mb-2" />
          <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>{profile.totalCompleted}</div>
          <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Tâches terminées</div>
        </div>
        <div className="card p-4 animate-slideUp stagger-3">
          <Target size={18} className="text-emerald-400 mb-2" />
          <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>
            {tasks.filter((t) => !t.completed).length}
          </div>
          <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Tâches en cours</div>
        </div>
        <div className="card p-4 animate-slideUp stagger-4">
          <Star size={18} className="text-amber-400 mb-2" />
          <div className="text-2xl font-bold" style={{ color: "var(--theme-text)" }}>{totalXpEarned}</div>
          <div className="text-xs" style={{ color: "var(--theme-text-muted)" }}>XP gagné (tâches)</div>
        </div>
      </div>

      <h3 className="text-sm font-bold mb-2 px-1" style={{ color: "var(--theme-text-secondary)" }}>
        Répartition par difficulté
      </h3>
      <div className="card p-4 mb-4 animate-slideUp stagger-5">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-emerald-400">🟢 Facile</span>
              <span style={{ color: "var(--theme-text-muted)" }}>{difficultyBreakdown.easy}</span>
            </div>
            <div className="xp-bar" style={{ height: 6 }}>
              <div className="xp-bar-fill" style={{ width: `${completedTasks.length > 0 ? (difficultyBreakdown.easy / completedTasks.length) * 100 : 0}%`, background: "linear-gradient(90deg, #10b981, #34d399)" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-amber-400">🟡 Moyen</span>
              <span style={{ color: "var(--theme-text-muted)" }}>{difficultyBreakdown.medium}</span>
            </div>
            <div className="xp-bar" style={{ height: 6 }}>
              <div className="xp-bar-fill" style={{ width: `${completedTasks.length > 0 ? (difficultyBreakdown.medium / completedTasks.length) * 100 : 0}%`, background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-rose-400">🔴 Difficile</span>
              <span style={{ color: "var(--theme-text-muted)" }}>{difficultyBreakdown.hard}</span>
            </div>
            <div className="xp-bar" style={{ height: 6 }}>
              <div className="xp-bar-fill" style={{ width: `${completedTasks.length > 0 ? (difficultyBreakdown.hard / completedTasks.length) * 100 : 0}%`, background: "linear-gradient(90deg, #f43f5e, #fb7185)" }} />
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-bold mb-2 px-1" style={{ color: "var(--theme-text-secondary)" }}>
        Rappels & Notifications
      </h3>
      <div className="card p-4 mb-4 animate-slideUp stagger-6 space-y-3">
        {notifPermission !== "granted" && (
          <div
            className="flex items-center gap-2 p-3 rounded-xl"
            style={{
              background: "color-mix(in srgb, #f59e0b 12%, transparent)",
              border: "1px solid color-mix(in srgb, #f59e0b 30%, transparent)",
            }}
          >
            <ShieldAlert size={16} className="text-amber-400 shrink-0" />
            <p className="text-xs flex-1" style={{ color: "var(--theme-text-secondary)" }}>
              Autorise les notifications pour recevoir les rappels de tâches.
            </p>
            <button
              onClick={onRequestNotificationPermission}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0"
              style={{
                background: "color-mix(in srgb, #f59e0b 25%, transparent)",
                color: "#fbbf24",
                border: "1px solid color-mix(in srgb, #f59e0b 40%, transparent)",
              }}
            >
              Activer
            </button>
          </div>
        )}

        <SettingToggle
          icon={<Bell size={16} />}
          label="Notifications bureau"
          description="Affiche une notification quand une tâche est due"
          checked={reminderSettings.notificationsEnabled}
          onChange={(v) => onUpdateReminderSettings({ ...reminderSettings, notificationsEnabled: v })}
        />
        <SettingToggle
          icon={<Volume2 size={16} />}
          label="Son de rappel"
          description="Joue un son discret au moment du rappel"
          checked={reminderSettings.soundEnabled}
          onChange={(v) => onUpdateReminderSettings({ ...reminderSettings, soundEnabled: v })}
        />
        <SettingToggle
          icon={<Vibrate size={16} />}
          label="Vibration"
          description="Vibre sur mobile au moment du rappel"
          checked={reminderSettings.vibrationEnabled}
          onChange={(v) => onUpdateReminderSettings({ ...reminderSettings, vibrationEnabled: v })}
        />
      </div>

      <button onClick={onReset} className="btn-danger w-full text-sm flex items-center justify-center gap-2">
        <Trash2 size={16} />
        Réinitialiser le profil
      </button>
    </div>
  );
}

function SettingToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
          color: "var(--theme-primary)",
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>{label}</div>
        <div className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="w-11 h-6 rounded-full transition-all shrink-0 relative"
        style={{
          background: checked
            ? "var(--theme-primary)"
            : "color-mix(in srgb, var(--theme-text-muted) 25%, transparent)",
        }}
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
          style={{ left: checked ? "22px" : "2px" }}
        />
      </button>
    </div>
  );
}
