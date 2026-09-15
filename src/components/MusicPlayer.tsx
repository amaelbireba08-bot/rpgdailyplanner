import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Plus, X, Play, Square, Trash2, Link, Headphones, Wind, Sparkles, Swords, Trophy, Disc3, Piano, Radio, Guitar, Coffee, Flower, Zap } from "lucide-react";
import {
  playTrack,
  stopMusic,
  getMusicPlaying,
  getCurrentTrackId,
  getAllTracks,
  addUserTrack,
  removeUserTrack,
  setVolume,
  getVolume,
  BUILTIN_TRACKS,
} from "@/lib/music";
import type { Track } from "@/lib/music";

const TRACK_ICONS: Record<string, typeof Wind> = {
  "lofi-chillhop": Wind,
  "city-pop": Disc3,
  "koto-shakuhachi": Flower,
  "ghibli-piano": Piano,
  "tokyo-synthwave": Radio,
  "acoustic-folk": Guitar,
  "tsugaru-shamisen": Zap,
  "jazz-kissa": Coffee,
  "zen-garden": Headphones,
  "epic-anime": Swords,
};

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [userTracks, setUserTracks] = useState<Track[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [error, setError] = useState("");
  const [volume, setVolState] = useState(0.5);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlaying(getMusicPlaying());
    setCurrentTrackId(getCurrentTrackId());
    setUserTracks(getAllTracks().filter((t) => t.type === "url"));
    setVolState(getVolume());
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setExpanded(false);
        setShowAddForm(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allTracks = [...BUILTIN_TRACKS, ...userTracks];
  const currentTrack = allTracks.find((t) => t.id === currentTrackId);

  const handleSelectTrack = (track: Track) => {
    if (!enabled) return;
    playTrack(track.id, track.url);
    setPlaying(true);
    setCurrentTrackId(track.id);
  };

  const handleStop = () => {
    stopMusic();
    setPlaying(false);
  };

  const handleTogglePlay = () => {
    if (!enabled) return;
    if (playing) {
      handleStop();
    } else if (currentTrackId) {
      const track = allTracks.find((t) => t.id === currentTrackId);
      if (track) handleSelectTrack(track);
    } else if (allTracks.length > 0) {
      handleSelectTrack(allTracks[0]);
    }
  };

  const handleToggleEnabled = () => {
    if (enabled) {
      handleStop();
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolState(v);
    setVolume(v);
  };

  const handleAddTrack = () => {
    if (!urlInput.trim()) {
      setError("Entre un lien audio");
      return;
    }
    if (!urlInput.startsWith("http")) {
      setError("Le lien doit commencer par http:// ou https://");
      return;
    }
    const track = addUserTrack(
      titleInput.trim() || "Titre inconnu",
      artistInput.trim() || "Artiste inconnu",
      urlInput.trim()
    );
    setUserTracks((prev) => [...prev, track]);
    setUrlInput("");
    setTitleInput("");
    setArtistInput("");
    setError("");
    setShowAddForm(false);
  };

  const handleRemoveTrack = (id: string) => {
    removeUserTrack(id);
    setUserTracks((prev) => prev.filter((t) => t.id !== id));
    if (currentTrackId === id) {
      handleStop();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 safe-top" ref={panelRef}>
      {/* Main toggle button */}
      <div className="flex items-center gap-2">
        {/* Enable/disable toggle */}
        <button
          onClick={handleToggleEnabled}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "color-mix(in srgb, var(--theme-bg-secondary) 80%, transparent)",
            border: `1px solid color-mix(in srgb, var(--theme-text-muted) 20%, transparent)`,
            backdropFilter: "blur(12px)",
            opacity: enabled ? 1 : 0.5,
          }}
          title={enabled ? "Désactiver la musique" : "Activer la musique"}
        >
          {enabled ? (
            <Headphones size={16} style={{ color: "var(--theme-primary)" }} />
          ) : (
            <VolumeX size={16} style={{ color: "var(--theme-text-muted)" }} />
          )}
        </button>

        {/* Play/pause button */}
        <button
          onClick={() => {
            handleTogglePlay();
            if (!playing) setExpanded(true);
          }}
          disabled={!enabled}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "color-mix(in srgb, var(--theme-bg-secondary) 80%, transparent)",
            border: `1px solid color-mix(in srgb, var(--theme-primary) ${playing ? "40%" : "15%"}, transparent)`,
            backdropFilter: "blur(12px)",
            boxShadow: playing ? `0 0 16px color-mix(in srgb, var(--theme-primary) 25%, transparent)` : "none",
            opacity: enabled ? 1 : 0.4,
            cursor: enabled ? "pointer" : "not-allowed",
          }}
        >
          {playing ? (
            <Volume2 size={20} style={{ color: "var(--theme-primary)" }} className="animate-pulse" />
          ) : (
            <Play size={20} style={{ color: "var(--theme-text-muted)" }} />
          )}
        </button>
      </div>

      {expanded && enabled && (
        <div
          className="absolute top-14 right-0 card p-3 animate-scaleIn"
          style={{ width: "300px", maxHeight: "75vh", overflowY: "auto" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Music size={14} style={{ color: "var(--theme-primary)" }} />
              <span className="text-xs font-semibold" style={{ color: "var(--theme-text)" }}>
                Musique d'ambiance
              </span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ color: "var(--theme-text-muted)" }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Now playing */}
          {playing && currentTrack && (
            <div
              className="flex items-center gap-2 p-2 rounded-xl mb-3"
              style={{
                background: "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
                border: "1px solid color-mix(in srgb, var(--theme-primary) 25%, transparent)",
              }}
            >
              <div className="flex gap-0.5 shrink-0 items-end h-5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      height: `${6 + Math.random() * 10}px`,
                      background: "var(--theme-primary)",
                      animation: `pop ${0.3 + Math.random() * 0.3}s ease-in-out ${i * 0.1}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: "var(--theme-text)" }}>
                  {currentTrack.title}
                </div>
                <div className="text-[10px] truncate" style={{ color: "var(--theme-text-muted)" }}>
                  {currentTrack.artist}
                </div>
              </div>
              <button
                onClick={handleStop}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)",
                  color: "var(--theme-primary-light)",
                }}
              >
                <Square size={12} />
              </button>
            </div>
          )}

          {/* Volume control */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <VolumeX size={14} style={{ color: "var(--theme-text-muted)" }} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--theme-primary) ${volume * 100}%, color-mix(in srgb, var(--theme-text-muted) 20%, transparent) ${volume * 100}%)`,
              }}
            />
            <Volume2 size={14} style={{ color: "var(--theme-primary)" }} />
            <span className="text-[10px] w-8 text-right" style={{ color: "var(--theme-text-muted)" }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Built-in tracks */}
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--theme-text-muted)" }}>
              Ambiances japonaises
            </div>
            {BUILTIN_TRACKS.map((track) => {
              const Icon = TRACK_ICONS[track.id] || Music;
              return (
                <TrackRow
                  key={track.id}
                  track={track}
                  icon={<Icon size={14} />}
                  isCurrent={currentTrackId === track.id}
                  isPlaying={playing && currentTrackId === track.id}
                  onSelect={() => handleSelectTrack(track)}
                />
              );
            })}
          </div>

          {/* User tracks */}
          {userTracks.length > 0 && (
            <div className="space-y-1 mt-3">
              <div className="text-[10px] uppercase tracking-wider font-medium mb-1" style={{ color: "var(--theme-text-muted)" }}>
                Mes chansons
              </div>
              {userTracks.map((track) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  icon={<Music size={14} />}
                  isCurrent={currentTrackId === track.id}
                  isPlaying={playing && currentTrackId === track.id}
                  onSelect={() => handleSelectTrack(track)}
                  onRemove={() => handleRemoveTrack(track.id)}
                />
              ))}
            </div>
          )}

          {/* Add form */}
          {showAddForm ? (
            <div className="mt-3 p-3 rounded-xl space-y-2" style={{ background: "color-mix(in srgb, var(--theme-bg-secondary) 50%, transparent)" }}>
              <div className="flex items-center gap-1.5">
                <Link size={12} style={{ color: "var(--theme-primary)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--theme-text)" }}>Ajouter une chanson</span>
              </div>
              <input
                type="text"
                className="input-field text-xs py-2"
                placeholder="Titre de la chanson"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
              <input
                type="text"
                className="input-field text-xs py-2"
                placeholder="Artiste (optionnel)"
                value={artistInput}
                onChange={(e) => setArtistInput(e.target.value)}
              />
              <input
                type="url"
                className="input-field text-xs py-2"
                placeholder="https://... (lien audio MP3, etc.)"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  setError("");
                }}
              />
              {error && (
                <p className="text-[10px]" style={{ color: "var(--theme-error, #ef4444)" }}>{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleAddTrack}
                  className="flex-1 py-2 rounded-lg text-xs font-medium"
                  style={{
                    background: "color-mix(in srgb, var(--theme-primary) 20%, transparent)",
                    color: "var(--theme-primary-light)",
                    border: "1px solid color-mix(in srgb, var(--theme-primary) 30%, transparent)",
                  }}
                >
                  Ajouter
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setError(""); }}
                  className="px-3 py-2 rounded-lg text-xs"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: "color-mix(in srgb, var(--theme-primary) 10%, transparent)",
                border: "1px dashed color-mix(in srgb, var(--theme-primary) 30%, transparent)",
                color: "var(--theme-primary-light)",
              }}
            >
              <Plus size={14} />
              Ajouter une chanson du web
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TrackRow({
  track,
  icon,
  isCurrent,
  isPlaying,
  onSelect,
  onRemove,
}: {
  track: Track;
  icon: React.ReactNode;
  isCurrent: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onRemove?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all"
      onClick={onSelect}
      style={{
        background: isCurrent
          ? "color-mix(in srgb, var(--theme-primary) 12%, transparent)"
          : "transparent",
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ color: isCurrent ? "var(--theme-primary)" : "var(--theme-text-muted)" }}
      >
        {icon}
      </div>
      <button
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: isPlaying
          ? "color-mix(in srgb, var(--theme-primary) 25%, transparent)"
          : "color-mix(in srgb, var(--theme-bg-secondary) 40%, transparent)",
          color: isPlaying ? "var(--theme-primary)" : "var(--theme-text-muted)",
        }}
      >
        {isPlaying ? <Square size={12} /> : <Play size={12} />}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-medium truncate"
          style={{ color: isCurrent ? "var(--theme-primary-light)" : "var(--theme-text)" }}
        >
          {track.title}
        </div>
        <div className="text-[10px] truncate" style={{ color: "var(--theme-text-muted)" }}>
          {track.artist}
        </div>
      </div>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
          style={{ color: "var(--theme-text-muted)" }}
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
}
