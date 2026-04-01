import type { RegisteredStrategy } from '../../types';
import { CodeCompletionComponent } from './CodeCompletionStrategy';

export const codeCompletionStrategy: RegisteredStrategy<'code-completion'> = {
  type: 'code-completion',
  Component: CodeCompletionComponent,
};
