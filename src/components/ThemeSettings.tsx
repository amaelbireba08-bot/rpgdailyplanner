import { useState } from "react";
import { Check, Palette, SlidersHorizontal } from "lucide-react";
import { THEMES } from "@/lib/themes";
import type { Theme } from "@/lib/themes";

interface ThemeSettingsProps {
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  onCustomTheme: (theme: Theme) => void;
}

export default function ThemeSettings({ currentTheme, onSelectTheme, onCustomTheme }: ThemeSettingsProps) {
  const [mode, setMode] = useState<"presets" | "custom">("presets");
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primary);
  const [customPrimaryLight, setCustomPrimaryLight] = useState(currentTheme.primaryLight);
  const [customBg, setCustomBg] = useState(currentTheme.bg);
  const [customBgSecondary, setCustomBgSecondary] = useState(currentTheme.bgSecondary);

  const handleApplyCustom = () => {
    const base = THEMES[0];
    const custom: Theme = {
      ...base,
      id: "custom",
      name: "Personnalisé",
      emoji: "🎨",
      primary: customPrimary,
      primaryLight: customPrimaryLight,
      bg: customBg,
      bgSecondary: customBgSecondary,
      xpBarStart: customPrimary,
      xpBarEnd: customPrimaryLight,
      glow: customPrimary + "10",
      cardBorder: customPrimary + "26",
    };
    onCustomTheme(custom);
  };

  return (
    <div className="px-4 pt-4 pb-24 safe-top">
      <div className="flex items-center gap-2 mb-4">
        <Palette size={20} style={{ color: "var(--theme-primary)" }} />
        <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)" }}>Thème</h2>
      </div>

      <div className="flex gap-1.5 mb-4">
        <button
          onClick={() => setMode("presets")}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5"
          style={
            mode === "presets"
              ? { background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-primary) 40%, transparent)", color: "var(--theme-primary-light)" }
              : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid transparent", color: "var(--theme-text-muted)" }
          }
        >
          <Palette size={14} />
          Préréglages
        </button>
        <button
          onClick={() => setMode("custom")}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5"
          style={
            mode === "custom"
              ? { background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-primary) 40%, transparent)", color: "var(--theme-primary-light)" }
              : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid transparent", color: "var(--theme-text-muted)" }
          }
        >
          <SlidersHorizontal size={14} />
          Personnalisé
        </button>
      </div>

      {mode === "presets" && (
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((theme, i) => {
            const isActive = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                className={`card p-4 text-left animate-slideUp stagger-${Math.min(i + 1, 8)} transition-all active:scale-[0.98]`}
                style={
                  isActive
                    ? { borderColor: theme.primary, boxShadow: `0 0 20px ${theme.primary}30` }
                    : {}
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{theme.emoji}</span>
                  {isActive && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: theme.primary }}
                    >
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
                  {theme.name}
                </div>
                <div className="flex gap-1 mt-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: theme.bg }} />
                  <div className="w-6 h-6 rounded-full" style={{ background: theme.bgSecondary }} />
                  <div className="w-6 h-6 rounded-full" style={{ background: theme.primary }} />
                  <div className="w-6 h-6 rounded-full" style={{ background: theme.primaryLight }} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {mode === "custom" && (
        <div className="card card-glow p-5 animate-fadeIn">
          <p className="text-sm mb-4" style={{ color: "var(--theme-text-secondary)" }}>
            Choisis tes propres couleurs pour créer un thème unique.
          </p>

          <ColorPicker label="Couleur principale" value={customPrimary} onChange={setCustomPrimary} />
          <ColorPicker label="Couleur principale claire" value={customPrimaryLight} onChange={setCustomPrimaryLight} />
          <ColorPicker label="Fond" value={customBg} onChange={setCustomBg} />
          <ColorPicker label="Fond secondaire" value={customBgSecondary} onChange={setCustomBgSecondary} />

          <div className="mt-5 mb-4">
            <div className="text-xs mb-2" style={{ color: "var(--theme-text-muted)" }}>Aperçu</div>
            <div
              className="rounded-2xl p-4"
              style={{ background: customBgSecondary, border: `1px solid ${customPrimary}30` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${customPrimary}25`, border: `1px solid ${customPrimary}50` }}
                >
                  ⚡
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: customPrimaryLight }}>
                    Aperçu du thème
                  </div>
                  <div className="text-xs" style={{ color: customPrimary }}>
                    Niveau 5 · 250 XP
                  </div>
                </div>
              </div>
              <div className="rounded-full overflow-hidden h-2.5" style={{ background: customBg }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: "60%", background: `linear-gradient(90deg, ${customPrimary}, ${customPrimaryLight})` }}
                />
              </div>
              <button
                className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${customPrimary}, ${customPrimaryLight})` }}
              >
    Bouton d'exemple
              </button>
            </div>
          </div>

          <button onClick={handleApplyCustom} className="btn-primary w-full">
            Appliquer ce thème
          </button>
        </div>
      )}
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3">
      <label className="block text-xs mb-1.5" style={{ color: "var(--theme-text-muted)" }}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-xl cursor-pointer shrink-0"
          style={{ background: "transparent", border: "1px solid var(--theme-card-border)" }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field font-mono text-sm"
          maxLength={7}
        />
      </div>
    </div>
  );
}
