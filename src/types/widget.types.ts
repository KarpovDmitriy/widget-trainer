export interface LocalizedString {
  ru: string;
  en: string;
}

// Widget Types
export type WidgetType = 'quiz' | 'code-ordering';
// When new widgets are added, extend this union:
// | 'true-false' | 'code-completion' | 'async-sorter' | 'memory-game' | 'stack-builder';

export interface BaseWidget {
  id: string;
  type: WidgetType;
  difficulty: 1 | 2 | 3;
  tags: string[];
}

export interface QuizPayload {
  question: LocalizedString;
  options: LocalizedString[];
}

export interface QuizWidget extends BaseWidget {
  type: 'quiz';
  payload: QuizPayload;
}

export interface QuizAnswer {
  selectedIndex: number;
}

export interface CodeOrderingPayload {
  description: LocalizedString;
  lines: string[];
}

export interface CodeOrderingWidget extends BaseWidget {
  type: 'code-ordering';
  payload: CodeOrderingPayload;
}

export interface CodeOrderingAnswer {
  order: number[];
}

// Discriminated Union
export type Widget = QuizWidget | CodeOrderingWidget;

export type WidgetAnswer = QuizAnswer | CodeOrderingAnswer;

// Type-safe map: widget type key -> { widget model, answer model }
// When adding a new widget type, add an entry here.
export interface WidgetModelMap {
  quiz: { widget: QuizWidget; answer: QuizAnswer };
  'code-ordering': { widget: CodeOrderingWidget; answer: CodeOrderingAnswer };
}

export interface Topic {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  tags: string[];
  difficulty: 1 | 2 | 3;
  widget_count: number;
  order: number;
}

export interface Tag {
  id: string;
  name: string;
  label: LocalizedString;
}

// Verdict (API response after submit)
export interface Verdict {
  isCorrect: boolean;
  explanation?: LocalizedString;
  correctAnswer?: unknown;
}

export interface SessionResult {
  widgetId: string;
  widgetType: WidgetType;
  answer: WidgetAnswer;
  isCorrect: boolean;
  timeSpent: number;
}

export interface SessionSummary {
  topicId: string;
  results: SessionResult[];
  totalCorrect: number;
  totalQuestions: number;
  percentage: number;
}

//  DB Row types (Supabase)
export interface WidgetRow {
  id: string;
  type: WidgetType;
  difficulty: 1 | 2 | 3;
  payload: QuizPayload | CodeOrderingPayload;
  correct_answer: unknown;
  created_at: string;
}

export interface TopicRow {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  difficulty: 1 | 2 | 3;
  order_index: number;
  created_at: string;
}

export interface TagRow {
  id: string;
  name: string;
  label: LocalizedString;
}
