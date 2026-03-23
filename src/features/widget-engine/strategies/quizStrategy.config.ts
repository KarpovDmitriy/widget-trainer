import type { QuizAnswer, QuizWidget } from '@src/types/widget.types';
import type { WidgetStrategy } from '../types';
import QuizComponent from './QuizStrategy';

export const quizStrategy: WidgetStrategy<QuizWidget, QuizAnswer> = {
  type: 'quiz',
  Component: QuizComponent,
};
