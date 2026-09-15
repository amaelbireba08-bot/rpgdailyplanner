export interface Track {
  id: string;
  title: string;
  artist: string;
  type: "builtin" | "url";
  url?: string;
  duration?: number;
  category?: "nature" | "focus" | "music" | "noise";
  icon?: string;
}

export const AMBIENT_TRACKS: Track[] = [
  // === Nature & Ambience ===
  {
    id: "gentle-rain-window",
    title: "Gentle Rain on Window",
    artist: "Rain Sounds for Relaxation",
    type: "builtin",
    category: "nature",
    icon: "cloud-rain",
    url: "https://archive.org/download/nst-806ZSNCb8qg-audio/nst-806ZSNCb8qg-audio.mp3",
  },
  {
    id: "distant-thunder-rain",
    title: "Distant Thunder & Rain",
    artist: "Thunder Storm Ambient",
    type: "builtin",
    category: "nature",
    icon: "cloud-lightning",
    url: "https://archive.org/download/soundica-fs-575554-the-beginning-of-a-thunder-storm-with-rain/575554.mp3",
  },
  {
    id: "forest-birds-nature",
    title: "Forest Birds & Nature Ambience",
    artist: "Spring Lake Birds for Relaxation",
    type: "builtin",
    category: "nature",
    icon: "trees",
    url: "https://archive.org/download/nst-5zNVnVe2M1s-audio/nst-5zNVnVe2M1s-audio.mp3",
  },
  {
    id: "ocean-waves-shore",
    title: "Ocean Waves Calming Shore",
    artist: "Cressound — LesconiL 2025",
    type: "builtin",
    category: "nature",
    icon: "waves",
    url: "https://archive.org/download/cressound-lesconil-2025_202603/Cressound%20-%20LesconiL%202025.mp3",
  },
  {
    id: "cozy-fireplace",
    title: "Cozy Fireplace Crackling",
    artist: "KonstantinPazuzuStudio — Firelight",
    type: "builtin",
    category: "nature",
    icon: "flame",
    url: "https://archive.org/download/jamendo-638545/01-2326588-KonstantinPazuzuStudio-Firelight.mp3",
  },
  {
    id: "rainstorm-cafe",
    title: "Rainstorm in a Cozy Cafe",
    artist: "Coffee Shop Ambience — Bossa Nova",
    type: "builtin",
    category: "nature",
    icon: "coffee",
    url: "https://archive.org/download/coffee-shop-ambience-vintage-latin-cafe-bossa-nova/Coffee%20Shop%20Ambience%20-%20Vintage%20Latin%20Cafe%20Bossa%20Nova%20.mp3",
  },
  {
    id: "quiet-library",
    title: "Quiet Library Ambience",
    artist: "DHDMusic — Quiet Places",
    type: "builtin",
    category: "nature",
    icon: "book-open",
    url: "https://archive.org/download/jamendo-438283/01-1813215-DHDMusic-Quiet%20Places.mp3",
  },
  {
    id: "night-train",
    title: "Night Train on Tracks Sound",
    artist: "A Scene on a Train — Gotherington UK",
    type: "builtin",
    category: "nature",
    icon: "train-front",
    url: "https://archive.org/download/aporee_71709_83707/Toddington20260408143442.mp3",
  },
  {
    id: "night-river-stream",
    title: "Night River Stream Sound",
    artist: "River White Noise & Bird Sounds",
    type: "builtin",
    category: "nature",
    icon: "droplets",
    url: "https://archive.org/download/nst-laeZWIbmH9c-audio/nst-laeZWIbmH9c-audio.mp3",
  },
  {
    id: "gentle-wind-chimes",
    title: "Gentle Wind & Chimes",
    artist: "Bobby Cole — Tibetan Wind Chimes",
    type: "builtin",
    category: "nature",
    icon: "wind",
    url: "https://archive.org/download/jamendo-634942/01-2320879-Bobby%20Cole-Tibetan%20Wind%20Chimes%20_Background%20Chinese%20Ambient%20Music_.mp3",
  },
  {
    id: "morning-rain-garden",
    title: "Morning Rain in the Garden",
    artist: "Morning Rain & Ambient — Malvern UK",
    type: "builtin",
    category: "nature",
    icon: "cloud-drizzle",
    url: "https://archive.org/download/aporee_73273_85624/FrontGarden2.mp3",
  },

  // === Music ===
  {
    id: "solo-piano-minimalist",
    title: "Minimalist Modern Solo Piano",
    artist: "nikproteus — Clear Piano",
    type: "builtin",
    category: "music",
    icon: "piano",
    url: "https://archive.org/download/jamendo-618186/01-2286080-nikproteus-clearpiano.mp3",
  },
  {
    id: "warm-acoustic-folk",
    title: "Warm Acoustic Folk Guitar",
    artist: "Dmytro Demchenko — Acoustic Mood",
    type: "builtin",
    category: "music",
    icon: "guitar",
    url: "https://archive.org/download/jamendo-518975/01-2026521-Dmytro%20Demchenko-Acoustic%20music%20mood.mp3",
  },
  {
    id: "soft-cello-strings",
    title: "Soft Cello & Strings Ambient",
    artist: "DHDMusic — Organic Reflections",
    type: "builtin",
    category: "music",
    icon: "music",
    url: "https://archive.org/download/jamendo-552615/01-2139658-DHDMusic-Organic%20Reflections.mp3",
  },
  {
    id: "chillhop-lofi",
    title: "Chillhop / Lo-Fi Instrumental",
    artist: "Brentin Davis — Lofi And Roses",
    type: "builtin",
    category: "music",
    icon: "disc-3",
    url: "https://archive.org/download/jamendo-628843/01-2308682-Brentin%20Davis-Lofi%20And%20Roses.mp3",
  },
  {
    id: "neo-classical",
    title: "Slow Neo-Classical Instrumental",
    artist: "Osipov Vladimir — Cinematic Side",
    type: "builtin",
    category: "music",
    icon: "violin",
    url: "https://archive.org/download/jamendo-533218/01-2066196-Osipov%20Vladimir-Wedding%20Dance.mp3",
  },
  {
    id: "guitar-rain",
    title: "Soft Acoustic Guitar & Rain",
    artist: "Janevo — Rain Horizon (Chill Hop)",
    type: "builtin",
    category: "music",
    icon: "guitar",
    url: "https://archive.org/download/jamendo-604060/01-2255339-Janevo-Rain%20Horizon%20_Chill%20Hop_.mp3",
  },

  // === Focus & Meditation ===
  {
    id: "deep-space-ambient",
    title: "Deep Space Ambient Soundscape",
    artist: "GubinDmitry — Deep Atmospheric Space",
    type: "builtin",
    category: "focus",
    icon: "sparkles",
    url: "https://archive.org/download/jamendo-462412/01-1900821-GubinDmitry-Deep%20Atmospheric%20Space%20Ambient%208.mp3",
  },
  {
    id: "pink-noise-focus",
    title: "Pink Noise for Focus",
    artist: "Thunder Storm Brown Noise",
    type: "builtin",
    category: "noise",
    icon: "radio",
    url: "https://archive.org/download/thunder-storm-brown-noise/Thunder%20Storm%20Brown%20Noise.mp3",
  },
  {
    id: "alpha-binaural-beats",
    title: "Alpha Binaural Beats for Concentration",
    artist: "11Hz Pure Frequency — Focus & Creativity",
    type: "builtin",
    category: "focus",
    icon: "brain",
    url: "https://archive.org/download/alpha-binaural-beats-11-hz-pure-frequency-ideal-4-focus-creativity-relaxation/Alpha%20Binaural%20Beats%20-%2011%20Hz%20-%20pure%20Frequency%20-%20Ideal%204%20Focus%20-%20Creativity%20-%20Relaxation.mp3",
  },
  {
    id: "432hz-meditation",
    title: "432Hz Meditation Harmony",
    artist: "Fulcrum — Heart Chakra Healing",
    type: "builtin",
    category: "focus",
    icon: "heart",
    url: "https://archive.org/download/soundcloud-875275618-fulcrum-432-hz-heart-chakra-healing-meditation-a/Fulcrum%20(194955521)%20-%20432%20Hz%20Heart%20Chakra%20Healing%20Meditation%20ACTIVATE%20ABUNDANCE%20(875275618).mp3",
  },
];

// === Audio playback engine ===

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let currentTrackId: string | null = null;
let volume = 0.5;
let loopEnabled = true;

export function playTrack(trackId: string, url?: string): void {
  stopMusic();
  currentTrackId = trackId;

  if (!url) {
    const track = getAllTracks().find((t) => t.id === trackId);
    if (!track || !track.url) return;
    url = track.url;
  }

  audioElement = new Audio(url);
  audioElement.loop = loopEnabled;
  audioElement.volume = volume;
  audioElement.crossOrigin = "anonymous";
  isPlaying = true;
  audioElement.play().catch(() => {
    isPlaying = false;
  });
}

export function stopMusic(): void {
  isPlaying = false;
  if (audioElement) {
    audioElement.pause();
    audioElement = null;
  }
}

export function toggleMusic(): boolean {
  if (isPlaying) {
    stopMusic();
    return false;
  } else {
    if (currentTrackId) {
      const track = getAllTracks().find((t) => t.id === currentTrackId);
      if (track) {
        playTrack(track.id, track.url);
        return true;
      }
    }
    return false;
  }
}

export function getMusicPlaying(): boolean {
  return isPlaying;
}

export function getCurrentTrackId(): string | null {
  return currentTrackId;
}

export function setVolume(v: number): void {
  volume = Math.max(0, Math.min(1, v));
  if (audioElement) {
    audioElement.volume = volume;
  }
}

export function getVolume(): number {
  return volume;
}

export function setLoop(enabled: boolean): void {
  loopEnabled = enabled;
  if (audioElement) {
    audioElement.loop = enabled;
  }
}

export function getLoop(): boolean {
  return loopEnabled;
}

// === Track management with localStorage ===
const USER_TRACKS_KEY = "questdo_user_tracks";

export function getUserTracks(): Track[] {
  try {
    const raw = localStorage.getItem(USER_TRACKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addUserTrack(title: string, artist: string, url: string): Track {
  const track: Track = {
    id: `url-${Date.now()}`,
    title,
    artist,
    type: "url",
    url,
  };
  const userTracks = getUserTracks();
  userTracks.push(track);
  localStorage.setItem(USER_TRACKS_KEY, JSON.stringify(userTracks));
  return track;
}

export function removeUserTrack(id: string): void {
  const userTracks = getUserTracks().filter((t) => t.id !== id);
  localStorage.setItem(USER_TRACKS_KEY, JSON.stringify(userTracks));
  if (currentTrackId === id) stopMusic();
}

export function getAllTracks(): Track[] {
  return [...AMBIENT_TRACKS, ...getUserTracks()];
}
