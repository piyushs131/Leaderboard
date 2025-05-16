import React, { useState } from 'react';
import { getRank } from '../services/api';

export default function CheckRank() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = async e => {
    e.preventDefault();
    try {
      const res = await getRank(userId);
      setResult(res.data);
    } catch {
      setResult({ error: 'User not found' });
    }
  };

  return (
    <div>
      <h2>Check Your Rank</h2>
      <form onSubmit={handleCheck}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <button type="submit">Check</button>
      </form>
      {result && (
        result.error
          ? <p style={{ color: 'red' }}>{result.error}</p>
          : (
            <p>
              Rank: {result.rank}<br/>
              Total Score: {result.total_score}
            </p>
          )
      )}
    </div>
  );
}
