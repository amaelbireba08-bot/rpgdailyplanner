import { useState } from "react";
import { X, Clock, Calendar, Bell } from "lucide-react";
import { DAYS } from "@/lib/types";
import type { DayOfWeek } from "@/lib/types";
import { xpForCalendarTask } from "@/lib/gamification";
import { REMINDER_OPTIONS } from "@/lib/notifications";
import type { ReminderOffset } from "@/lib/notifications";

interface CalendarTaskFormProps {
  onAdd: (title: string, day: DayOfWeek, startHour: number, endHour: number, reminder: ReminderOffset) => void;
  onClose: () => void;
  defaultDay?: DayOfWeek;
  defaultHour?: number;
}

export default function CalendarTaskForm({ onAdd, onClose, defaultDay = "mon", defaultHour = 9 }: CalendarTaskFormProps) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState<DayOfWeek>(defaultDay);
  const [startHour, setStartHour] = useState(defaultHour);
  const [endHour, setEndHour] = useState(defaultHour + 1);
  const [reminder, setReminder] = useState<ReminderOffset>(-1);
  const [error, setError] = useState("");

  const xp = xpForCalendarTask(startHour, endHour);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Entre un titre");
      return;
    }
    if (endHour <= startHour) {
      setError("L'heure de fin doit être après l'heure de début");
      return;
    }
    onAdd(title.trim(), day, startHour, endHour, reminder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-6" style={{ background: "color-mix(in srgb, var(--theme-bg) 88%, transparent)" }}>
      <div className="card w-full max-w-md p-5 animate-slideUp sm:animate-scaleIn" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={18} style={{ color: "var(--theme-primary)" }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>Nouvelle tâche</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: "var(--theme-text-muted)" }}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--theme-text-muted)" }}>Titre</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex: Entraînement, Étude, Projet..."
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(""); }}
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--theme-text-muted)" }}>Jour</label>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDay(d.id)}
                  className="py-2 rounded-lg text-xs font-medium transition-all"
                  style={
                    day === d.id
                      ? { background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-primary) 40%, transparent)", color: "var(--theme-primary-light)" }
                      : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid transparent", color: "var(--theme-text-muted)" }
                  }
                >
                  {d.short}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: "var(--theme-text-muted)" }}>
                <Clock size={12} /> Début
              </label>
              <select
                className="input-field"
                value={startHour}
                onChange={(e) => { setStartHour(Number(e.target.value)); setError(""); }}
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={h}>{String(h).padStart(2, "0")}:00</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: "var(--theme-text-muted)" }}>
                <Clock size={12} /> Fin
              </label>
              <select
                className="input-field"
                value={endHour}
                onChange={(e) => { setEndHour(Number(e.target.value)); setError(""); }}
              >
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h} value={h}>{String(h).padStart(2, "0")}:00</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: "var(--theme-text-muted)" }}>
              <Bell size={12} /> Rappel
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {REMINDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setReminder(opt.value)}
                  className="py-2 rounded-lg text-xs font-medium transition-all"
                  style={
                    reminder === opt.value
                      ? { background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-primary) 40%, transparent)", color: "var(--theme-primary-light)" }
                      : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid transparent", color: "var(--theme-text-muted)" }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs" style={{ color: "var(--theme-error, #ef4444)" }}>{error}</p>}

          <div className="card p-3 flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--theme-text-muted)" }}>Durée: {endHour > startHour ? endHour - startHour : 0}h</span>
            <span className="text-sm font-bold" style={{ color: "var(--theme-primary)" }}>+{xp} XP</span>
          </div>

          <button onClick={handleSubmit} className="btn-primary w-full">
            Ajouter au calendrier
          </button>
        </div>
      </div>
    </div>
  );
}
