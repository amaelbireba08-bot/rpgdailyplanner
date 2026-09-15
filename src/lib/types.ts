export type Difficulty = "easy" | "medium" | "hard";

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const DAYS: { id: DayOfWeek; label: string; short: string }[] = [
  { id: "mon", label: "Lundi", short: "Lun" },
  { id: "tue", label: "Mardi", short: "Mar" },
  { id: "wed", label: "Mercredi", short: "Mer" },
  { id: "thu", label: "Jeudi", short: "Jeu" },
  { id: "fri", label: "Vendredi", short: "Ven" },
  { id: "sat", label: "Samedi", short: "Sam" },
  { id: "sun", label: "Dimanche", short: "Dim" },
];

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface CalendarTask {
  id: string;
  title: string;
  day: DayOfWeek;
  startHour: number;
  endHour: number;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
  reminder: import("@/lib/notifications").ReminderOffset;
}

export interface UserProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  totalCompleted: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: string;
  condition: (profile: UserProfile, tasks: Task[]) => boolean;
}

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; xp: number; emoji: string; color: string; bg: string; border: string; text: string; ring: string }
> = {
  easy: {
    label: "Facile",
    xp: 10,
    emoji: "🟢",
    color: "emerald",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    ring: "ring-emerald-500/40",
  },
  medium: {
    label: "Moyen",
    xp: 25,
    emoji: "🟡",
    color: "amber",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    ring: "ring-amber-500/40",
  },
  hard: {
    label: "Difficile",
    xp: 50,
    emoji: "🔴",
    color: "rose",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    ring: "ring-rose-500/40",
  },
};

export const AVATAR_OPTIONS = [
  "🦸", "🥷", "🧙", "🦊", "🐺", "🦅", "🐉", "🦁", "🐯", "🦉", "🐙", "🤖",
];

export const BADGES: Badge[] = [
  { id: "first", label: "Premier Pas", description: "Complète ta première tâche", icon: "🎯", condition: (p) => p.totalCompleted >= 1 },
  { id: "five", label: "Cing Étoiles", description: "Complète 5 tâches", icon: "⭐", condition: (p) => p.totalCompleted >= 5 },
  { id: "ten", label: "Dix de Cœur", description: "Complète 10 tâches", icon: "💛", condition: (p) => p.totalCompleted >= 10 },
  { id: "twentyfive", label: "Marathonien", description: "Complète 25 tâches", icon: "🏃", condition: (p) => p.totalCompleted >= 25 },
  { id: "fifty", label: "Légende", description: "Complète 50 tâches", icon: "👑", condition: (p) => p.totalCompleted >= 50 },
  { id: "hard", label: "Sans Peur", description: "Complète une tâche difficile", icon: "🔥", condition: (_, t) => t.some((x) => x.difficulty === "hard" && x.completed) },
  { id: "lvl5", label: "Apprenti", description: "Atteins le niveau 5", icon: "🎖️", condition: (p) => p.level >= 5 },
  { id: "lvl10", label: "Expert", description: "Atteins le niveau 10", icon: "🏅", condition: (p) => p.level >= 10 },
  { id: "lvl20", label: "Maître", description: "Atteins le niveau 20", icon: "🏆", condition: (p) => p.level >= 20 },
  { id: "hard5", label: "Brave Cœur", description: "Complète 5 tâches difficiles", icon: "⚔️", condition: (_, t) => t.filter((x) => x.difficulty === "hard" && x.completed).length >= 5 },
];
