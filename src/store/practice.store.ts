import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as widgetApi from '@api/widget.api';
import type { SessionResult, SessionSummary, Topic, Verdict, Widget, WidgetAnswer } from '@src/types/widget.types';

interface PracticeState {
  // Library
  topics: Topic[];
  topicsLoading: boolean;
  topicsError: string | null;

  // Session
  currentTopicId: string | null;
  widgets: Widget[];
  currentIndex: number;
  results: SessionResult[];
  sessionActive: boolean;
  widgetsLoading: boolean;

  // Current widget state
  submitting: boolean;
  lastVerdict: Verdict | null;

  // Summary
  summary: SessionSummary | null;
}

interface PracticeActions {
  fetchTopics: () => Promise<void>;
  startSession: (topicId: string) => Promise<void>;
  submitAnswer: (answer: WidgetAnswer) => Promise<void>;
  nextWidget: () => void;
  finishSession: () => void;
  resetSession: () => void;
}

type PracticeStore = PracticeState & PracticeActions;

const initialState: PracticeState = {
  topics: [],
  topicsLoading: false,
  topicsError: null,
  currentTopicId: null,
  widgets: [],
  currentIndex: 0,
  results: [],
  sessionActive: false,
  widgetsLoading: false,
  submitting: false,
  lastVerdict: null,
  summary: null,
};

export const usePracticeStore = create<PracticeStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchTopics: async (): Promise<void> => {
        set({ topicsLoading: true, topicsError: null }, false, 'fetchTopics/start');
        const { data, error } = await widgetApi.getTopics();
        set(
          {
            topics: data ?? [],
            topicsLoading: false,
            topicsError: error,
          },
          false,
          'fetchTopics/done',
        );
      },

      startSession: async (topicId: string): Promise<void> => {
        set({ widgetsLoading: true, currentTopicId: topicId }, false, 'startSession/start');

        const { data, error } = await widgetApi.getWidgetsByTopicId(topicId);

        if (error || !data || data.length === 0) {
          set({ widgetsLoading: false }, false, 'startSession/error');
          return;
        }

        // Shuffle widgets for varied experience
        const shuffled = [...data].sort(() => Math.random() - 0.5);

        set(
          {
            widgets: shuffled,
            currentIndex: 0,
            results: [],
            sessionActive: true,
            widgetsLoading: false,
            lastVerdict: null,
            summary: null,
          },
          false,
          'startSession/done',
        );
      },

      submitAnswer: async (answer: WidgetAnswer): Promise<void> => {
        const { widgets, currentIndex } = get();
        const currentWidget = widgets[currentIndex];
        if (!currentWidget) {
          return;
        }

        set({ submitting: true }, false, 'submitAnswer/start');

        const startTime = Date.now();
        const { data: verdict } = await widgetApi.submitAnswer(currentWidget.id, answer);

        const result: SessionResult = {
          widgetId: currentWidget.id,
          widgetType: currentWidget.type,
          answer,
          isCorrect: verdict?.isCorrect ?? false,
          timeSpent: Date.now() - startTime,
        };

        set(
          (state) => ({
            results: [...state.results, result],
            lastVerdict: verdict,
            submitting: false,
          }),
          false,
          'submitAnswer/done',
        );
      },

      nextWidget: (): void => {
        const { currentIndex, widgets } = get();

        if (currentIndex + 1 >= widgets.length) {
          get().finishSession();
          return;
        }

        set(
          {
            currentIndex: currentIndex + 1,
            lastVerdict: null,
          },
          false,
          'nextWidget',
        );
      },

      finishSession: (): void => {
        const { currentTopicId, results } = get();
        const totalCorrect = results.filter((r) => r.isCorrect).length;

        set(
          {
            sessionActive: false,
            summary: {
              topicId: currentTopicId ?? '',
              results,
              totalCorrect,
              totalQuestions: results.length,
              percentage: results.length > 0 ? Math.round((totalCorrect / results.length) * 100) : 0,
            },
          },
          false,
          'finishSession',
        );
      },

      resetSession: (): void => {
        set(
          {
            currentTopicId: null,
            widgets: [],
            currentIndex: 0,
            results: [],
            sessionActive: false,
            widgetsLoading: false,
            submitting: false,
            lastVerdict: null,
            summary: null,
          },
          false,
          'resetSession',
        );
      },
    }),
    { name: 'PracticeStore', enabled: true },
  ),
);
