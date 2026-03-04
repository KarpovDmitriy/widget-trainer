import React from 'react';
import { authContent } from '../../../locales/en/auth';
import styles from './AuthInfo.module.css';

const HeaderAuth: React.FC = () => {
  const { aside } = authContent;

  return (
    <div className={styles.authAside}>
      <h1>{aside.title}</h1>
      <div className={styles.authAsideContent}>
        <h2>{aside.subtitle}</h2>
        <p className={styles.authAsideDescription}>{aside.description}</p>

        <ul className={styles.authAsideFeatures}>
          {aside.features.map((feature, index) => (
            <li key={index}>
              <strong>{feature.label}</strong> {feature.text}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.authAsideFooter}>
        <span>{aside.footer}</span>
      </div>
    </div>
  );
};

export default HeaderAuth;
