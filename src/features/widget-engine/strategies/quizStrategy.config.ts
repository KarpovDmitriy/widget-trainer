import type { RegisteredStrategy } from '../types';
import { QuizComponent } from './QuizStrategy';

export const quizStrategy: RegisteredStrategy<'quiz'> = {
  type: 'quiz',
  Component: QuizComponent,
};
