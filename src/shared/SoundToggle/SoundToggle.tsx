import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSoundStore } from '@s/sound.store';
import ui from './SoundToggle.module.css';

export const SoundToggle: React.FC = (): React.JSX.Element => {
  const { isSoundEnabled, toggleSound } = useSoundStore();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={ui.soundBtn}
      aria-label={t('header.sound.toggle')}
      title={isSoundEnabled ? t('header.sound.on') : t('header.sound.off')}
    >
      {isSoundEnabled ? '🔊' : '🔇'}
    </button>
  );
};
