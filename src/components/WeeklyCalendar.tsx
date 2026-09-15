import { useState, useRef, useEffect } from "react";
import { Plus, Check, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS } from "@/lib/types";
import type { CalendarTask, DayOfWeek } from "@/lib/types";
import { xpForCalendarTask } from "@/lib/gamification";

interface WeeklyCalendarProps {
  tasks: CalendarTask[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (day: DayOfWeek, hour: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, h) => h);
const HOUR_HEIGHT = 44;

const TASK_COLORS = [
  { bg: "color-mix(in srgb, #3b82f6 20%, transparent)", border: "#3b82f6", text: "#60a5fa" },
  { bg: "color-mix(in srgb, #10b981 20%, transparent)", border: "#10b981", text: "#34d399" },
  { bg: "color-mix(in srgb, #f59e0b 20%, transparent)", border: "#f59e0b", text: "#fbbf24" },
  { bg: "color-mix(in srgb, #ef4444 20%, transparent)", border: "#ef4444", text: "#f87171" },
  { bg: "color-mix(in srgb, #8b5cf6 20%, transparent)", border: "#8b5cf6", text: "#a78bfa" },
  { bg: "color-mix(in srgb, #ec4899 20%, transparent)", border: "#ec4899", text: "#f472b6" },
];

function getColorForTask(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return TASK_COLORS[Math.abs(hash) % TASK_COLORS.length];
}

export default function WeeklyCalendar({ tasks, onToggle, onDelete, onAdd }: WeeklyCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to 7am by default
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 7 * HOUR_HEIGHT;
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollOffset(scrollRef.current.scrollTop);
    }
  };

  const tasksByDay = (day: DayOfWeek) =>
    tasks.filter((t) => t.day === day).sort((a, b) => a.startHour - b.startHour);

  const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 70px)" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 safe-top">
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--theme-text)" }}>Calendrier</h2>
        <p className="text-xs" style={{ color: "var(--theme-text-muted)" }}>
          Touche une heure vide pour ajouter une tâche
        </p>
      </div>

      {/* Day headers */}
      <div className="flex px-1 sticky top-0 z-20" style={{ background: "var(--theme-bg)" }}>
        <div className="w-10 shrink-0" />
        {DAYS.map((d) => {
          const dayTasks = tasksByDay(d.id);
          const completedCount = dayTasks.filter((t) => t.completed).length;
          return (
            <button
              key={d.id}
              onClick={() => setSelectedDay(selectedDay === d.id ? null : d.id)}
              className="flex-1 py-2 px-1 text-center transition-all"
              style={{
                background: selectedDay === d.id
                  ? "color-mix(in srgb, var(--theme-primary) 12%, transparent)"
                  : "transparent",
                borderRadius: "8px",
              }}
            >
              <div className="text-xs font-semibold" style={{ color: selectedDay === d.id ? "var(--theme-primary)" : "var(--theme-text)" }}>
                {d.short}
              </div>
              {dayTasks.length > 0 && (
                <div className="text-[10px] mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
                  {completedCount}/{dayTasks.length}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-1 relative"
        style={{ scrollBehavior: "auto" }}
      >
        <div className="flex relative" style={{ minHeight: `${24 * HOUR_HEIGHT}px` }}>
          {/* Hour labels column */}
          <div className="w-10 shrink-0 relative">
            {HOURS.map((h) => (
              <div
                key={h}
                className="text-[10px] text-right pr-1"
                style={{
                  height: `${HOUR_HEIGHT}px`,
                  lineHeight: `${HOUR_HEIGHT}px`,
                  color: "var(--theme-text-muted)",
                }}
              >
                {formatHour(h)}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map((d) => {
            const dayTasks = tasksByDay(d.id);
            const isDimmed = selectedDay !== null && selectedDay !== d.id;
            return (
              <div
                key={d.id}
                className="flex-1 relative transition-opacity"
                style={{ opacity: isDimmed ? 0.3 : 1 }}
              >
                {/* Hour slot backgrounds */}
                {HOURS.map((h) => (
                  <div
                    key={h}
                    onClick={() => onAdd(d.id, h)}
                    className="border-b cursor-pointer hover:bg-[color-mix(in_srgb,var(--theme-primary)_5%,transparent)] transition-colors"
                    style={{
                      height: `${HOUR_HEIGHT}px`,
                      borderColor: "color-mix(in srgb, var(--theme-text-muted) 8%, transparent)",
                    }}
                  />
                ))}

                {/* Task blocks */}
                {dayTasks.map((task) => {
                  const color = getColorForTask(task.id);
                  const top = task.startHour * HOUR_HEIGHT;
                  const height = (task.endHour - task.startHour) * HOUR_HEIGHT - 2;
                  return (
                    <div
                      key={task.id}
                      onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
                      className="absolute left-0.5 right-0.5 rounded-lg p-1.5 cursor-pointer transition-all active:scale-95 group overflow-hidden"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        opacity: task.completed ? 0.5 : 1,
                        minHeight: `${HOUR_HEIGHT - 4}px`,
                      }}
                    >
                      <div className="flex items-start gap-1 h-full">
                        {task.completed && (
                          <Check size={10} className="shrink-0 mt-0.5" style={{ color: color.text }} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[10px] font-semibold leading-tight truncate"
                            style={{
                              color: color.text,
                              textDecoration: task.completed ? "line-through" : "none",
                            }}
                          >
                            {task.title}
                          </div>
                          <div className="text-[9px] mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
                            {formatHour(task.startHour)}-{formatHour(task.endHour)}
                          </div>
                          <div className="text-[9px] font-medium" style={{ color: color.text }}>
                            +{xpForCalendarTask(task.startHour, task.endHour)} XP
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          style={{ color: "var(--theme-text-muted)" }}
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add button */}
      <button
        onClick={() => onAdd("mon", 9)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full flex items-center justify-center z-30 active:scale-90 transition-transform"
        style={{
          background: "var(--theme-primary)",
          color: "white",
          boxShadow: "0 4px 20px color-mix(in srgb, var(--theme-primary) 40%, transparent)",
        }}
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
