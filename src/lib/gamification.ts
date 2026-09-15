// Infinite leveling system
// XP curve: each level requires more XP than the last
// Formula: xpForLevel(n) = 100 * (n-1) * n (quadratic growth)

export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return 100 * (level - 1) * level;
}

export function levelFromXp(xp: number): number {
  // Solve: 100 * (n-1) * n <= xp
  // n^2 - n - xp/100 <= 0
  // n = (1 + sqrt(1 + 4*xp/100)) / 2
  if (xp <= 0) return 1;
  const n = Math.floor((1 + Math.sqrt(1 + (4 * xp) / 100)) / 2);
  return Math.max(1, n);
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; percent: number } {
  const level = levelFromXp(xp);
  const baseXp = xpForLevel(level);
  const nextXp = xpForLevel(level + 1);
  const current = xp - baseXp;
  const needed = nextXp - baseXp;
  const percent = needed > 0 ? Math.min(100, (current / needed) * 100) : 100;
  return { current, needed, percent };
}

export const LEVEL_TITLES: Record<number, string> = {
  1: "Novice",
  3: "Apprenti",
  5: "Aventurier",
  8: "Guerrier",
  10: "Chevalier",
  15: "Champion",
  20: "Héros",
  25: "Légende",
  30: "Mythe",
  50: "Demi-Dieu",
  100: "Immortel",
  250: "Divinité",
  500: "Cosmique",
  1000: "Éternel",
};

export function getLevelTitle(level: number): string {
  let title = "Novice";
  for (const lvl of Object.keys(LEVEL_TITLES).map(Number).sort((a, b) => a - b)) {
    if (level >= lvl) title = LEVEL_TITLES[lvl];
  }
  return title;
}

// Milestone system: determines which levels trigger a reward modal
// - Every 25 levels up to Level 100 (25, 50, 75, 100)
// - Every 50 levels from Level 101 to 500 (150, 200, 250, 300, 350, 400, 450, 500)
// - Every 100 levels beyond Level 500 (600, 700, 800, ...)

export function isMilestoneLevel(level: number): boolean {
  if (level <= 0) return false;
  if (level <= 100) return level % 25 === 0;
  if (level <= 500) return level % 50 === 0;
  return level % 100 === 0;
}

export function getMilestoneInfo(level: number): { isMilestone: boolean; milestoneNumber: number; tier: string } {
  const isMilestone = isMilestoneLevel(level);
  if (!isMilestone) return { isMilestone: false, milestoneNumber: 0, tier: "" };

  let milestoneNumber: number;
  let tier: string;

  if (level <= 100) {
    milestoneNumber = level / 25;
    tier = "Bronze";
  } else if (level <= 500) {
    milestoneNumber = 4 + (level - 100) / 50;
    tier = "Argent";
  } else {
    milestoneNumber = 12 + (level - 500) / 100;
    tier = "Or";
  }

  return { isMilestone, milestoneNumber, tier };
}

// XP reward for calendar tasks based on duration (in hours)
// 10 XP per hour, minimum 10 XP for any task
export function xpForCalendarTask(startHour: number, endHour: number): number {
  const duration = endHour - startHour;
  return Math.max(10, Math.round(duration * 10));
}
