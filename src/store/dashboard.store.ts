import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as dashboardApi from '@api/dashboard.api';
import type { LeaderboardEntry, TestResultWithTopic, WeakTopic } from '@api/dashboard.api';

// ─── Achievement types ──────────────────────────────────────────────

export type AchievementKey = 'first_perfect' | 'streak_3' | 'streak_7';

export interface Achievement {
  key: AchievementKey;
  unlocked: boolean;
  unlockedAt?: string;
}

// ─── State ──────────────────────────────────────────────────────────

interface DashboardState {
  results: TestResultWithTopic[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  error: string | null;

  achievements: Achievement[];
  achievementsLoading: boolean;

  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;

  weakTopics: WeakTopic[];
  weakTopicsLoading: boolean;
}

interface DashboardActions {
  fetchResults: (userId: string, page?: number) => Promise<void>;
  setPage: (page: number, userId: string) => Promise<void>;
  fetchAchievements: (userId: string) => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
  fetchWeakTopics: (userId: string) => Promise<void>;
  reset: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

const PAGE_SIZE = 8;

const initialState: DashboardState = {
  results: [],
  totalResults: 0,
  currentPage: 1,
  pageSize: PAGE_SIZE,
  loading: false,
  error: null,
  achievements: [],
  achievementsLoading: false,
  leaderboard: [],
  leaderboardLoading: false,
  weakTopics: [],
  weakTopicsLoading: false,
};

// ─── Achievement calculator ─────────────────────────────────────────

function computeAchievements(rows: Pick<dashboardApi.TestResultRow, 'completed_at' | 'percentage'>[]): Achievement[] {
  const achievements: Achievement[] = [];

  // 1. First perfect score (100%)
  const firstPerfect = rows.find((r) => r.percentage === 100);
  achievements.push({
    key: 'first_perfect',
    unlocked: !!firstPerfect,
    unlockedAt: firstPerfect?.completed_at,
  });

  // 2 & 3. Streak achievements (3 days, 7 days) with >= 70%
  const qualifyingRows = rows.filter((r) => r.percentage >= 70);

  // Get unique days (in local timezone) with qualifying results
  const uniqueDays = new Set<string>();
  for (const row of qualifyingRows) {
    const date = new Date(row.completed_at);
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    uniqueDays.add(dayKey);
  }

  const sortedDays = [...uniqueDays].sort();

  let maxStreak = 0;
  let currentStreak = 1;
  let streak3Date: string | undefined;
  let streak7Date: string | undefined;

  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1] + 'T00:00:00');
    const curr = new Date(sortedDays[i] + 'T00:00:00');
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    if (currentStreak >= 3 && !streak3Date) {
      streak3Date = sortedDays[i];
    }
    if (currentStreak >= 7 && !streak7Date) {
      streak7Date = sortedDays[i];
    }

    maxStreak = Math.max(maxStreak, currentStreak);
  }

  achievements.push({
    key: 'streak_3',
    unlocked: maxStreak >= 3,
    unlockedAt: streak3Date ? streak3Date + 'T00:00:00Z' : undefined,
  });

  achievements.push({
    key: 'streak_7',
    unlocked: maxStreak >= 7,
    unlockedAt: streak7Date ? streak7Date + 'T00:00:00Z' : undefined,
  });

  return achievements;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchResults: async (userId: string, page: number = 1): Promise<void> => {
        set({ loading: true, error: null, currentPage: page }, false, 'fetchResults/start');

        const { data, total, error } = await dashboardApi.getTestResults(userId, page, PAGE_SIZE);

        set(
          {
            results: data ?? [],
            totalResults: total,
            loading: false,
            error,
          },
          false,
          'fetchResults/done',
        );
      },

      setPage: async (page: number, userId: string): Promise<void> => {
        await get().fetchResults(userId, page);
      },

      fetchAchievements: async (userId: string): Promise<void> => {
        set({ achievementsLoading: true }, false, 'fetchAchievements/start');

        const { data } = await dashboardApi.getAllResultsForAchievements(userId);
        const achievements = computeAchievements(data ?? []);

        set({ achievements, achievementsLoading: false }, false, 'fetchAchievements/done');
      },

      fetchLeaderboard: async (): Promise<void> => {
        set({ leaderboardLoading: true }, false, 'fetchLeaderboard/start');

        const { data } = await dashboardApi.getLeaderboard(20);

        set({ leaderboard: data ?? [], leaderboardLoading: false }, false, 'fetchLeaderboard/done');
      },

      fetchWeakTopics: async (userId: string): Promise<void> => {
        set({ weakTopicsLoading: true }, false, 'fetchWeakTopics/start');

        const { data } = await dashboardApi.getWeakTopics(userId, 70);

        set({ weakTopics: data ?? [], weakTopicsLoading: false }, false, 'fetchWeakTopics/done');
      },

      reset: (): void => {
        set(initialState, false, 'reset');
      },
    }),
    { name: 'DashboardStore', enabled: true },
  ),
);
