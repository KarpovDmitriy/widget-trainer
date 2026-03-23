import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WidgetEngine from '@features/widget-engine/WidgetEngine';
import { PATHS } from '@shared/Constants/paths';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { usePracticeStore } from '@s/practice.store';
import type { WidgetAnswer } from '@src/types/widget.types';
import styles from './Practice.module.css';

const WIDGET_TYPE_KEYS: Record<string, ParseKeys> = {
  quiz: 'practice.quiz',
  'code-ordering': 'practice.codeOrdering',
};

const PracticePageFeature: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('ru') ? 'ru' : 'en') as 'ru' | 'en';

  const {
    widgets,
    currentIndex,
    sessionActive,
    widgetsLoading,
    submitting,
    lastVerdict,
    summary,
    startSession,
    submitAnswer,
    nextWidget,
    resetSession,
  } = usePracticeStore();

  useEffect(() => {
    if (topicId) {
      startSession(topicId);
    }
    return (): void => {
      resetSession();
    };
  }, [topicId, startSession, resetSession]);

  const currentWidget = widgets[currentIndex];
  const isLastWidget = currentIndex + 1 >= widgets.length;

  const handleAnswer = async (answer: WidgetAnswer): Promise<void> => {
    await submitAnswer(answer);
  };

  const handleNext = (): void => {
    nextWidget();
  };

  const handleRetry = (): void => {
    if (topicId) {
      resetSession();
      startSession(topicId);
    }
  };

  const handleBackToLibrary = (): void => {
    resetSession();
    navigate(PATHS.LIBRARY);
  };

  // Loading
  if (widgetsLoading) {
    return (
      <div className={styles.centeredContainer}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>{t('practice.loading')}</p>
      </div>
    );
  }

  // Summary screen
  if (summary) {
    return (
      <div className={styles.practiceContainer}>
        <div className={styles.summaryCard}>
          <h2 className={styles.summaryTitle}>{t('practice.results')}</h2>

          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>{summary.percentage}%</span>
          </div>

          <p className={styles.scoreText}>
            {t('practice.scoreText', { correct: summary.totalCorrect, total: summary.totalQuestions })}
          </p>

          <div className={styles.resultsList}>
            {summary.results.map((result, idx) => (
              <div key={idx} className={`${styles.resultItem} ${result.isCorrect ? styles.correct : styles.incorrect}`}>
                <span className={styles.resultIndex}>#{idx + 1}</span>
                <span className={styles.resultType}>{t(WIDGET_TYPE_KEYS[result.widgetType] ?? result.widgetType)}</span>
                <span className={styles.resultIcon}>{result.isCorrect ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>

          <div className={styles.summaryActions}>
            <button type="button" className={styles.retryBtn} onClick={handleRetry}>
              {t('practice.tryAgain')}
            </button>
            <button type="button" className={styles.backBtn} onClick={handleBackToLibrary}>
              {t('practice.backToLibrary')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No widgets available
  if (!sessionActive || !currentWidget) {
    return (
      <div className={styles.centeredContainer}>
        <p className={styles.emptyText}>{t('practice.empty')}</p>
        <button type="button" className={styles.backBtn} onClick={handleBackToLibrary}>
          {t('practice.backToLibrary')}
        </button>
      </div>
    );
  }

  // Active session
  return (
    <div className={styles.practiceContainer}>
      {/* Progress bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>
            {t('practice.question')} {currentIndex + 1} / {widgets.length}
          </span>
          <span className={styles.widgetTypeBadge}>
            {t(WIDGET_TYPE_KEYS[currentWidget.type] ?? currentWidget.type)}
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${((currentIndex + 1) / widgets.length) * 100}%` }} />
        </div>
      </div>

      {/* Widget card */}
      <div className={styles.widgetCard}>
        <WidgetEngine
          key={currentWidget.id}
          widget={currentWidget}
          language={lang}
          onAnswer={handleAnswer}
          disabled={submitting || lastVerdict !== null}
        />
      </div>

      {/* Feedback section */}
      {lastVerdict && (
        <div
          className={`${styles.feedbackCard} ${lastVerdict.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
        >
          <div className={styles.feedbackHeader}>
            <span className={styles.feedbackIcon}>{lastVerdict.isCorrect ? '✓' : '✗'}</span>
            <span className={styles.feedbackText}>
              {lastVerdict.isCorrect ? t('practice.correct') : t('practice.incorrect')}
            </span>
          </div>

          <button type="button" className={styles.nextBtn} onClick={handleNext}>
            {isLastWidget ? t('practice.finish') : t('practice.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticePageFeature;
