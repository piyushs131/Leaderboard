require('dotenv').config();
const pool = require('../db');

(async function createTables() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    
    await client.query('DROP TABLE IF EXISTS scores;');
    await client.query('DROP TABLE IF EXISTS leaderboard;');
    await client.query('DROP TABLE IF EXISTS users;');

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE scores (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        score INT NOT NULL,
        submitted_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    
    await client.query(`
      CREATE TABLE leaderboard (
        user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        total_score BIGINT NOT NULL DEFAULT 0
      );
    `);

    
    await client.query(`
      CREATE INDEX idx_leaderboard_totalscore
      ON leaderboard(total_score DESC);
    `);

    await client.query('COMMIT');
    console.log('✅ Tables and index created.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', err);
  } finally {
    client.release();
    await pool.end();
  }
})();
