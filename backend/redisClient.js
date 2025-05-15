require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  await client.connect();
  console.log('🔴 Redis connected');
})();

module.exports = client;
