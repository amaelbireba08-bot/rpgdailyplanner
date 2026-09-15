import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { DIFFICULTY_CONFIG, BADGES } from "@/lib/types";
import type { Task, UserProfile, Difficulty, CalendarTask, DayOfWeek } from "@/lib/types";
import { levelFromXp, xpForCalendarTask, isMilestoneLevel, getMilestoneInfo } from "@/lib/gamification";
import { THEMES, applyTheme, getThemeById } from "@/lib/themes";
import type { Theme } from "@/lib/themes";
import { checkReminders, requestNotificationPermission, getNotificationPermission } from "@/lib/notifications";
import type { ReminderOffset, ReminderSettings } from "@/lib/notifications";
import { DEFAULT_REMINDER_SETTINGS, getReminderSettings, saveReminderSettings } from "@/lib/notifications";
import ProfileSetup from "@/components/ProfileSetup";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import BadgesScreen from "@/components/BadgesScreen";
import ProfileScreen from "@/components/ProfileScreen";
import BottomNav from "@/components/BottomNav";
import LevelUpModal from "@/components/LevelUpModal";
import ThemeSettings from "@/components/ThemeSettings";
import MusicPlayer from "@/components/MusicPlayer";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import CalendarTaskForm from "@/components/CalendarTaskForm";
import MilestoneModal from "@/components/MilestoneModal";

type Tab = "tasks" | "calendar" | "badges" | "theme" | "profile";

export default function App() {
  const [profile, setProfile] = useLocalStorage<UserProfile | null>("questdo_profile", null);
  const [tasks, setTasks] = useLocalStorage<Task[]>("questdo_tasks", []);
  const [calendarTasks, setCalendarTasks] = useLocalStorage<CalendarTask[]>("questdo_calendar_tasks", []);
  const [themeId, setThemeId] = useLocalStorage<string>("questdo_theme", "indigo");
  const [customTheme, setCustomTheme] = useLocalStorage<Theme | null>("questdo_custom_theme", null);
  const [activeTab, setActiveTab] = useState<Tab>("tasks");
  const [showForm, setShowForm] = useState(false);
  const [showCalendarForm, setShowCalendarForm] = useState(false);
  const [calendarFormDefaults, setCalendarFormDefaults] = useState<{ day: DayOfWeek; hour: number }>({ day: "mon", hour: 9 });
  const [levelUp, setLevelUp] = useState<{ xp: number; newLevel: number; leveledUp: boolean } | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);
  const [newBadge, setNewBadge] = useState<string | null>(null);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(DEFAULT_REMINDER_SETTINGS);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default");

  const currentTheme = themeId === "custom" && customTheme ? customTheme : getThemeById(themeId);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    setReminderSettings(getReminderSettings());
    setNotifPermission(getNotificationPermission());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders(calendarTasks.map((t) => ({
        id: t.id,
        title: t.title,
        reminder: t.reminder ?? -1,
        startHour: t.startHour,
        day: t.day,
        completed: t.completed,
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, [calendarTasks]);

  const handleSelectTheme = useCallback(
    (theme: Theme) => {
      setThemeId(theme.id);
      setCustomTheme(null);
      applyTheme(theme);
    },
    [setThemeId, setCustomTheme]
  );

  const handleCustomTheme = useCallback(
    (theme: Theme) => {
      setThemeId("custom");
      setCustomTheme(theme);
      applyTheme(theme);
    },
    [setThemeId, setCustomTheme]
  );

  const handleAddTask = useCallback(
    (title: string, description: string, difficulty: Difficulty) => {
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        difficulty,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  const handleToggleTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task || !profile) return;

      const wasCompleted = task.completed;
      const xpDelta = wasCompleted ? -DIFFICULTY_CONFIG[task.difficulty].xp : DIFFICULTY_CONFIG[task.difficulty].xp;

      const prevBadges = new Set(BADGES.filter((b) => b.condition(profile, tasks)).map((b) => b.id));

      const updatedTasks = tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
          : t
      );

      const newXp = Math.max(0, profile.xp + xpDelta);
      const newLevel = levelFromXp(newXp);
      const newTotalCompleted = wasCompleted ? profile.totalCompleted - 1 : profile.totalCompleted + 1;

      const updatedProfile: UserProfile = {
        ...profile,
        xp: newXp,
        level: newLevel,
        totalCompleted: newTotalCompleted,
      };

      const newBadges = BADGES.filter((b) => b.condition(updatedProfile, updatedTasks));
      const freshlyUnlocked = newBadges.find((b) => !prevBadges.has(b.id));

      setTasks(updatedTasks);
      setProfile(updatedProfile);

      if (!wasCompleted) {
        setLevelUp({
          xp: DIFFICULTY_CONFIG[task.difficulty].xp,
          newLevel,
          leveledUp: newLevel > profile.level,
        });
        if (freshlyUnlocked) {
          setTimeout(() => setNewBadge(freshlyUnlocked.label), 1500);
        }
        if (newLevel > profile.level && isMilestoneLevel(newLevel)) {
          setTimeout(() => setMilestone(newLevel), 2000);
        }
      }
    },
    [tasks, profile, setTasks, setProfile]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  // === Calendar task handlers ===

  const handleAddCalendarTask = useCallback(
    (title: string, day: DayOfWeek, startHour: number, endHour: number, reminder: ReminderOffset) => {
      const task: CalendarTask = {
        id: crypto.randomUUID(),
        title,
        day,
        startHour,
        endHour,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        reminder,
      };
      setCalendarTasks((prev) => [...prev, task]);
      setShowCalendarForm(false);
      if (reminder !== -1 && getNotificationPermission() !== "granted") {
        requestNotificationPermission().then(setNotifPermission);
      }
    },
    [setCalendarTasks]
  );

  const handleToggleCalendarTask = useCallback(
    (id: string) => {
      const task = calendarTasks.find((t) => t.id === id);
      if (!task || !profile) return;

      const wasCompleted = task.completed;
      const xpDelta = wasCompleted ? -xpForCalendarTask(task.startHour, task.endHour) : xpForCalendarTask(task.startHour, task.endHour);

      const updatedTasks = calendarTasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
          : t
      );

      const newXp = Math.max(0, profile.xp + xpDelta);
      const newLevel = levelFromXp(newXp);
      const newTotalCompleted = wasCompleted ? profile.totalCompleted - 1 : profile.totalCompleted + 1;

      const updatedProfile: UserProfile = {
        ...profile,
        xp: newXp,
        level: newLevel,
        totalCompleted: newTotalCompleted,
      };

      setCalendarTasks(updatedTasks);
      setProfile(updatedProfile);

      if (!wasCompleted) {
        setLevelUp({
          xp: xpForCalendarTask(task.startHour, task.endHour),
          newLevel,
          leveledUp: newLevel > profile.level,
        });
        if (newLevel > profile.level && isMilestoneLevel(newLevel)) {
          setTimeout(() => setMilestone(newLevel), 2000);
        }
      }
    },
    [calendarTasks, profile, setCalendarTasks, setProfile]
  );

  const handleDeleteCalendarTask = useCallback(
    (id: string) => {
      setCalendarTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setCalendarTasks]
  );

  const handleOpenCalendarForm = useCallback((day: DayOfWeek, hour: number) => {
    setCalendarFormDefaults({ day, hour });
    setShowCalendarForm(true);
  }, []);

  const handleReset = useCallback(() => {
    setProfile(null);
    setTasks([]);
    setCalendarTasks([]);
    setActiveTab("tasks");
  }, [setProfile, setTasks, setCalendarTasks]);

  const handleUpdateReminderSettings = useCallback((settings: ReminderSettings) => {
    setReminderSettings(settings);
    saveReminderSettings(settings);
    if (settings.notificationsEnabled && getNotificationPermission() !== "granted") {
      requestNotificationPermission().then(setNotifPermission);
    }
  }, []);

  if (!profile) {
    return <ProfileSetup onComplete={setProfile} />;
  }

  return (
    <div className="min-h-screen min-h-[100dvh]" style={{ background: "var(--theme-bg)" }}>
      {activeTab === "tasks" && (
        <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} onAdd={() => setShowForm(true)} />
      )}
      {activeTab === "calendar" && (
        <WeeklyCalendar
          tasks={calendarTasks}
          onToggle={handleToggleCalendarTask}
          onDelete={handleDeleteCalendarTask}
          onAdd={handleOpenCalendarForm}
        />
      )}
      {activeTab === "badges" && <BadgesScreen profile={profile} tasks={tasks} />}
      {activeTab === "theme" && (
        <ThemeSettings
          currentTheme={currentTheme}
          onSelectTheme={handleSelectTheme}
          onCustomTheme={handleCustomTheme}
        />
      )}
      {activeTab === "profile" && (
        <ProfileScreen
          profile={profile}
          tasks={tasks}
          onReset={handleReset}
          reminderSettings={reminderSettings}
          onUpdateReminderSettings={handleUpdateReminderSettings}
          notifPermission={notifPermission}
          onRequestNotificationPermission={async () => {
            const perm = await requestNotificationPermission();
            setNotifPermission(perm);
            return perm;
          }}
        />
      )}

      <MusicPlayer />

      <BottomNav active={activeTab} onNavigate={(t) => setActiveTab(t as Tab)} />

      {showForm && <TaskForm onAdd={handleAddTask} onClose={() => setShowForm(false)} />}

      {showCalendarForm && (
        <CalendarTaskForm
          onAdd={handleAddCalendarTask}
          onClose={() => setShowCalendarForm(false)}
          defaultDay={calendarFormDefaults.day}
          defaultHour={calendarFormDefaults.hour}
        />
      )}

      {levelUp && (
        <LevelUpModal
          xpGained={levelUp.xp}
          newLevel={levelUp.newLevel}
          leveledUp={levelUp.leveledUp}
          onClose={() => {
            setLevelUp(null);
            if (newBadge) {
              setTimeout(() => {
                alert(`Badge débloqué: ${newBadge}`);
                setNewBadge(null);
              }, 300);
            }
          }}
        />
      )}

      {milestone && (
        <MilestoneModal
          level={milestone}
          onClose={() => setMilestone(null)}
        />
      )}
    </div>
  );
}
