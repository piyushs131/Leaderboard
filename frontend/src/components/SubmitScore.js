import React, { useState } from 'react';
import { submitScore } from '../services/api';

export default function SubmitScore() {
  const [userId, setUserId] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await submitScore({ user_id: Number(userId), score: Number(score) });
      setMessage('Score submitted!');
      setUserId('');
      setScore('');
    } catch {
      setMessage('Submission failed.');
    }
  };

  return (
    <div>
      <h2>Submit Score</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={e => setScore(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
