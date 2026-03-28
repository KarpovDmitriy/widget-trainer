import { processPostgrestError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { supabase } from '@src/lib/supabase';
import type {
  CodeOrderingPayload,
  QuizPayload,
  Tag,
  Topic,
  TrueFalseAnswer,
  TrueFalsePayload,
  Verdict,
  Widget,
  WidgetAnswer,
  WidgetType,
} from '@src/types/widget.types';

// Response wrappers
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface TopicRow {
  id: string;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  difficulty: number;
  order_index: number;
  topic_widgets: { widget_id: string }[];
  topic_tags: { tag: { id: string; name: string; label: { ru: string; en: string } } }[];
}

interface WidgetRow {
  id: string;
  type: string;
  difficulty: number;
  payload: unknown;
  created_at: string;
}

interface JunctionRow {
  widget_id: string;
}

interface TagLinkRow {
  widget_id: string;
  tag: { name: string };
}

interface WidgetDbRow {
  type: string;
  correct_answer: unknown;
  payload: unknown;
}

// Map DB row to frontend Widget
function mapRowToWidget(row: WidgetRow, tags: string[]): Widget | null {
  const base = {
    id: row.id,
    difficulty: row.difficulty as 1 | 2 | 3,
    tags,
  };

  switch (row.type) {
    case 'quiz':
      return { ...base, type: 'quiz', payload: row.payload as QuizPayload };
    case 'code-ordering':
      return { ...base, type: 'code-ordering', payload: row.payload as CodeOrderingPayload };
    case 'true-false':
      return {
        ...base,
        type: 'true-false',
        payload: row.payload as TrueFalsePayload,
      };
    default:
      // Fallback: treat unknown types as quiz so TS is satisfied. In practice, this branch should never be reached.
      // return { ...base, type: 'quiz', payload: row.payload as QuizPayload };
      return null;
  }
}

export const getTopics = async (): Promise<ApiResponse<Topic[]>> => {
  try {
    const { data, error, status } = await supabase
      .from('topics')
      .select(
        `
        id,
        title,
        description,
        difficulty,
        order_index,
        topic_widgets ( widget_id ),
        topic_tags:topic_tag_map ( tag:tags ( id, name, label ) )
      `,
      )
      .order('order_index', { ascending: true });

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    const rows = (data ?? []) as unknown as TopicRow[];

    const topics: Topic[] = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      difficulty: row.difficulty as 1 | 2 | 3,
      widget_count: row.topic_widgets?.length ?? 0,
      order: row.order_index,
      tags: (row.topic_tags ?? []).filter((tt) => tt.tag !== null).map((tt) => tt.tag.name),
    }));

    return { data: topics, error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

export const getTags = async (): Promise<ApiResponse<Tag[]>> => {
  try {
    const { data, error, status } = await supabase.from('tags').select('id, name, label').order('name');

    if (error) {
      return { data: null, error: processPostgrestError(error, status) };
    }

    return { data: (data ?? []) as Tag[], error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

// Widgets for a topic

export const getWidgetsByTopicId = async (topicId: string): Promise<ApiResponse<Widget[]>> => {
  try {
    // 1. Get widget IDs for this topic
    const {
      data: junctionData,
      error: junctionError,
      status: junctionStatus,
    } = await supabase.from('topic_widgets').select('widget_id').eq('topic_id', topicId);

    if (junctionError) {
      return { data: null, error: processPostgrestError(junctionError, junctionStatus) };
    }

    const widgetIds = ((junctionData ?? []) as JunctionRow[]).map((r) => r.widget_id);

    if (widgetIds.length === 0) {
      return { data: [], error: null };
    }

    // 2. Fetch widget rows (excluding correct_answer - security)
    const {
      data: widgetRows,
      error: widgetError,
      status: widgetStatus,
    } = await supabase.from('widgets').select('id, type, difficulty, payload, created_at').in('id', widgetIds);

    if (widgetError) {
      return { data: null, error: processPostgrestError(widgetError, widgetStatus) };
    }

    // 3. Fetch tags for these widgets
    const { data: tagLinks } = await supabase
      .from('widget_tag_map')
      .select('widget_id, tag:tags ( name )')
      .in('widget_id', widgetIds);

    const tagsByWidget = new Map<string, string[]>();
    ((tagLinks ?? []) as unknown as TagLinkRow[]).forEach((link) => {
      if (!link.tag) {
        return;
      }
      const existing = tagsByWidget.get(link.widget_id) ?? [];
      existing.push(link.tag.name);
      tagsByWidget.set(link.widget_id, existing);
    });

    const widgets: Widget[] = ((widgetRows ?? []) as WidgetRow[])
      .map((row) => mapRowToWidget(row, tagsByWidget.get(row.id) ?? []))
      .filter((w): w is Widget => w !== null);

    return { data: widgets, error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

// Submit Answer (validated server-side via correct_answer)

export const submitAnswer = async (widgetId: string, answer: WidgetAnswer): Promise<ApiResponse<Verdict>> => {
  try {
    // Fetch the correct answer from DB
    const {
      data: row,
      error: fetchError,
      status: fetchStatus,
    } = await supabase.from('widgets').select('type, correct_answer, payload').eq('id', widgetId).single();

    if (fetchError) {
      return { data: null, error: processPostgrestError(fetchError, fetchStatus) };
    }

    if (!row) {
      return { data: null, error: 'Widget not found' };
    }

    const dbRow = row as WidgetDbRow;
    const verdict = validateAnswer(dbRow.type as WidgetType, answer, dbRow.correct_answer);

    return { data: verdict, error: null };
  } catch {
    return { data: null, error: SYSTEM_ERROR };
  }
};

function validateAnswer(type: WidgetType, answer: WidgetAnswer, correctAnswer: unknown): Verdict {
  switch (type) {
    case 'quiz': {
      const quizAnswer = answer as { selectedIndex: number };
      const correct = correctAnswer as { selectedIndex: number };
      return {
        isCorrect: quizAnswer.selectedIndex === correct.selectedIndex,
      };
    }
    case 'code-ordering': {
      const orderAnswer = answer as { order: number[] };
      const correctOrder = correctAnswer as { order: number[] };
      const isCorrect =
        orderAnswer.order.length === correctOrder.order.length &&
        orderAnswer.order.every((val, idx) => val === correctOrder.order[idx]);
      return { isCorrect };
    }
    case 'true-false': {
      const tfAnswer = answer as TrueFalseAnswer;
      const correct = correctAnswer as TrueFalseAnswer;
      return { isCorrect: tfAnswer.isTrue === correct.isTrue };
    }
    default:
      return { isCorrect: false };
  }
}
