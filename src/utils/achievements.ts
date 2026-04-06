import { WEAK_TOPIC_THRESHOLD } from '@shared/Constants/dashboard.constants';

export type AchievementKey = 'first_perfect' | 'streak_3' | 'streak_7';

export interface Achievement {
  key: AchievementKey;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementRow {
  completed_at: string;
  percentage: number;
}

// Achievements:
// - first_perfect: first test with 100% score
// - streak_3: 3 consecutive calendar days with at least one test >= 70%
// - streak_7: 7 consecutive calendar days with at least one test >= 70%

export function computeAchievements(rows: AchievementRow[]): Achievement[] {
  const achievements: Achievement[] = [];

  // 1. First perfect score (100%)
  const firstPerfect = rows.find((r) => r.percentage === 100);
  achievements.push({
    key: 'first_perfect',
    unlocked: !!firstPerfect,
    unlockedAt: firstPerfect?.completed_at,
  });

  // 2 & 3. Streak achievements (3 days, 7 days) with >= WEAK_TOPIC_THRESHOLD%
  const qualifyingRows = rows.filter((r) => r.percentage >= WEAK_TOPIC_THRESHOLD);

  // Collect unique calendar days (UTC) - using string slice avoids Date object overhead
  const uniqueDays = new Set<string>();
  for (const row of qualifyingRows) {
    uniqueDays.add(row.completed_at.slice(0, 10));
  }

  const sortedDays = [...uniqueDays].sort();

  let maxStreak = 0;
  let currentStreak = 1;
  let streak3Date: string | undefined;
  let streak7Date: string | undefined;

  for (let i = 1; i < sortedDays.length; i++) {
    const prev = new Date(sortedDays[i - 1] + 'T00:00:00Z');
    const curr = new Date(sortedDays[i] + 'T00:00:00Z');
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    if (currentStreak >= 3 && !streak3Date) {
      streak3Date = sortedDays[i];
    }
    if (currentStreak >= 7 && !streak7Date) {
      streak7Date = sortedDays[i];
    }

    maxStreak = Math.max(maxStreak, currentStreak);
  }

  achievements.push({
    key: 'streak_3',
    unlocked: maxStreak >= 3,
    unlockedAt: streak3Date ? streak3Date + 'T00:00:00Z' : undefined,
  });

  achievements.push({
    key: 'streak_7',
    unlocked: maxStreak >= 7,
    unlockedAt: streak7Date ? streak7Date + 'T00:00:00Z' : undefined,
  });

  return achievements;
}
