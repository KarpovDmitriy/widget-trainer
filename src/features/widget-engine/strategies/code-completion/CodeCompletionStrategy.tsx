import React, { useState } from 'react';
import Button from '@shared/Button/Button';
import { useTranslation } from 'react-i18next';
import type { CodeCompletionAnswer, CodeCompletionWidget } from '@src/types/widget.types';
import type { WidgetStrategyProps } from '../../types';
import styles from './CodeCompletionStrategy.module.css';

export const CodeCompletionComponent: React.FC<WidgetStrategyProps<CodeCompletionWidget, CodeCompletionAnswer>> = ({
  widget,
  language,
  onAnswer,
  disabled,
}) => {
  const { t } = useTranslation();
  const { code, blanks, hints } = widget.payload;

  const [values, setValues] = useState<string[]>(blanks.map(() => ''));

  const handleInputChange = (index: number, val: string): void => {
    if (disabled) {
      return;
    }
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
  };

  const handleSubmit = (): void => {
    const isComplete = values.every((v) => v.trim().length > 0);
    if (!isComplete || disabled) {
      return;
    }
    onAnswer({ values });
  };

  const parts = code.split('___');

  const firstHint = hints && hints.length > 0 ? hints[0] : null;

  return (
    <div className={styles.container}>
      {firstHint && <h3 className={styles.statement}>{firstHint[language]}</h3>}

      <div className={styles.codeBox}>
        <pre className={styles.pre}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <input
                  type="text"
                  className={styles.input}
                  value={values[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  disabled={disabled}
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    width: `${Math.max(values[index]?.length || 0, 10) + 2}ch`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </pre>
      </div>

      <div className={styles.submitRow}>
        <Button variant="primary" onClick={handleSubmit} disabled={values.some((v) => !v.trim()) || disabled}>
          {t('practice.submit')}
        </Button>
      </div>
    </div>
  );
};
