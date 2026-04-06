import React from 'react';
import type { LeaderboardEntry } from '@api/dashboard.api';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './Dashboard.module.css';

interface LeaderboardSectionProps {
  leaderboard: LeaderboardEntry[];
  currentUserId?: string;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ leaderboard, currentUserId }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2 className={styles.sectionTitle}>{t('dashboard.leaderboardTitle')}</h2>
      {leaderboard.length === 0 ? (
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
                const isMe = entry.user_id === currentUserId;
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
    </>
  );
};

export default LeaderboardSection;
