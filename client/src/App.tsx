import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useHeadlines } from './hooks/useHeadlines';

function App() {
  const { headlines, loading, error } = useHeadlines();

  return (
    <div className="App">
      <header className="App-header">
        {loading && <p>Loading headlines...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {headlines.map((h, i) => (
            <li key={i}>
              <a href={h.link} target="_blank" rel="noopener noreferrer">{h.title}</a>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;