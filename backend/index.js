require('dotenv').config();
const express = require('express');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/leaderboard', leaderboardRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
