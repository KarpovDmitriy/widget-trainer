import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as dashboardApi from '@api/dashboard.api';
import type { LeaderboardEntry, TestResultWithTopic, WeakTopic } from '@api/dashboard.api';
import { DASHBOARD_PAGE_SIZE, LEADERBOARD_LIMIT, WEAK_TOPIC_THRESHOLD } from '@shared/Constants/dashboard.constants';
import { computeAchievements } from '@utils/achievements';
import type { Achievement } from '@utils/achievements';
import { useLoaderStore } from '@s/loader.store';

interface DashboardState {
  results: TestResultWithTopic[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
  error: string | null;

  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  weakTopics: WeakTopic[];
  initialLoaded: boolean;
}

interface DashboardActions {
  fetchResults: (userId: string, page?: number) => Promise<void>;
  setPage: (page: number, userId: string) => Promise<void>;
  fetchAchievements: (userId: string) => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
  fetchWeakTopics: (userId: string) => Promise<void>;
  fetchAll: (userId: string) => Promise<void>;
  reset: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

const initialState: DashboardState = {
  results: [],
  totalResults: 0,
  currentPage: 1,
  pageSize: DASHBOARD_PAGE_SIZE,
  error: null,
  achievements: [],
  leaderboard: [],
  weakTopics: [],
  initialLoaded: false,
};

const setDashboardLoading = (value: boolean): void => {
  useLoaderStore.getState().setLoading({ isDashboardLoading: value });
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchResults: async (userId: string, page: number = 1): Promise<void> => {
        set({ currentPage: page, error: null }, false, 'fetchResults/start');

        const { data, total, error } = await dashboardApi.getTestResults(userId, page, DASHBOARD_PAGE_SIZE);

        set(
          {
            results: data ?? [],
            totalResults: total,
            error,
          },
          false,
          'fetchResults/done',
        );
      },

      setPage: async (page: number, userId: string): Promise<void> => {
        setDashboardLoading(true);
        await get().fetchResults(userId, page);
        setDashboardLoading(false);
      },

      fetchAchievements: async (userId: string): Promise<void> => {
        const { data } = await dashboardApi.getAllResultsForAchievements(userId);
        const achievements = computeAchievements(data ?? []);

        set({ achievements }, false, 'fetchAchievements/done');
      },

      fetchLeaderboard: async (): Promise<void> => {
        const { data } = await dashboardApi.getLeaderboard(LEADERBOARD_LIMIT);

        set({ leaderboard: data ?? [] }, false, 'fetchLeaderboard/done');
      },

      fetchWeakTopics: async (userId: string): Promise<void> => {
        const { data } = await dashboardApi.getWeakTopics(userId, WEAK_TOPIC_THRESHOLD);

        set({ weakTopics: data ?? [] }, false, 'fetchWeakTopics/done');
      },

      fetchAll: async (userId: string): Promise<void> => {
        setDashboardLoading(true);

        await Promise.all([
          get().fetchResults(userId, 1),
          get().fetchAchievements(userId),
          get().fetchLeaderboard(),
          get().fetchWeakTopics(userId),
        ]);

        set({ initialLoaded: true }, false, 'fetchAll/done');
        setDashboardLoading(false);
      },

      reset: (): void => {
        set(initialState, false, 'reset');
      },
    }),
    { name: 'DashboardStore', enabled: true },
  ),
);
