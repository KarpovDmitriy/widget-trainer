import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import type { Achievement } from '@utils/achievements';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@s/auth.store';
import { useDashboardStore } from '@s/dashboard.store';
import { SoundService } from '@src/lib/soundService';
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

  // Sound: play "level up" when newly unlocked achievements are detected
  const prevAchievementsRef = useRef<Achievement[]>([]);
  useEffect(() => {
    if (achievements.length === 0) {
      return;
    }

    const prev = prevAchievementsRef.current;
    // Only compare once we already have a previous snapshot (not on first load)
    if (prev.length > 0) {
      const prevUnlockedKeys = new Set(prev.filter((a) => a.unlocked).map((a) => a.key));
      const hasNewUnlock = achievements.some((a) => a.unlocked && !prevUnlockedKeys.has(a.key));
      if (hasNewUnlock) {
        SoundService.playAchievement();
      }
    }
    prevAchievementsRef.current = achievements;
  }, [achievements]);

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
