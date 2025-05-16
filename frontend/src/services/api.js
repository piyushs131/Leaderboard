// frontend/src/services/api.js
import axios from 'axios';

// If not using proxy, uncomment and set baseURL:
// axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const submitScore = data =>
  axios.post('/api/leaderboard/submit', data);

export const getTop10 = () =>
  axios.get('/api/leaderboard/top');

export const getRank = userId =>
  axios.get(`/api/leaderboard/rank/${userId}`);
