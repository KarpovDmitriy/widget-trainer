import React from 'react';
import type { Widget, WidgetAnswer } from '@src/types/widget.types';
import styles from './WidgetEngine.module.css';
import { getStrategy } from './registry';

interface WidgetEngineProps {
  widget: Widget;
  language: 'ru' | 'en';
  onAnswer: (answer: WidgetAnswer) => void;
  disabled: boolean;
}

// Widget Engine - loads the correct strategy for a given widget and renders its component. No switch/case: pure strategy dispatch.

const WidgetEngine: React.FC<WidgetEngineProps> = ({ widget, language, onAnswer, disabled }) => {
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

  const { Component } = strategy;

  return (
    <div className={styles.engineContainer}>
      <Component widget={widget} language={language} onAnswer={onAnswer} disabled={disabled} />
    </div>
  );
};

export default WidgetEngine;
