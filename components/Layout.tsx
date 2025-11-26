import React, { useState, useEffect } from 'react';
import styles from './Layout.module.css';
import Head from 'next/head';
import Dropdown from './Dropdown';

const THEMES = [
  { bg: '#e9f088', text: '#1a1a1a' },
  { bg: '#9bf6d8', text: '#4b1e7a' },
  { bg: '#4b1e7a', text: '#9bf6d8' },
  { bg: '#ffb8b1', text: '#1a1a1a' },
  { bg: '#F7E98E', text: '#1a1a1a' },
  { bg: '#B4F2E1', text: '#1a1a1a' },
  { bg: '#FFDFCC', text: '#1a1a1a' },
  { bg: '#E2B8FF', text: '#1a1a1a' },
];

type LayoutProps = {
  children: React.ReactNode;
  repos?: string[];
  selectedRepo: string;
  onRepoChange: (repo: string) => void;
};

const Layout: React.FC<LayoutProps> = ({ children, repos = [], selectedRepo, onRepoChange }) => {
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);

  useEffect(() => {
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setCurrentTheme(randomTheme);
  }, []);

  const switchTheme = () => {
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    setCurrentTheme(randomTheme);
  };

  return (
    <div className={styles.container} style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
      <Head>
        <title>Contributions</title>
        <meta name="description" content="Showcase of open source contributions" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <div className={styles.headerSpacer}></div>
        <div className={styles.logoContainer}>
          <div className={styles.logoText} style={{ color: currentTheme.text }}>
            <div className={styles.shapesContainer}>
              <span className={`${styles.shape} ${styles.shapeTriangleLeft}`} style={{ background: currentTheme.text }}></span>
              <span className={`${styles.shape} ${styles.shapeSquare}`} style={{ background: currentTheme.text }}></span>
              <span className={`${styles.shape} ${styles.shapeTriangleDown}`} style={{ background: currentTheme.text }}></span>
            </div>
            ANIKET'S CONTRIBUTIONS
          </div>
          <button
            className={styles.themeSwitcher}
            onClick={switchTheme}
            aria-label="Switch Theme"
            style={{ backgroundColor: currentTheme.text, color: currentTheme.bg }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.shuffleIcon}
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"></path>
              <path d="m18 2 4 4-4 4"></path>
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"></path>
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"></path>
              <path d="m18 14 4 4-4 4"></path>
            </svg>
          </button>
        </div>

        <div className={styles.filterRow}>
          <span className={styles.filterLabel} style={{ color: currentTheme.text }}>
            Open source contributions to
          </span>
          <Dropdown
            options={repos}
            value={selectedRepo}
            onChange={onRepoChange}
            bgColor={currentTheme.bg}
            textColor={currentTheme.text}
          />
        </div>

        <div style={{
          '--text': currentTheme.text,
          '--card-border': 'rgba(26, 26, 26, 0.8)',
        } as React.CSSProperties}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
