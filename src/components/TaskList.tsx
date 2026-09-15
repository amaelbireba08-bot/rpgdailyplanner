import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Search } from "lucide-react";
import { DIFFICULTY_CONFIG } from "@/lib/types";
import type { Task } from "@/lib/types";
import QuoteCard from "@/components/QuoteCard";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onAdd }: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [search, setSearch] = useState("");

  const filtered = tasks
    .filter((t) => {
      if (filter === "pending") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="px-4 pt-4 pb-24 safe-top">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "var(--theme-text)" }}>Mes Tâches</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--theme-text-muted)" }}>
            {pendingCount} en cours · {completedCount} terminées
          </p>
        </div>
        <button
          onClick={onAdd}
          className="w-11 h-11 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
          style={{
            background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)",
            border: "1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)",
            color: "var(--theme-primary-light)",
          }}
        >
          <Plus size={22} />
        </button>
      </div>

      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--theme-text-muted)" }} />
        <input
          type="text"
          className="input-field pl-10 py-3 text-sm"
          placeholder="Rechercher une tâche..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <QuoteCard />

      <div className="flex gap-1.5 mb-4">
        {(["all", "pending", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              filter === f
                ? { background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--theme-primary) 40%, transparent)", color: "var(--theme-primary-light)" }
                : { background: "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)", border: "1px solid transparent", color: "var(--theme-text-muted)" }
            }
          >
            {f === "all" ? "Toutes" : f === "pending" ? "En cours" : "Terminées"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--theme-text-muted)" }}>
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm">
              {search ? "Aucune tâche trouvée" : "Aucune tâche pour le moment"}
            </p>
            {!search && (
              <button onClick={onAdd} className="btn-ghost mt-4 text-sm">
                Ajouter une tâche
              </button>
            )}
          </div>
        )}
        {filtered.map((task, i) => {
          const c = DIFFICULTY_CONFIG[task.difficulty];
          return (
            <div
              key={task.id}
              className={`card p-3 flex items-start gap-3 animate-slideUp stagger-${Math.min(i + 1, 8)}`}
              style={{ opacity: task.completed ? 0.5 : 1 }}
            >
              <button
                onClick={() => onToggle(task.id)}
                className="mt-0.5 shrink-0 active:scale-90 transition-transform"
              >
                {task.completed ? (
                  <CheckCircle2 size={22} style={{ color: "var(--theme-primary)" }} />
                ) : (
                  <Circle size={22} style={{ color: "var(--theme-text-muted)" }} />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: task.completed ? "var(--theme-text-muted)" : "var(--theme-text)",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                </div>
                {task.description && (
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "var(--theme-text-secondary)" }}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-semibold`}>
                    {c.emoji} {c.label} · +{c.xp} XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDelete(task.id)}
                className="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
                style={{ color: "var(--theme-text-muted)" }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
