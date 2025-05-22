import { useEffect, useState } from 'react';

export interface Headline {
  title: string;
  link: string;
}

export function useHeadlines() {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/scrape')
      .then(res => res.json())
      .then(data => {
        setHeadlines(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch headlines');
        setLoading(false);
      });
  }, []);

  return { headlines, loading, error };
}