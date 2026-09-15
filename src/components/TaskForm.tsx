import { useState } from "react";
import { X } from "lucide-react";
import { DIFFICULTY_CONFIG } from "@/lib/types";
import type { Difficulty } from "@/lib/types";

interface TaskFormProps {
  onAdd: (title: string, description: string, difficulty: Difficulty) => void;
  onClose: () => void;
}

export default function TaskForm({ onAdd, onClose }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), difficulty);
    setTitle("");
    setDescription("");
    setDifficulty("easy");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4"
      style={{ background: "color-mix(in srgb, var(--theme-bg) 80%, transparent)" }}
      onClick={onClose}
    >
      <div
        className="card card-glow p-6 w-full max-w-sm animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: "var(--theme-text)" }}>Nouvelle Tâche</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            <X size={20} />
          </button>
        </div>

        <label className="block text-xs mb-1" style={{ color: "var(--theme-text-muted)" }}>Titre</label>
        <input
          type="text"
          className="input-field mb-3"
          placeholder="Ex: Réviser le chapitre 3..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <label className="block text-xs mb-1" style={{ color: "var(--theme-text-muted)" }}>
          Description (optionnel)
        </label>
        <textarea
          className="input-field mb-4 resize-none"
          rows={2}
          placeholder="Détails de la tâche..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block text-xs mb-2" style={{ color: "var(--theme-text-muted)" }}>Difficulté</label>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => {
            const c = DIFFICULTY_CONFIG[d];
            return (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`py-3 rounded-xl text-center transition-all ${c.bg} ${c.text}`}
                style={
                  difficulty === d
                    ? { border: `2px solid var(--theme-primary)`, transform: "scale(1.05)" }
                    : { border: "1px solid color-mix(in srgb, var(--theme-text-muted) 20%, transparent)" }
                }
              >
                <div className="text-xl mb-0.5">{c.emoji}</div>
                <div className="text-xs font-semibold">{c.label}</div>
                <div className="text-[10px] opacity-70">+{c.xp} XP</div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="btn-ghost flex-1">
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={!title.trim()} className="btn-primary flex-1">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
