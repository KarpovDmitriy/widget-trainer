import React, { useCallback, useMemo, useRef, useState } from 'react';
import Button from '@shared/Button/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { CodeOrderingAnswer, CodeOrderingWidget } from '@src/types/widget.types';
import type { WidgetStrategyProps } from '../../types';
import styles from './CodeOrderingStrategy.module.css';

// Shuffles an array using Fisher-Yates, returns new array
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const CodeOrderingComponent: React.FC<WidgetStrategyProps<CodeOrderingWidget, CodeOrderingAnswer>> = ({
  widget,
  language,
  onAnswer,
  disabled,
}) => {
  const { t } = useTranslation();
  const lines = widget.payload.lines;

  const initialOrder = useMemo(() => {
    const indices = lines.map((_, i) => i);
    return shuffleArray(indices);
  }, [lines]);

  const [order, setOrder] = useState<number[]>(initialOrder);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = useCallback(
    (position: number) => {
      if (disabled) {
        return;
      }
      dragItem.current = position;
    },
    [disabled],
  );

  const handleDragEnter = useCallback(
    (position: number) => {
      if (disabled) {
        return;
      }
      dragOverItem.current = position;
    },
    [disabled],
  );

  const handleDragEnd = useCallback(() => {
    if (disabled) {
      return;
    }
    if (dragItem.current === null || dragOverItem.current === null) {
      return;
    }
    if (dragItem.current === dragOverItem.current) {
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }

    setOrder((prev) => {
      const updated = [...prev];
      const draggedItemValue = updated[dragItem.current!];
      updated.splice(dragItem.current!, 1);
      updated.splice(dragOverItem.current!, 0, draggedItemValue);
      return updated;
    });

    dragItem.current = null;
    dragOverItem.current = null;
  }, [disabled]);

  const moveItem = useCallback(
    (fromIndex: number, direction: 'up' | 'down') => {
      if (disabled) {
        return;
      }
      const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
      if (toIndex < 0 || toIndex >= order.length) {
        return;
      }

      setOrder((prev) => {
        const updated = [...prev];
        [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
        return updated;
      });
    },
    [disabled, order.length],
  );

  const handleSubmit = (): void => {
    if (disabled) {
      return;
    }
    onAnswer({ order });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.description}>{widget.payload.description[language]}</h3>

      <div className={styles.linesContainer}>
        {order.map((originalIndex, position) => (
          <div
            key={originalIndex}
            className={clsx(styles.lineItem, { [styles.lineDisabled]: disabled })}
            draggable={!disabled}
            onDragStart={() => handleDragStart(position)}
            onDragEnter={() => handleDragEnter(position)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            <span className={styles.lineNumber}>{position + 1}</span>
            <code className={styles.lineCode}>{lines[originalIndex]}</code>
            <div className={styles.lineControls}>
              <button
                type="button"
                className={styles.moveBtn}
                onClick={() => moveItem(position, 'up')}
                disabled={disabled || position === 0}
                aria-label="Move up"
              >
                ▲
              </button>
              <button
                type="button"
                className={styles.moveBtn}
                onClick={() => moveItem(position, 'down')}
                disabled={disabled || position === order.length - 1}
                aria-label="Move down"
              >
                ▼
              </button>
              <span className={styles.dragHandle} aria-hidden="true">
                ≡
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.submitRow}>
        <Button variant="primary" onClick={handleSubmit} disabled={disabled}>
          {t('practice.submit')}
        </Button>
      </div>
    </div>
  );
};
