const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/leaderboardController');
const limiter = require('../middleware/rateLimiter');

router.post('/submit', limiter, ctrl.submitScore);

router.get('/top', ctrl.getTopPlayers);

router.get('/rank/:user_id', ctrl.getUserRank);

module.exports = router;
