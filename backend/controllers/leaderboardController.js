const pool = require('../db');
const redisClient = require('../redisClient');

exports.submitScore = async (req, res) => {
  const { user_id, score } = req.body;
  if (!user_id || score == null) {
    return res.status(400).json({ error: 'user_id and score are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      'INSERT INTO scores(user_id, score) VALUES($1, $2)',
      [user_id, score]
    );

    
    await client.query(
      `UPDATE leaderboard
         SET total_score = total_score + $1
       WHERE user_id = $2`,
      [score, user_id]
    );

    await client.query('COMMIT');

    await redisClient.del('top10');

    return res.json({ message: 'Score submitted' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error in submitScore:', err);
    return res.status(500).json({ error: 'Submission failed' });
  } finally {
    client.release();
  }
};

exports.getTopPlayers = async (req, res) => {
  try {
    const cached = await redisClient.get('top10');
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const { rows } = await pool.query(`
      SELECT u.id   AS user_id,
             u.name AS name,
             l.total_score
      FROM leaderboard l
      JOIN users u ON l.user_id = u.id
      ORDER BY l.total_score DESC
      LIMIT 10
    `);

    await redisClient.set('top10', JSON.stringify(rows), { EX: 60 });

    return res.json(rows);
  } catch (err) {
    console.error('Error in getTopPlayers:', err);
    return res.status(500).json({ error: 'Failed to fetch top players' });
  }
};

exports.getUserRank = async (req, res) => {
  const user_id = Number(req.params.user_id);
  if (!user_id) {
    return res.status(400).json({ error: 'Invalid user_id' });
  }

  try {
    const totRes = await pool.query(
      'SELECT total_score FROM leaderboard WHERE user_id = $1',
      [user_id]
    );
    if (!totRes.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    const total_score = totRes.rows[0].total_score;

    const rankRes = await pool.query(
      'SELECT COUNT(*) + 1 AS rank FROM leaderboard WHERE total_score > $1',
      [total_score]
    );
    const rank = rankRes.rows[0].rank;

    return res.json({ user_id, total_score, rank });
  } catch (err) {
    console.error('Error in getUserRank:', err);
    return res.status(500).json({ error: 'Failed to fetch user rank' });
  }
};
