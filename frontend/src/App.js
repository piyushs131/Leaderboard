import React from 'react';
import Leaderboard from './components/Leaderboard';
import SubmitScore from './components/SubmitScore';
import CheckRank from './components/CheckRank';

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Game Leaderboard</h1>
      <SubmitScore />
      <CheckRank />
      <Leaderboard />
    </div>
  );
}

export default App;
