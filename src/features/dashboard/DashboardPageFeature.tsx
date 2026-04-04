import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TestResultWithTopic, WeakTopic } from '@api/dashboard.api';
import Button from '@shared/Button/Button';
import { PATHS } from '@shared/Constants/paths';
import clsx from 'clsx';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@s/auth.store';
import { useDashboardStore } from '@s/dashboard.store';
import type { AchievementKey } from '@s/dashboard.store';
import styles from './Dashboard.module.css';

const DIFFICULTY_KEYS: Record<number, ParseKeys> = {
  1: 'dashboard.difficultyEasy',
  2: 'dashboard.difficultyMedium',
  3: 'dashboard.difficultyHard',
};

const ACHIEVEMENT_ICONS: Record<AchievementKey, string> = {
  first_perfect: '🏆',
  streak_3: '🔥',
  streak_7: '⚡',
};

const DashboardPageFeature: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language?.startsWith('ru') ? 'ru' : 'en') as 'ru' | 'en';
  const user = useAuthStore((s) => s.user);

  const {
    results,
    totalResults,
    currentPage,
    pageSize,
    loading,
    achievements,
    achievementsLoading,
    leaderboard,
    leaderboardLoading,
    weakTopics,
    weakTopicsLoading,
    fetchResults,
    setPage,
    fetchAchievements,
    fetchLeaderboard,
    fetchWeakTopics,
  } = useDashboardStore();

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalResults / pageSize)), [totalResults, pageSize]);

  useEffect(() => {
    if (user?.id) {
      fetchResults(user.id, 1);
      fetchAchievements(user.id);
      fetchLeaderboard();
      fetchWeakTopics(user.id);
    }
  }, [user?.id, fetchResults, fetchAchievements, fetchLeaderboard, fetchWeakTopics]);

  const handleRetake = (topicId: string): void => {
    navigate(PATHS.PRACTICE(topicId));
  };

  const handlePageChange = (page: number): void => {
    if (user?.id) {
      setPage(page, user.id);
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreClass = (percentage: number): string => {
    if (percentage >= 80) {
      return styles.scoreHigh;
    }
    if (percentage >= 50) {
      return styles.scoreMedium;
    }
    return styles.scoreLow;
  };

  const getTopicTitle = (result: TestResultWithTopic): string => {
    return result.topic?.title?.[lang] ?? result.topic_id;
  };

  // ─── Loading state ────────────────────────────────────────────────

  if (loading && results.length === 0) {
    return (
      <div className={styles.dashboardContainer}>
        <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
        <p className={styles.pageSubtitle}>{t('dashboard.subtitle')}</p>
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
      <p className={styles.pageSubtitle}>{t('dashboard.subtitle')}</p>

      {/* ── Achievements ── */}
      <h2 className={styles.sectionTitle}>{t('dashboard.achievementsTitle')}</h2>
      {achievementsLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <div className={styles.achievementsGrid}>
          {achievements.map((ach) => (
            <div
              key={ach.key}
              className={clsx(styles.achievementCard, {
                [styles.achievementUnlocked]: ach.unlocked,
                [styles.achievementLocked]: !ach.unlocked,
              })}
            >
              <div className={styles.achievementIcon}>{ACHIEVEMENT_ICONS[ach.key]}</div>
              <div className={styles.achievementInfo}>
                <span className={styles.achievementName}>{t(`dashboard.achievements.${ach.key}` as ParseKeys)}</span>
                <span className={styles.achievementDesc}>
                  {t(`dashboard.achievements.${ach.key}_desc` as ParseKeys)}
                </span>
                <span className={styles.achievementBadge}>
                  {ach.unlocked ? t('dashboard.achievements.unlocked') : t('dashboard.achievements.locked')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Weak Topics ── */}
      <div className={styles.weakTopicsSection}>
        <h2 className={styles.sectionTitle}>{t('dashboard.weakTopicsTitle')}</h2>
        {weakTopicsLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
          </div>
        ) : weakTopics.length === 0 ? (
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
                      onClick={() => handleRetake(wt.topic_id)}
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

      {/* ── Leaderboard ── */}
      <h2 className={styles.sectionTitle}>{t('dashboard.leaderboardTitle')}</h2>
      {leaderboardLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      ) : leaderboard.length === 0 ? (
        <div className={clsx(styles.leaderboardWrapper, styles.leaderboardEmptyState)}>
          {t('dashboard.leaderboard.empty')}
        </div>
      ) : (
        <div className={styles.leaderboardWrapper}>
          <table className={styles.leaderboardTable}>
            <thead>
              <tr>
                <th>{t('dashboard.leaderboard.rank')}</th>
                <th>{t('dashboard.leaderboard.user')}</th>
                <th>{t('dashboard.leaderboard.tests')}</th>
                <th>{t('dashboard.leaderboard.avgScore')}</th>
                <th>{t('dashboard.leaderboard.bestScore')}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => {
                const isMe = entry.user_id === user?.id;
                const rankClass =
                  idx === 0 ? styles.rankGold : idx === 1 ? styles.rankSilver : idx === 2 ? styles.rankBronze : '';
                return (
                  <tr key={entry.user_id} className={clsx({ [styles.isCurrentUser]: isMe })}>
                    <td className={clsx(styles.rankCell, rankClass)}>{idx + 1}</td>
                    <td className={styles.userCell}>
                      {entry.display_name}
                      {isMe && <span className={styles.youTag}>{t('dashboard.leaderboard.you')}</span>}
                    </td>
                    <td>{entry.tests_taken}</td>
                    <td className={styles.leaderboardScore}>{entry.avg_score}%</td>
                    <td>{entry.best_score}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Test History ── */}
      <h2 className={styles.sectionTitle}>{t('dashboard.historyTitle')}</h2>

      {totalResults === 0 && !loading ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <p className={styles.emptyText}>{t('dashboard.noResults')}</p>
          <Button variant="primary" onClick={() => navigate(PATHS.LIBRARY)}>
            {t('dashboard.goToLibrary')}
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className={styles.tableWrapper}>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>{t('dashboard.date')}</th>
                  <th>{t('dashboard.topic')}</th>
                  <th>{t('dashboard.difficulty')}</th>
                  <th>{t('dashboard.score')}</th>
                  <th>{t('dashboard.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className={styles.dateCell}>{formatDate(result.completed_at)}</td>
                    <td className={styles.topicName}>{getTopicTitle(result)}</td>
                    <td>
                      <span className={styles.difficultyBadge} data-difficulty={result.topic?.difficulty ?? 1}>
                        {t(DIFFICULTY_KEYS[result.topic?.difficulty ?? 1])}
                      </span>
                    </td>
                    <td>
                      <span className={clsx(styles.scoreBadge, getScoreClass(result.percentage))}>
                        {result.percentage}%
                        <span className={styles.scoreDetail}>
                          {t('dashboard.correct', {
                            correct: result.total_correct,
                            total: result.total_questions,
                          })}
                        </span>
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        className={styles.retakeBtn}
                        onClick={() => handleRetake(result.topic_id)}
                      >
                        {t('dashboard.retake')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className={styles.mobileCards}>
            {results.map((result) => (
              <div key={result.id} className={styles.mobileCard}>
                <div className={styles.mobileCardHeader}>
                  <span className={styles.topicName}>{getTopicTitle(result)}</span>
                  <span className={styles.difficultyBadge} data-difficulty={result.topic?.difficulty ?? 1}>
                    {t(DIFFICULTY_KEYS[result.topic?.difficulty ?? 1])}
                  </span>
                </div>
                <div className={styles.mobileCardBody}>
                  <span className={clsx(styles.scoreBadge, getScoreClass(result.percentage))}>
                    {result.percentage}%
                  </span>
                  <span className={styles.dateCell}>{formatDate(result.completed_at)}</span>
                </div>
                <div className={styles.mobileCardFooter}>
                  <span className={styles.scoreDetail}>
                    {t('dashboard.correct', {
                      correct: result.total_correct,
                      total: result.total_questions,
                    })}
                  </span>
                  <Button
                    variant="secondary"
                    className={styles.retakeBtn}
                    onClick={() => handleRetake(result.topic_id)}
                  >
                    {t('dashboard.retake')}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationBtn}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {t('dashboard.prev')}
              </button>
              <span className={styles.paginationInfo}>
                {t('dashboard.page')} {currentPage} {t('dashboard.of')} {totalPages}
              </span>
              <button
                className={styles.paginationBtn}
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {t('dashboard.next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPageFeature;
