import React from 'react';
import SortedHeadlines from './components/headlines/SortedHeadlines';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SortedHeadlines />
      </header>
    </div>
  );
}

export default App;