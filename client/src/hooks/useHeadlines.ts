import { useEffect, useState } from 'react';
import axios from 'axios';
import { extractNumbers } from '../utils/Regex';
import { Headline } from '../types/Headline';

export const useHeadlines = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/scrape');
        console.log('📡 Response data from server:', res.data);

        const normalizedHeadlines = (res.data.headlines || []).map((h: any) => ({
          ...h,
          comments: extractNumbers(String(h.comments)),
          score: extractNumbers(String(h.score)),
        }));

        setHeadlines(normalizedHeadlines);
      } catch (err) {
        setError('Failed to fetch headlines');
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  return { headlines, loading, error };
};
