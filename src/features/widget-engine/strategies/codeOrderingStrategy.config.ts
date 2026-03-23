import type { CodeOrderingAnswer, CodeOrderingWidget } from '@src/types/widget.types';
import type { WidgetStrategy } from '../types';
import CodeOrderingComponent from './CodeOrderingStrategy';

export const codeOrderingStrategy: WidgetStrategy<CodeOrderingWidget, CodeOrderingAnswer> = {
  type: 'code-ordering',
  Component: CodeOrderingComponent,
};
