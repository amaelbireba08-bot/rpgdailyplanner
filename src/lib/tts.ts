import type { Quote } from "./quotes";

let currentUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

export interface VoiceProfile {
  gender: "male" | "female";
  pitch: number;
  rate: number;
  voicePreference: string[];
}

// Each character gets a unique voice profile
// voicePreference: preferred voice name patterns to match against available system voices
export const CHARACTER_VOICES: Record<string, VoiceProfile> = {
  // Anime — male, intense/hero
  "Naruto Uzumaki": { gender: "male", pitch: 1.3, rate: 1.15, voicePreference: ["Google français", "Thomas", "male"] },
  "Goku": { gender: "male", pitch: 1.15, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Monkey D. Luffy": { gender: "male", pitch: 1.25, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Tanjiro Kamado": { gender: "male", pitch: 1.1, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Midoriya Izuku": { gender: "male", pitch: 1.2, rate: 1.05, voicePreference: ["Google français", "Thomas", "male"] },
  "Shoyo Hinata": { gender: "male", pitch: 1.35, rate: 1.15, voicePreference: ["Google français", "Thomas", "male"] },
  "Yuji Itadori": { gender: "male", pitch: 1.15, rate: 1.05, voicePreference: ["Google français", "Thomas", "male"] },
  "Edward Elric": { gender: "male", pitch: 1.3, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Rock Lee": { gender: "male", pitch: 1.2, rate: 1.2, voicePreference: ["Google français", "Thomas", "male"] },
  "Eren Yeager": { gender: "male", pitch: 0.9, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },

  // Anime — male, deep/calm/wise
  "Levi Ackerman": { gender: "male", pitch: 0.7, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Itachi Uchiha": { gender: "male", pitch: 0.75, rate: 0.8, voicePreference: ["Google français", "Thomas", "male"] },
  "Roy Mustang": { gender: "male", pitch: 0.8, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },
  "Tobio Kageyama": { gender: "male", pitch: 0.85, rate: 0.95, voicePreference: ["Google français", "Thomas", "male"] },
  "Lelouch vi Britannia": { gender: "male", pitch: 0.8, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },
  "Gojo Satoru": { gender: "male", pitch: 0.95, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Spike Spiegel": { gender: "male", pitch: 0.85, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Kenshin Himura": { gender: "male", pitch: 0.9, rate: 0.8, voicePreference: ["Google français", "Thomas", "male"] },
  "Jiraiya": { gender: "male", pitch: 0.8, rate: 0.75, voicePreference: ["Google français", "Thomas", "male"] },
  "Maître Shifu": { gender: "male", pitch: 0.85, rate: 0.75, voicePreference: ["Google français", "Thomas", "male"] },
  "All Might": { gender: "male", pitch: 0.7, rate: 0.95, voicePreference: ["Google français", "Thomas", "male"] },
  "Führer King Bradley": { gender: "male", pitch: 0.75, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Koro-sensei": { gender: "male", pitch: 0.9, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Daichi Sawamura": { gender: "male", pitch: 0.95, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Sakuta Azusagawa": { gender: "male", pitch: 1.0, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Kamina": { gender: "male", pitch: 0.9, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Saitama": { gender: "male", pitch: 0.95, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },

  // Anime — female
  "Sakura Kinomoto": { gender: "female", pitch: 1.4, rate: 1.1, voicePreference: ["Google français", "Amelie", "female"] },

  // Real world — male
  "Abraham Lincoln": { gender: "male", pitch: 0.85, rate: 0.8, voicePreference: ["Google français", "Thomas", "male"] },
  "Albert Einstein": { gender: "male", pitch: 0.9, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Napoleon Hill": { gender: "male", pitch: 0.8, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },
  "Steve Jobs": { gender: "male", pitch: 1.0, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Theodore Roosevelt": { gender: "male", pitch: 1.1, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Bruce Lee": { gender: "male", pitch: 0.85, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "David Goggins": { gender: "male", pitch: 0.75, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Mark Twain": { gender: "male", pitch: 0.9, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Nelson Mandela": { gender: "male", pitch: 0.8, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Jim Rohn": { gender: "male", pitch: 0.8, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },
  "Zig Ziglar": { gender: "male", pitch: 1.0, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Robin Sharma": { gender: "male", pitch: 0.95, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Sam Levenson": { gender: "male", pitch: 1.0, rate: 1.0, voicePreference: ["Google français", "Thomas", "male"] },
  "Fred DeVito": { gender: "male", pitch: 0.9, rate: 1.1, voicePreference: ["Google français", "Thomas", "male"] },
  "Tim Notke": { gender: "male", pitch: 0.95, rate: 1.05, voicePreference: ["Google français", "Thomas", "male"] },
  "Robert Collier": { gender: "male", pitch: 0.95, rate: 0.9, voicePreference: ["Google français", "Thomas", "male"] },
  "Ralph Marston": { gender: "male", pitch: 0.95, rate: 0.85, voicePreference: ["Google français", "Thomas", "male"] },
  "Lao Tseu": { gender: "male", pitch: 0.85, rate: 0.75, voicePreference: ["Google français", "Thomas", "male"] },

  // Real world — female
  "Helen Hayes": { gender: "female", pitch: 1.3, rate: 1.0, voicePreference: ["Google français", "Amelie", "female"] },
  "Anne Lamott": { gender: "female", pitch: 1.35, rate: 1.05, voicePreference: ["Google français", "Amelie", "female"] },
  "Marie Forleo": { gender: "female", pitch: 1.25, rate: 1.0, voicePreference: ["Google français", "Amelie", "female"] },

  // Default
  "Inconnu": { gender: "male", pitch: 1.0, rate: 1.0, voicePreference: ["Google français", "Thomas", "Amelie"] },
};

// Proverbe japonais uses a wise male voice
CHARACTER_VOICES["Proverbe japonais"] = { gender: "male", pitch: 0.85, rate: 0.75, voicePreference: ["Google français", "Thomas", "male"] };

function loadVoices(): SpeechSynthesisVoice[] {
  if (!("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  cachedVoices = voices;
  return voices;
}

function findVoice(profile: VoiceProfile): SpeechSynthesisVoice | null {
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  if (voices.length === 0) return null;

  // Filter French voices
  const frVoices = voices.filter(
    (v) => v.lang.startsWith("fr") || v.lang.startsWith("FR") || v.lang === "fr-FR"
  );
  const pool = frVoices.length > 0 ? frVoices : voices;

  // Try to find a voice matching the preference
  for (const pref of profile.voicePreference) {
    const match = pool.find((v) =>
      v.name.toLowerCase().includes(pref.toLowerCase())
    );
    if (match) return match;
  }

  // Try to match gender from voice name
  const femaleKeywords = ["amelie", "amélie", "female", "femme", "marie", "audrey", "google français"];
  const maleKeywords = ["thomas", "male", "homme", "nicolas", "henri", "paul"];

  if (profile.gender === "female") {
    const female = pool.find((v) =>
      femaleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (female) return female;
  } else {
    const male = pool.find((v) =>
      maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (male) return male;
  }

  // Fallback: alternate voices by gender using index
  if (pool.length > 1) {
    return profile.gender === "female" ? pool[pool.length - 1] : pool[0];
  }

  return pool[0] || null;
}

export function speakQuote(quote: Quote, onStart: () => void, onEnd: () => void): void {
  if (!("speechSynthesis" in window)) {
    onStart();
    setTimeout(onEnd, 100);
    return;
  }

  window.speechSynthesis.cancel();
  loadVoices();

  const profile = CHARACTER_VOICES[quote.author] || CHARACTER_VOICES["Inconnu"];
  const voice = findVoice(profile);

  const text = `${quote.text}. — ${quote.author}.`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.pitch = profile.pitch;
  utterance.rate = profile.rate;
  utterance.volume = 1;

  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeaking(): boolean {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}

export function ensureVoicesLoaded(): Promise<void> {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve();
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve();
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve();
    };
  });
}

export function getVoiceInfo(quote: Quote): { name: string; gender: string } {
  const profile = CHARACTER_VOICES[quote.author] || CHARACTER_VOICES["Inconnu"];
  const voice = findVoice(profile);
  return {
    name: voice ? voice.name : "Voix par défaut",
    gender: profile.gender === "female" ? "féminine" : "masculine",
  };
}
