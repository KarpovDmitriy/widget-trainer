import type { ReactNode } from 'react';
import type { Widget, WidgetAnswer, WidgetModelMap } from '@src/types/widget.types';
import styles from './WidgetEngine.module.css';
import { getStrategy } from './registry';
import type { WidgetStrategyProps } from './types';

interface WidgetEngineProps<W extends Widget, A extends WidgetAnswer> {
  widget: W;
  language: 'ru' | 'en';
  onAnswer: (answer: A) => void;
  disabled: boolean;
}

// Widget Engine - loads the correct strategy for a given widget and renders its component.
// No switch/case: pure strategy dispatch.

export const WidgetEngine = <K extends keyof WidgetModelMap>({
  widget,
  language,
  onAnswer,
  disabled,
}: WidgetEngineProps<WidgetModelMap[K]['widget'], WidgetModelMap[K]['answer']>): ReactNode => {
  const strategy = getStrategy(widget.type);

  if (!strategy) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          Unknown widget type: <strong>{widget.type}</strong>
        </p>
      </div>
    );
  }

  // Safe cast: at runtime the strategy.Component always matches the widget.type,
  // but TS can't narrow a discriminated union through a Map lookup.
  const Component = strategy.Component as React.FC<WidgetStrategyProps>;

  return (
    <div className={styles.engineContainer}>
      <Component widget={widget} language={language} onAnswer={onAnswer} disabled={disabled} />
    </div>
  );
};
