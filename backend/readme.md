# 🏆 Leaderboard Backend

This is the Node.js/Express backend for the Gaming Leaderboard project. It uses PostgreSQL for persistence and Redis for caching.

---

## 📦 Tech Stack

- **Node.js** & **Express** – HTTP server and routing  
- **PostgreSQL** – main database (users, scores, leaderboard)  
- **Redis** – in‑memory cache for top‑10 queries  
- **dotenv** – environment‑variable management  
- **express‑rate‑limit** – rate limiting (5 submissions/minute)  
- **pg** – PostgreSQL client  
- **redis** – Redis client  

---

## 🧪 Backend Setup

### Prerequisites

- Node.js v14+  
- PostgreSQL running locally  
- Redis running locally  

### Install and Setup

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Create a .env file in the backend/ folder
cat << 'EOF' > backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=leaderboarddb

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=3001
EOF

# 3. Create database tables
npm run create-tables

# 4. Seed sample data
npm run populate-data

# 5. Start backend server
node index.js


```

📌 API Endpoints  
Base URL: http://localhost:3000/api/leaderboard

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | /top             | Fetch top 10 users by score      |
| POST   | /submit          | Submit score `{ "user_id", score }` |
| GET    | /rank/:user_id   | Get rank & total score of a user |

---
