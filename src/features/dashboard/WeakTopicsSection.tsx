import React from 'react';
import type { WeakTopic } from '@api/dashboard.api';
import Button from '@shared/Button/Button';
import clsx from 'clsx';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';

const DIFFICULTY_KEYS: Record<number, ParseKeys> = {
  1: 'dashboard.difficultyEasy',
  2: 'dashboard.difficultyMedium',
  3: 'dashboard.difficultyHard',
};

interface WeakTopicsSectionProps {
  weakTopics: WeakTopic[];
  lang: 'ru' | 'en';
  onPractice: (topicId: string) => void;
}

const WeakTopicsSection: React.FC<WeakTopicsSectionProps> = ({ weakTopics, lang, onPractice }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.weakTopicsSection}>
      <h2 className={styles.sectionTitle}>{t('dashboard.weakTopicsTitle')}</h2>
      {weakTopics.length === 0 ? (
        <div className={styles.weakTopicsEmptyState}>
          <span className={styles.weakTopicsEmptyIcon}>✅</span>
          <span className={styles.weakTopicsEmptyText}>{t('dashboard.weakTopics.empty')}</span>
        </div>
      ) : (
        <>
          <p className={styles.weakTopicsHint}>{t('dashboard.weakTopics.threshold')}</p>
          <div className={styles.weakTopicsGrid}>
            {weakTopics.map((wt: WeakTopic) => (
              <div key={wt.topic_id} className={styles.weakTopicCard}>
                <div className={styles.weakTopicWarning}>⚠️</div>
                <div className={styles.weakTopicInfo}>
                  <span className={styles.weakTopicName}>{wt.topic_title[lang]}</span>
                  <div className={styles.weakTopicStats}>
                    <span className={clsx(styles.weakTopicStat, styles.weakTopicAvg)}>
                      {t('dashboard.weakTopics.avgScore', { score: wt.avg_score })}
                    </span>
                    <span className={styles.weakTopicStat}>
                      {t('dashboard.weakTopics.lastScore', { score: wt.last_score })}
                    </span>
                    <span className={styles.weakTopicStat}>
                      {t('dashboard.weakTopics.attempts', { count: wt.attempts })}
                    </span>
                    <span className={styles.difficultyBadge} data-difficulty={wt.topic_difficulty}>
                      {t(DIFFICULTY_KEYS[wt.topic_difficulty])}
                    </span>
                  </div>
                </div>
                <div className={styles.weakTopicAction}>
                  <Button
                    variant="primary"
                    className={styles.weakTopicPracticeBtn}
                    onClick={() => onPractice(wt.topic_id)}
                  >
                    {t('dashboard.practice')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeakTopicsSection;
