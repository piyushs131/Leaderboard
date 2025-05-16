import React, { useState, useEffect } from 'react';
import { getTop10 } from '../services/api';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await getTop10();
        setPlayers(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTop();
    const interval = setInterval(fetchTop, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Top 10 Players</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, i) => (
            <tr key={p.user_id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
