import React from 'react';
import type { Achievement, AchievementKey } from '@utils/achievements';
import clsx from 'clsx';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';

const ACHIEVEMENT_ICONS: Record<AchievementKey, string> = {
  first_perfect: '🏆',
  streak_3: '🔥',
  streak_7: '⚡',
};

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.sectionTitle}>{t('dashboard.achievementsTitle')}</h2>
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
              <span className={styles.achievementDesc}>{t(`dashboard.achievements.${ach.key}_desc` as ParseKeys)}</span>
              <span className={styles.achievementBadge}>
                {ach.unlocked ? t('dashboard.achievements.unlocked') : t('dashboard.achievements.locked')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AchievementsSection;
