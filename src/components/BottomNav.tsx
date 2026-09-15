import { CheckSquare, Award, User, Palette, Calendar } from "lucide-react";

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: "tasks", icon: CheckSquare, label: "Tâches" },
    { id: "calendar", icon: Calendar, label: "Agenda" },
    { id: "badges", icon: Award, label: "Badges" },
    { id: "theme", icon: Palette, label: "Thème" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 safe-bottom"
      style={{ background: "color-mix(in srgb, var(--theme-bg) 95%, transparent)", backdropFilter: "blur(20px)" }}
    >
      <div
        className="flex items-center justify-around px-2 py-2"
        style={{ borderTop: "1px solid color-mix(in srgb, var(--theme-text-muted) 20%, transparent)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
              style={{ color: isActive ? "var(--theme-primary)" : "var(--theme-text-muted)" }}
            >
              <Icon size={20} className={isActive ? "scale-110" : ""} style={{ transition: "transform 0.2s" }} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
