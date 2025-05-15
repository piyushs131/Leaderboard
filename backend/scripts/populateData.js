require('dotenv').config();
const pool = require('../db');

(async function populateData() {
  const client = await pool.connect();
  try {
    console.log('⏳ Seeding data...');
    await client.query('BEGIN');

    for (let i = 1; i <= 10000; i++) {
      await client.query('INSERT INTO users(name) VALUES($1)', [`User${i}`]);
      if (i % 2000 === 0) console.log(`  • Inserted ${i} users`);
    }

    
    await client.query(`
      INSERT INTO leaderboard(user_id, total_score)
      SELECT id, 0 FROM users;
    `);
    console.log('  • Leaderboard initialized');

    
    for (let j = 1; j <= 100000; j++) {
      const user_id = Math.floor(Math.random() * 10000) + 1;
      const score   = Math.floor(Math.random() * 1000);
      await client.query(
        'INSERT INTO scores(user_id, score) VALUES($1, $2)',
        [user_id, score]
      );
      await client.query(
        'UPDATE leaderboard SET total_score = total_score + $1 WHERE user_id = $2',
        [score, user_id]
      );
      if (j % 20000 === 0) console.log(`  • Inserted ${j} scores`);
    }

    await client.query('COMMIT');
    console.log('✅ Data seeding complete.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error seeding data:', err);
  } finally {
    client.release();
    await pool.end();
  }
})();
