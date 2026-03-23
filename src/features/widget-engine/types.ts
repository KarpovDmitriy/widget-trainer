import type React from 'react';
import type { BaseWidget, WidgetAnswer } from '@src/types/widget.types';

//  Strategy interface - every widget type must implement this contract.
//
//  Generic params:
//  W - specific widget type (extends BaseWidget)
//  A - the answer shape this widget produces (extends WidgetAnswer)

export interface WidgetStrategy<W extends BaseWidget = BaseWidget, A extends WidgetAnswer = WidgetAnswer> {
  // Matches the `type` field of the widget JSON
  type: W['type'];

  // React component that renders the interactive widget
  Component: React.FC<WidgetStrategyProps<W, A>>;
}

// Props every widget component receives from the engine
export interface WidgetStrategyProps<W extends BaseWidget = BaseWidget, A extends WidgetAnswer = WidgetAnswer> {
  widget: W;
  language: 'ru' | 'en';
  onAnswer: (answer: A) => void;
  disabled: boolean;
}
