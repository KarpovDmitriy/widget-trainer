import { processPostgrestError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { supabase } from '@src/lib/supabase';

export interface TestResultRow {
  id: string;
  user_id: string;
  topic_id: string;
  percentage: number;
  total_correct: number;
  total_questions: number;
  completed_at: string;
}

export interface TestResultWithTopic extends TestResultRow {
  topic: {
    title: { ru: string; en: string };
    difficulty: number;
  } | null;
}

export interface SaveTestResultPayload {
  user_id: string;
  topic_id: string;
  percentage: number;
  total_correct: number;
  total_questions: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface PaginatedResponse<T> {
  data: T[] | null;
  total: number;
  error: string | null;
}

export const saveTestResult = async (payload: SaveTestResultPayload): Promise<ApiResponse<TestResultRow>> => {
  try {
    const { data, error, status } = await supabase.from('test_results').insert(payload).select().single();

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    return { data: data as TestResultRow, error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

export const getTestResults = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<TestResultWithTopic>> => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Get total count
    const {
      count,
      error: countError,
      status: countStatus,
    } = await supabase.from('test_results').select('*', { count: 'exact', head: true }).eq('user_id', userId);

    if (countError) {
      return { data: null, total: 0, error: processPostgrestError(countError, countStatus) };
    }

    // Get paginated results with topic info
    const { data, error, status } = await supabase
      .from('test_results')
      .select(
        `
        id,
        user_id,
        topic_id,
        percentage,
        total_correct,
        total_questions,
        completed_at,
        topic:topics ( title, difficulty )
      `,
      )
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .range(from, to);

    if (error) {
      return { data: null, total: 0, error: processPostgrestError(error, status) };
    }

    return {
      data: (data ?? []) as unknown as TestResultWithTopic[],
      total: count ?? 0,
      error: null,
    };
  } catch {
    return { data: null, total: 0, error: SYSTEM_ERROR };
  }
};

export const getAllResultsForAchievements = async (
  userId: string,
): Promise<ApiResponse<Pick<TestResultRow, 'completed_at' | 'percentage'>[]>> => {
  try {
    const { data, error, status } = await supabase
      .from('test_results')
      .select('completed_at, percentage')
      .eq('user_id', userId)
      .order('completed_at', { ascending: true });

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    return { data: (data ?? []) as Pick<TestResultRow, 'completed_at' | 'percentage'>[], error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

export interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  tests_taken: number;
  avg_score: number;
  best_score: number;
  last_active: string;
}

export const getLeaderboard = async (limit: number = 20): Promise<ApiResponse<LeaderboardEntry[]>> => {
  try {
    const { data, error } = await supabase.rpc('get_leaderboard', { result_limit: limit });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: (data ?? []) as LeaderboardEntry[], error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

export interface WeakTopic {
  topic_id: string;
  topic_title: { ru: string; en: string };
  topic_difficulty: number;
  attempts: number;
  avg_score: number;
  last_score: number;
  last_completed: string;
}

export const getWeakTopics = async (userId: string, threshold: number = 70): Promise<ApiResponse<WeakTopic[]>> => {
  try {
    // Fetch all user results with topic info
    const { data, error, status } = await supabase
      .from('test_results')
      .select(
        `
        topic_id,
        percentage,
        completed_at,
        topic:topics ( title, difficulty )
      `,
      )
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    // Group by topic_id
    const topicMap = new Map<
      string,
      {
        rows: { percentage: number; completed_at: string }[];
        topic: { title: { ru: string; en: string }; difficulty: number } | null;
      }
    >();

    for (const row of data as unknown as {
      topic_id: string;
      percentage: number;
      completed_at: string;
      topic: { title: { ru: string; en: string }; difficulty: number } | null;
    }[]) {
      const existing = topicMap.get(row.topic_id);
      if (existing) {
        existing.rows.push({ percentage: row.percentage, completed_at: row.completed_at });
      } else {
        topicMap.set(row.topic_id, {
          rows: [{ percentage: row.percentage, completed_at: row.completed_at }],
          topic: row.topic,
        });
      }
    }

    // Compute weak topics
    const weakTopics: WeakTopic[] = [];

    for (const [topicId, entry] of topicMap) {
      const total = entry.rows.reduce((sum, r) => sum + r.percentage, 0);
      const avg = Math.round(total / entry.rows.length);

      if (avg < threshold) {
        // rows are already sorted desc by completed_at
        const latest = entry.rows[0];
        weakTopics.push({
          topic_id: topicId,
          topic_title: entry.topic?.title ?? { ru: topicId, en: topicId },
          topic_difficulty: entry.topic?.difficulty ?? 1,
          attempts: entry.rows.length,
          avg_score: avg,
          last_score: latest.percentage,
          last_completed: latest.completed_at,
        });
      }
    }

    // Sort by avg_score ascending (weakest first)
    weakTopics.sort((a, b) => a.avg_score - b.avg_score);

    return { data: weakTopics, error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};
