import React, { useState } from 'react';
import Button from '@shared/Button/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { TrueFalseAnswer, TrueFalseWidget } from '@src/types/widget.types';
import type { WidgetStrategyProps } from '../../types';
import styles from './TrueFalseStrategy.module.css';

export const TrueFalseComponent: React.FC<WidgetStrategyProps<TrueFalseWidget, TrueFalseAnswer>> = ({
  widget,
  language,
  onAnswer,
  disabled,
}) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<boolean | null>(null);

  const handleSelect = (value: boolean): void => {
    if (disabled) {
      return;
    }
    setSelected(value);
  };

  const handleSubmit = (): void => {
    if (selected === null || disabled) {
      return;
    }
    onAnswer({ isTrue: selected });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.statement}>{widget.payload.statement[language]}</h3>

      <div className={styles.options}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => handleSelect(true)}
          disabled={disabled}
          className={clsx(styles.optionButton, {
            [styles.activeOption]: selected === true,
          })}
        >
          <span>✓</span>
          <span>{t('practice.true')}</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => handleSelect(false)}
          disabled={disabled}
          className={clsx(styles.optionButton, {
            [styles.activeOption]: selected === false,
          })}
        >
          <span className={styles.icon}>✕</span>
          <span className={styles.optionText}>{t('practice.false')}</span>
        </Button>
      </div>

      <div className={styles.submitRow}>
        <Button variant="primary" onClick={handleSubmit} disabled={selected === null || disabled}>
          {t('practice.submit')}
        </Button>
      </div>
    </div>
  );
};
