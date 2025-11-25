import React, { useEffect, useState } from "react";
import { fetchContributions } from "../lib/github";
import Layout from "../components/Layout";
import ContributionCard from "../components/ContributionCard";
import styles from "../styles/Home.module.css";

type Contribution = {
  type: string;
  action?: string;
  repo: string;
  title?: string;
  url?: string;
  date: string;
  message?: string;
};

function groupByType(contributions: Contribution[]) {
  return contributions.reduce((acc, c) => {
    acc[c.type] = acc[c.type] || [];
    acc[c.type].push(c);
    return acc;
  }, {} as Record<string, Contribution[]>);
}

export default function Contributions() {
  const USERNAME = "aniketpatidar";
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchContributions(USERNAME);

        const codeContributions = data.filter(c =>
          c.type === 'Pull Request' || c.type === 'Commit'
        );

        if (codeContributions.length > 0) {
          setContributions(codeContributions);
        }
      } catch (e: any) {
        console.error(e);
        if (e.message.includes('403')) {
          setError('GitHub API rate limit exceeded. Please try again later.');
        } else {
          setError('Failed to load contributions.');
        }
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const uniqueRepos = Array.from(new Set(contributions.map(c => c.repo)));

  const filteredContributions = selectedRepo === "all"
    ? contributions
    : contributions.filter(c => c.repo === selectedRepo);

  const grouped = groupByType(filteredContributions);
  const totalContributions = filteredContributions.length;

  return (
    <Layout repos={uniqueRepos} selectedRepo={selectedRepo} onRepoChange={setSelectedRepo}>
      <div className={styles.stats}>
        {loading ? 'Loading contributions...' : error ? <span style={{ color: '#d32f2f' }}>{error}</span> : `${totalContributions} contributions available`}
      </div>

      {Object.entries(grouped).map(([type, arr]) => (
        <div key={type}>
          <div className={styles.grid} style={{ marginBottom: '3rem' }}>
            {arr.map((c, i) => (
              <ContributionCard
                key={i}
                title={c.title || c.message || 'No description'}
                repo={c.repo}
                type={c.type}
                date={c.date}
                url={c.url || '#'}
              />
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}
