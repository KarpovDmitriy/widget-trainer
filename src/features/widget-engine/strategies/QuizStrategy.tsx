import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { QuizAnswer, QuizWidget } from '@src/types/widget.types';
import type { WidgetStrategyProps } from '../types';
import styles from './QuizStrategy.module.css';

const QuizComponent: React.FC<WidgetStrategyProps<QuizWidget, QuizAnswer>> = ({
  widget,
  language,
  onAnswer,
  disabled,
}) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number): void => {
    if (disabled) {
      return;
    }
    setSelectedIndex(index);
  };

  const handleSubmit = (): void => {
    if (selectedIndex === null || disabled) {
      return;
    }
    onAnswer({ selectedIndex });
  };

  return (
    <div className={styles.quizContainer}>
      <h3 className={styles.question}>{widget.payload.question[language]}</h3>

      <div className={styles.optionsList}>
        {widget.payload.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.optionItem} ${selectedIndex === index ? styles.optionSelected : ''}`}
            onClick={() => handleSelect(index)}
            disabled={disabled}
          >
            <span className={`${styles.radio} ${selectedIndex === index ? styles.radioChecked : ''}`}>
              {selectedIndex === index && <span className={styles.radioDot} />}
            </span>
            <span className={styles.optionText}>{option[language]}</span>
          </button>
        ))}
      </div>

      <div className={styles.submitRow}>
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={selectedIndex === null || disabled}
        >
          {t('practice.submit')}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
