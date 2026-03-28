import type { RegisteredStrategy } from '../types';
import { CodeOrderingComponent } from './CodeOrderingStrategy';

export const codeOrderingStrategy: RegisteredStrategy<'code-ordering'> = {
  type: 'code-ordering',
  Component: CodeOrderingComponent,
};
