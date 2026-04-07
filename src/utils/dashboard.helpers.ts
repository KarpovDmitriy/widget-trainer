import { SCORE_THRESHOLD_HIGH, SCORE_THRESHOLD_MEDIUM } from '@shared/Constants/dashboard.constants';

type Lang = 'ru' | 'en';

export const formatDate = (dateStr: string, lang: Lang): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getScoreClass = (
  percentage: number,
  classes: { scoreHigh: string; scoreMedium: string; scoreLow: string },
): string => {
  if (percentage >= SCORE_THRESHOLD_HIGH) {
    return classes.scoreHigh;
  }
  if (percentage >= SCORE_THRESHOLD_MEDIUM) {
    return classes.scoreMedium;
  }
  return classes.scoreLow;
};

export const getTopicTitle = (
  topic: { title: { ru: string; en: string } } | null,
  fallback: string,
  lang: Lang,
): string => {
  return topic?.title?.[lang] ?? fallback;
};
