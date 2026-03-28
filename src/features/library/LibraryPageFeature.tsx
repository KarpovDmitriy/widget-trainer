import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTags } from '@api/widget.api';
import BaseSelect from '@shared/BaseSelect/BaseSelect';
import { PATHS } from '@shared/Constants/paths';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { usePracticeStore } from '@s/practice.store';
import type { Tag, Topic } from '@src/types/widget.types';
import styles from './Library.module.css';

const DIFFICULTY_KEYS: Record<number, ParseKeys> = {
  1: 'library.difficultyEasy',
  2: 'library.difficultyMedium',
  3: 'library.difficultyHard',
};

const LibraryPageFeature: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language?.startsWith('ru') ? 'ru' : 'en') as 'ru' | 'en';

  const { topics, topicsLoading, fetchTopics } = usePracticeStore();

  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);

  useEffect(() => {
    fetchTopics();
    getTags().then(({ data }) => {
      if (data) {
        setTags(data);
      }
    });
  }, [fetchTopics]);

  const filteredTopics = useMemo(() => {
    let result = topics;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item: Topic) =>
          item.title[lang].toLowerCase().includes(q) ||
          item.description[lang].toLowerCase().includes(q) ||
          item.tags.some((tag: string) => tag.toLowerCase().includes(q)),
      );
    }

    if (selectedTag) {
      result = result.filter((item: Topic) => item.tags.includes(selectedTag));
    }

    if (selectedDifficulty > 0) {
      result = result.filter((item: Topic) => item.difficulty === selectedDifficulty);
    }

    return result;
  }, [topics, searchQuery, selectedTag, selectedDifficulty, lang]);

  const handleStart = useCallback(
    (topicId: string) => {
      navigate(PATHS.PRACTICE(topicId));
    },
    [navigate],
  );

  return (
    <div className={styles.libraryContainer}>
      <h1 className={styles.pageTitle}>{t('library.title')}</h1>
      <p className={styles.pageSubtitle}>{t('library.subtitle')}</p>

      {/* Filters */}
      <div className={styles.filtersRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={t('library.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <BaseSelect value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">{t('library.allTags')}</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.label[lang]}
            </option>
          ))}
        </BaseSelect>

        <BaseSelect value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(Number(e.target.value))}>
          <option value={0}>{t('library.allLevels')}</option>
          <option value={1}>{t('library.difficultyEasy')}</option>
          <option value={2}>{t('library.difficultyMedium')}</option>
          <option value={3}>{t('library.difficultyHard')}</option>
        </BaseSelect>
      </div>

      {/* Loading */}
      {topicsLoading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>{t('library.loading')}</p>
        </div>
      )}

      {/* Empty state */}
      {!topicsLoading && filteredTopics.length === 0 && (
        <div className={styles.emptyState}>
          <p>{t('library.empty')}</p>
        </div>
      )}

      {/* Topic cards */}
      <div className={styles.topicsGrid}>
        {filteredTopics.map((topic: Topic) => (
          <div key={topic.id} className={styles.topicCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{topic.title[lang]}</h3>
              <span className={styles.difficultyBadge} data-difficulty={topic.difficulty}>
                {t(DIFFICULTY_KEYS[topic.difficulty])}
              </span>
            </div>

            <p className={styles.cardDescription}>{topic.description[lang]}</p>

            <div className={styles.cardTags}>
              {topic.tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.widgetCount}>
                {topic.widget_count} {t('library.questions')}
              </span>
              <button type="button" className={styles.startBtn} onClick={() => handleStart(topic.id)}>
                {t('library.start')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPageFeature;
