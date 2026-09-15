import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { Quote as QuoteIcon, Play, Square, Volume2, Mic, Languages, Loader2, Headphones } from "lucide-react";
import { getDailyQuote } from "@/lib/quotes";
import type { Quote } from "@/lib/quotes";
import { speakQuote, stopSpeaking, ensureVoicesLoaded, getVoiceInfo } from "@/lib/tts";

type AudioSource = "file" | "tts-api" | "browser-tts" | null;
type Lang = "fr" | "jp";

export default function QuoteCard() {
  const quote = useMemo(() => getDailyQuote(new Date()), []);
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<Lang>("fr");
  const [audioSource, setAudioSource] = useState<AudioSource>(null);
  const voiceInfo = useMemo(() => getVoiceInfo(quote), [quote]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ttsAbortRef = useRef<AbortController | null>(null);

  const hasJP = !!quote.textJP;
  const currentAudioUrl = lang === "jp" ? quote.audioUrlJP : quote.audioUrl;
  const currentText = lang === "jp" && quote.textJP ? quote.textJP : quote.text;
  const currentVoiceId = lang === "jp" ? quote.voiceIdJP : quote.voiceId;

  useEffect(() => {
    ensureVoicesLoaded();
    return () => {
      stopAll();
    };
  }, []);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (ttsAbortRef.current) {
      ttsAbortRef.current.abort();
      ttsAbortRef.current = null;
    }
    stopSpeaking();
    setSpeaking(false);
    setLoading(false);
  }, []);

  const playFileAudio = useCallback((url: string) => {
    setLoading(true);
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
    audio.oncanplaythrough = () => {
      setLoading(false);
      setSpeaking(true);
      setAudioSource("file");
      audio.play().catch(() => {
        setLoading(false);
        setSpeaking(false);
      });
    };
    audio.onended = () => {
      setSpeaking(false);
      setAudioSource(null);
      audioRef.current = null;
    };
    audio.onerror = () => {
      setLoading(false);
      audioRef.current = null;
      fallbackToTTS();
    };
    audio.load();
  }, []);

  const fallbackToTTS = useCallback(async () => {
    if (!currentVoiceId) {
      fallbackToBrowserTTS();
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    ttsAbortRef.current = controller;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase not configured");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/quote-voice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
        },
        body: JSON.stringify({
          text: currentText,
          voiceId: currentVoiceId,
          language: lang === "jp" ? "ja" : "fr",
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("TTS API failed");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.oncanplaythrough = () => {
        setLoading(false);
        setSpeaking(true);
        setAudioSource("tts-api");
        audio.play().catch(() => {
          setLoading(false);
          setSpeaking(false);
        });
      };
      audio.onended = () => {
        setSpeaking(false);
        setAudioSource(null);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        fallbackToBrowserTTS();
      };
      audio.load();
    } catch {
      setLoading(false);
      fallbackToBrowserTTS();
    }
  }, [currentText, currentVoiceId, lang]);

  const fallbackToBrowserTTS = useCallback(() => {
    setAudioSource("browser-tts");
    speakQuote(
      { ...quote, text: currentText },
      () => setSpeaking(true),
      () => {
        setSpeaking(false);
        setAudioSource(null);
      }
    );
  }, [quote, currentText]);

  const handlePlay = useCallback(() => {
    if (speaking || loading) {
      stopAll();
      return;
    }

    if (currentAudioUrl) {
      playFileAudio(currentAudioUrl);
    } else {
      fallbackToTTS();
    }
  }, [speaking, loading, currentAudioUrl, currentText, currentVoiceId, lang, quote, stopAll, playFileAudio, fallbackToTTS, fallbackToBrowserTTS]);

  const handleLangToggle = useCallback(() => {
    stopAll();
    setLang((prev) => (prev === "fr" ? "jp" : "fr"));
  }, [stopAll]);

  const sourceLabel = audioSource === "file" ? "Audio original" : audioSource === "tts-api" ? "Voix IA" : audioSource === "browser-tts" ? "Voix navigateur" : null;

  return (
    <div
      className="card card-glow p-5 mb-4 animate-fadeIn"
      style={{ borderColor: "color-mix(in srgb, var(--theme-primary) 20%, transparent)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <QuoteIcon size={14} style={{ color: "var(--theme-primary)" }} />
        <span
          className="text-xs uppercase tracking-wider font-medium"
          style={{ color: "var(--theme-primary)" }}
        >
          Citation du jour
        </span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full ml-auto"
          style={{
            background: "color-mix(in srgb, var(--theme-primary) 15%, transparent)",
            color: "var(--theme-primary-light)",
          }}
        >
          {quote.source === "anime" ? "Anime" : "Reel"}
        </span>
      </div>

      <p className="text-sm italic leading-relaxed" style={{ color: "var(--theme-text)" }}>
        "{currentText}"
      </p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-col min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: "var(--theme-primary-light)" }}>
            — {quote.author}
          </p>
          {quote.anime && (
            <span className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
              {quote.anime}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {hasJP && (
            <button
              onClick={handleLangToggle}
              className="flex items-center gap-1 px-2 py-2 rounded-xl transition-all active:scale-95"
              style={{
                background: "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
                border: `1px solid color-mix(in srgb, var(--theme-primary) 20%, transparent)`,
                color: "var(--theme-primary-light)",
              }}
              title="Changer de langue"
            >
              <Languages size={14} />
              <span className="text-xs font-bold">{lang === "fr" ? "FR" : "JP"}</span>
            </button>
          )}

          <button
            onClick={handlePlay}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            style={{
              background: speaking
                ? "color-mix(in srgb, var(--theme-primary) 25%, transparent)"
                : "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
              border: `1px solid color-mix(in srgb, var(--theme-primary) ${speaking ? "40%" : "20%"}, transparent)`,
              color: "var(--theme-primary-light)",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span className="text-xs font-medium">Chargement</span>
              </>
            ) : speaking ? (
              <>
                <Square size={14} className="animate-pulse" />
                <span className="text-xs font-medium">Stop</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span className="text-xs font-medium">Ecouter</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 mt-2 text-[10px]"
        style={{ color: "var(--theme-text-muted)" }}
      >
        {sourceLabel ? (
          <>
            <Headphones size={10} />
            <span>{sourceLabel}</span>
          </>
        ) : (
          <>
            <Mic size={10} />
            <span>Voix {voiceInfo.gender} · {voiceInfo.name}</span>
          </>
        )}
      </div>

      {(speaking || loading) && (
        <div className="flex items-center gap-1.5 mt-3 animate-fadeIn">
          <Volume2 size={12} style={{ color: "var(--theme-primary)" }} className="animate-pulse" />
          <div className="flex gap-0.5 flex-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: `${4 + Math.random() * 10}px`,
                  background: "var(--theme-primary)",
                  opacity: 0.3 + Math.random() * 0.7,
                  animation: `pop ${0.2 + Math.random() * 0.3}s ease-in-out ${i * 0.05}s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
