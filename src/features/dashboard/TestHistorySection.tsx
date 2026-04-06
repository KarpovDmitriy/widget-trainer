import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TestResultWithTopic } from '@api/dashboard.api';
import Button from '@shared/Button/Button';
import { PATHS } from '@shared/Constants/paths';
import { formatDate, getScoreClass, getTopicTitle } from '@utils/dashboard.helpers';
import clsx from 'clsx';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';

const DIFFICULTY_KEYS: Record<number, ParseKeys> = {
  1: 'dashboard.difficultyEasy',
  2: 'dashboard.difficultyMedium',
  3: 'dashboard.difficultyHard',
};

interface TestHistorySectionProps {
  results: TestResultWithTopic[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
  lang: 'ru' | 'en';
  onPageChange: (page: number) => void;
}

const scoreClasses = {
  scoreHigh: styles.scoreHigh,
  scoreMedium: styles.scoreMedium,
  scoreLow: styles.scoreLow,
};

const TestHistorySection: React.FC<TestHistorySectionProps> = ({
  results,
  totalResults,
  currentPage,
  pageSize,
  lang,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalResults / pageSize)), [totalResults, pageSize]);

  const handleRetake = (topicId: string): void => {
    navigate(PATHS.PRACTICE(topicId));
  };

  if (totalResults === 0) {
    return (
      <>
        <h2 className={styles.sectionTitle}>{t('dashboard.historyTitle')}</h2>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <p className={styles.emptyText}>{t('dashboard.noResults')}</p>
          <Button variant="primary" onClick={() => navigate(PATHS.LIBRARY)}>
            {t('dashboard.goToLibrary')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className={styles.sectionTitle}>{t('dashboard.historyTitle')}</h2>

      <div className={styles.historyList}>
        <div className={clsx(styles.historyItem, styles.historyHeader)}>
          <span className={styles.historyColDate}>{t('dashboard.date')}</span>
          <span className={styles.historyColTopic}>{t('dashboard.topic')}</span>
          <span className={styles.historyColDifficulty}>{t('dashboard.difficulty')}</span>
          <span className={styles.historyColScore}>{t('dashboard.score')}</span>
          <span className={styles.historyColAction}>{t('dashboard.actions')}</span>
        </div>

        {results.map((result) => (
          <div key={result.id} className={styles.historyItem}>
            <span className={clsx(styles.historyColDate, styles.dateCell)}>
              {formatDate(result.completed_at, lang)}
            </span>
            <span className={clsx(styles.historyColTopic, styles.topicName)}>
              {getTopicTitle(result.topic, result.topic_id, lang)}
            </span>
            <span className={styles.historyColDifficulty}>
              <span className={styles.difficultyBadge} data-difficulty={result.topic?.difficulty ?? 1}>
                {t(DIFFICULTY_KEYS[result.topic?.difficulty ?? 1])}
              </span>
            </span>
            <span className={styles.historyColScore}>
              <span className={clsx(styles.scoreBadge, getScoreClass(result.percentage, scoreClasses))}>
                {result.percentage}%
                <span className={styles.scoreDetail}>
                  {t('dashboard.correct', {
                    correct: result.total_correct,
                    total: result.total_questions,
                  })}
                </span>
              </span>
            </span>
            <span className={styles.historyColAction}>
              <Button variant="secondary" className={styles.retakeBtn} onClick={() => handleRetake(result.topic_id)}>
                {t('dashboard.retake')}
              </Button>
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {t('dashboard.prev')}
          </button>
          <span className={styles.paginationInfo}>
            {t('dashboard.page')} {currentPage} {t('dashboard.of')} {totalPages}
          </span>
          <button
            className={styles.paginationBtn}
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {t('dashboard.next')}
          </button>
        </div>
      )}
    </>
  );
};

export default TestHistorySection;
