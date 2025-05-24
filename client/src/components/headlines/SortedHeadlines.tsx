import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHeadlines } from '../../hooks/useHeadlines';
import HeadlineList from './HeadlineList';
import './SortedHeadlines.scss';
import ExportUsageButton from '../usage/ExportUsage';
const SortedHeadlines: React.FC = () => {
  const { headlines, loading, error } = useHeadlines();

  const [filterMode, setFilterMode] = useState('more');
  const [sortBy, setSortBy] = useState('comments');

  useEffect(() => {
    axios.post('http://localhost:5000/api/usage', {
      filter: filterMode,
      sort: sortBy,
    }).catch(err => {
      console.error('Failed to log usage', err);
    });
  }, [filterMode, sortBy]);

  const filterAndSortHeadlines = () => {
    const filtered = [...headlines].filter(h => {
      const wordCount = h.title.trim().split(/\s+/).length;
      return filterMode === 'more' ? wordCount > 5 : wordCount <= 5;
    });

    return filtered.sort((a, b) => {
      return sortBy === 'comments' ? b.comments - a.comments : b.score - a.score;
    });
  };

  const filteredHeadlines = filterAndSortHeadlines();

  return (
    <>
      <div>
        <div className='sortedHeadlines__dropdown'>
          <label>
            Filter:
            <select value={filterMode} onChange={e => setFilterMode(e.target.value as 'more' | 'less')}>
              <option value="more">More than 5 words</option>
              <option value="less">5 or fewer words</option>
            </select>
          </label>

          <label style={{ marginLeft: '1rem' }}>
            Sort by:
            <select value={sortBy} onChange={e => setSortBy(e.target.value as 'comments' | 'score')}>
              <option value="comments">Comments</option>
              <option value="score">Score</option>
            </select>
          </label>
        </div>

        {loading && <p>Loading headlines...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <HeadlineList headlines={filteredHeadlines} />}
      </div>
      <div>
        <ExportUsageButton/>
      </div>
    </>
  );
};

export default SortedHeadlines;
