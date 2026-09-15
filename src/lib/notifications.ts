export type ReminderOffset = 0 | 5 | 15 | -1;

export const REMINDER_OPTIONS: { value: ReminderOffset; label: string; description: string }[] = [
  { value: -1, label: "Aucun", description: "Pas de rappel" },
  { value: 15, label: "15 min avant", description: "Notifié 15 minutes avant" },
  { value: 5, label: "5 min avant", description: "Notifié 5 minutes avant" },
  { value: 0, label: "À l'heure", description: "Notifié au début de la tâche" },
];

export interface ReminderSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  notificationsEnabled: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

const SETTINGS_KEY = "questdo_reminder_settings";

export function getReminderSettings(): ReminderSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_REMINDER_SETTINGS, ...JSON.parse(raw) } : DEFAULT_REMINDER_SETTINGS;
  } catch {
    return DEFAULT_REMINDER_SETTINGS;
  }
}

export function saveReminderSettings(settings: ReminderSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof Notification === "undefined") return "denied";
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof Notification === "undefined") return "denied";
  if (Notification.permission === "granted") return "granted";
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

function playReminderSound(): void {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const now = ctx.currentTime;

    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    playTone(880, now, 0.15);
    playTone(1320, now + 0.12, 0.2);
    playTone(1760, now + 0.24, 0.3);

    setTimeout(() => ctx.close(), 1000);
  } catch {
    // AudioContext not available
  }
}

function vibrate(): void {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  } catch {
    // Vibration not supported
  }
}

export function triggerReminder(title: string, body: string): void {
  const settings = getReminderSettings();

  if (settings.notificationsEnabled && getNotificationPermission() === "granted") {
    try {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        tag: `reminder-${Date.now()}`,
      });
    } catch {
      // Notification failed
    }
  }

  if (settings.soundEnabled) {
    playReminderSound();
  }

  if (settings.vibrationEnabled) {
    vibrate();
  }
}

const TRIGGERED_KEY = "questdo_triggered_reminders";

function getTriggeredReminders(): string[] {
  try {
    const raw = localStorage.getItem(TRIGGERED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markTriggered(key: string): void {
  const triggered = getTriggeredReminders();
  triggered.push(key);
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const filtered = triggered.filter((t) => {
    const ts = parseInt(t.split("::")[1] || "0", 10);
    return ts > cutoff;
  });
  localStorage.setItem(TRIGGERED_KEY, JSON.stringify(filtered));
}

function isTriggered(key: string): boolean {
  return getTriggeredReminders().includes(key);
}

export interface RemindableTask {
  id: string;
  title: string;
  reminder: ReminderOffset;
  startHour: number;
  day: DayOfWeek;
  completed: boolean;
}

import type { DayOfWeek } from "@/lib/types";

const DAY_TO_INDEX: Record<DayOfWeek, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export function getReminderTime(task: RemindableTask, now: Date = new Date()): Date | null {
  if (task.reminder === -1) return null;

  const currentDay = now.getDay();
  const targetDay = DAY_TO_INDEX[task.day];
  let dayDiff = targetDay - currentDay;
  if (dayDiff < 0) dayDiff += 7;

  const target = new Date(now);
  target.setDate(now.getDate() + dayDiff);
  target.setHours(task.startHour, 0, 0, 0);
  target.setMinutes(target.getMinutes() - task.reminder);

  return target;
}

export function checkReminders(tasks: RemindableTask[]): void {
  const now = new Date();
  const nowTime = now.getTime();
  const settings = getReminderSettings();

  if (!settings.notificationsEnabled && !settings.soundEnabled && !settings.vibrationEnabled) return;

  for (const task of tasks) {
    if (task.completed || task.reminder === -1) continue;

    const reminderTime = getReminderTime(task, now);
    if (!reminderTime) continue;

    const reminderMs = reminderTime.getTime();
    const diff = nowTime - reminderMs;

    if (diff >= 0 && diff < 60000) {
      const triggerKey = `${task.id}::${Math.floor(reminderMs / 60000)}`;
      if (!isTriggered(triggerKey)) {
        markTriggered(triggerKey);

        const offsetLabel = task.reminder === 0 ? "commence maintenant" : `commence dans ${task.reminder} min`;
        triggerReminder(
          `Rappel: ${task.title}`,
          `${offsetLabel} — ${String(task.startHour).padStart(2, "0")}:00`
        );
      }
    }
  }
}
