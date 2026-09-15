export interface Theme {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  bgSecondary: string;
  card: string;
  cardBorder: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  xpBarStart: string;
  xpBarEnd: string;
  glow: string;
}

export const THEMES: Theme[] = [
  {
    id: "indigo",
    name: "Indigo Night",
    emoji: "🌌",
    bg: "#0f172a",
    bgSecondary: "#1e293b",
    card: "rgba(30, 41, 59, 0.6)",
    cardBorder: "rgba(99, 102, 241, 0.12)",
    primary: "#6366f1",
    primaryLight: "#818cf8",
    primaryDark: "#4f46e5",
    text: "#e2e8f0",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    xpBarStart: "#6366f1",
    xpBarEnd: "#818cf8",
    glow: "rgba(99, 102, 241, 0.06)",
  },
  {
    id: "emerald",
    name: "Forest",
    emoji: "🌲",
    bg: "#0a1f1a",
    bgSecondary: "#0f2e25",
    card: "rgba(20, 50, 40, 0.6)",
    cardBorder: "rgba(16, 185, 129, 0.15)",
    primary: "#10b981",
    primaryLight: "#34d399",
    primaryDark: "#059669",
    text: "#d1fae5",
    textSecondary: "#6ee7b7",
    textMuted: "#4b826a",
    xpBarStart: "#10b981",
    xpBarEnd: "#34d399",
    glow: "rgba(16, 185, 129, 0.06)",
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    bg: "#1a0f0a",
    bgSecondary: "#2e1810",
    card: "rgba(50, 25, 15, 0.6)",
    cardBorder: "rgba(249, 115, 22, 0.15)",
    primary: "#f97316",
    primaryLight: "#fb923c",
    primaryDark: "#ea580c",
    text: "#fef3e2",
    textSecondary: "#fdba74",
    textMuted: "#9a6b4f",
    xpBarStart: "#f97316",
    xpBarEnd: "#fbbf24",
    glow: "rgba(249, 115, 22, 0.06)",
  },
  {
    id: "rose",
    name: "Rose Quartz",
    emoji: "🌸",
    bg: "#1a0a14",
    bgSecondary: "#2e1024",
    card: "rgba(50, 20, 40, 0.6)",
    cardBorder: "rgba(244, 63, 94, 0.15)",
    primary: "#f43f5e",
    primaryLight: "#fb7185",
    primaryDark: "#e11d48",
    text: "#fce7f3",
    textSecondary: "#f9a8c4",
    textMuted: "#9a5070",
    xpBarStart: "#f43f5e",
    xpBarEnd: "#fb7185",
    glow: "rgba(244, 63, 94, 0.06)",
  },
  {
    id: "cyan",
    name: "Ocean",
    emoji: "🌊",
    bg: "#0a1820",
    bgSecondary: "#0f2030",
    card: "rgba(15, 40, 55, 0.6)",
    cardBorder: "rgba(6, 182, 212, 0.15)",
    primary: "#06b6d4",
    primaryLight: "#22d3ee",
    primaryDark: "#0891b2",
    text: "#cffafe",
    textSecondary: "#67e8f9",
    textMuted: "#4a8090",
    xpBarStart: "#06b6d4",
    xpBarEnd: "#22d3ee",
    glow: "rgba(6, 182, 212, 0.06)",
  },
  {
    id: "amber",
    name: "Golden",
    emoji: "✨",
    bg: "#1a1408",
    bgSecondary: "#2e2410",
    card: "rgba(50, 40, 15, 0.6)",
    cardBorder: "rgba(245, 158, 11, 0.15)",
    primary: "#f59e0b",
    primaryLight: "#fbbf24",
    primaryDark: "#d97706",
    text: "#fef3c7",
    textSecondary: "#fcd34d",
    textMuted: "#9a7b3f",
    xpBarStart: "#f59e0b",
    xpBarEnd: "#fbbf24",
    glow: "rgba(245, 158, 11, 0.06)",
  },
];

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.style.setProperty("--theme-bg", theme.bg);
  root.style.setProperty("--theme-bg-secondary", theme.bgSecondary);
  root.style.setProperty("--theme-card", theme.card);
  root.style.setProperty("--theme-card-border", theme.cardBorder);
  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-primary-light", theme.primaryLight);
  root.style.setProperty("--theme-primary-dark", theme.primaryDark);
  root.style.setProperty("--theme-text", theme.text);
  root.style.setProperty("--theme-text-secondary", theme.textSecondary);
  root.style.setProperty("--theme-text-muted", theme.textMuted);
  root.style.setProperty("--theme-xp-start", theme.xpBarStart);
  root.style.setProperty("--theme-xp-end", theme.xpBarEnd);
  root.style.setProperty("--theme-glow", theme.glow);
}

export function getThemeById(id: string): Theme {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

export function createCustomTheme(
  base: Theme,
  overrides: { primary: string; primaryLight: string; bg: string; bgSecondary: string }
): Theme {
  return {
    ...base,
    id: "custom",
    name: "Personnalisé",
    emoji: "🎨",
    primary: overrides.primary,
    primaryLight: overrides.primaryLight,
    bg: overrides.bg,
    bgSecondary: overrides.bgSecondary,
    xpBarStart: overrides.primary,
    xpBarEnd: overrides.primaryLight,
    glow: `${overrides.primary}10`,
    cardBorder: `${overrides.primary}26`,
  };
}
