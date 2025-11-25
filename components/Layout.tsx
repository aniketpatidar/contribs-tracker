import React from 'react';
import styles from './Layout.module.css';
import Head from 'next/head';
import Dropdown from './Dropdown';

const THEME = {
  bg: '#e9f088',
  text: '#1a1a1a',
};

type LayoutProps = {
  children: React.ReactNode;
  repos?: string[];
  selectedRepo: string;
  onRepoChange: (repo: string) => void;
};

const Layout: React.FC<LayoutProps> = ({ children, repos = [], selectedRepo, onRepoChange }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: THEME.bg, color: THEME.text }}>
      <Head>
        <title>Contributions</title>
        <meta name="description" content="Showcase of open source contributions" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <div className={styles.headerSpacer}></div>
        <div className={styles.logoContainer}>
          <div className={styles.logoText} style={{ color: THEME.text }}>
            <div className={styles.shapesContainer}>
              <span className={`${styles.shape} ${styles.shapeTriangleLeft}`} style={{ background: THEME.text }}></span>
              <span className={`${styles.shape} ${styles.shapeSquare}`} style={{ background: THEME.text }}></span>
              <span className={`${styles.shape} ${styles.shapeTriangleDown}`} style={{ background: THEME.text }}></span>
            </div>
            ANIKET'S CONTRIBUTIONS
          </div>
        </div>

        <div className={styles.filterRow}>
          <span className={styles.filterLabel} style={{ color: THEME.text }}>
            Open source contributions to
          </span>
          <Dropdown
            options={repos}
            value={selectedRepo}
            onChange={onRepoChange}
          />
        </div>

        <div style={{
          '--text': THEME.text,
          '--card-border': 'rgba(26, 26, 26, 0.8)',
        } as React.CSSProperties}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
export { THEME };
