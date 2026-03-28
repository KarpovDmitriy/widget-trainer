import type React from 'react';
import type { BaseWidget, WidgetAnswer, WidgetModelMap } from '@src/types/widget.types';

// Type-safe strategy for a specific widget type key.
// Replaces the old WidgetStrategy<any, any> - no eslint-disable needed.
export type RegisteredStrategy<K extends keyof WidgetModelMap> = {
  type: K;
  Component: React.FC<WidgetStrategyProps<WidgetModelMap[K]['widget'], WidgetModelMap[K]['answer']>>;
};

// Union of all registered strategies - used as the Map value type.
export type AnyWidgetStrategy = {
  [K in keyof WidgetModelMap]: RegisteredStrategy<K>;
}[keyof WidgetModelMap];

// Props every widget component receives from the engine
export interface WidgetStrategyProps<W extends BaseWidget = BaseWidget, A extends WidgetAnswer = WidgetAnswer> {
  widget: W;
  language: 'ru' | 'en';
  onAnswer: (answer: A) => void;
  disabled: boolean;
}
