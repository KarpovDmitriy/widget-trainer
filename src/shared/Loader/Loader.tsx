import { useLoaderStore } from '@s/loader.store';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
  const isAnyLoading = useLoaderStore((s) => s.isAnyLoading);
  if (!isAnyLoading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.barView}></div>
      </div>
    </div>
  );
};
