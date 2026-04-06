import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@s/auth.store';
import { useDashboardStore } from '@s/dashboard.store';
import AchievementsSection from './AchievementsSection';
import styles from './Dashboard.module.css';
import LeaderboardSection from './LeaderboardSection';
import TestHistorySection from './TestHistorySection';
import WeakTopicsSection from './WeakTopicsSection';

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
    achievements,
    leaderboard,
    weakTopics,
    initialLoaded,
    fetchAll,
    setPage,
  } = useDashboardStore();

  useEffect(() => {
    if (user?.id) {
      fetchAll(user.id);
    }
  }, [user?.id, fetchAll]);

  const handlePageChange = (page: number): void => {
    if (user?.id) {
      setPage(page, user.id);
    }
  };

  const handlePractice = (topicId: string): void => {
    navigate(PATHS.PRACTICE(topicId));
  };

  if (!initialLoaded) {
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

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
      <p className={styles.pageSubtitle}>{t('dashboard.subtitle')}</p>

      <AchievementsSection achievements={achievements} />

      <WeakTopicsSection weakTopics={weakTopics} lang={lang} onPractice={handlePractice} />

      <LeaderboardSection leaderboard={leaderboard} currentUserId={user?.id} />

      <TestHistorySection
        results={results}
        totalResults={totalResults}
        currentPage={currentPage}
        pageSize={pageSize}
        lang={lang}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DashboardPageFeature;
