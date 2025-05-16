# 🏆 Leaderboard Backend

This is the Node.js/Express backend for the Gaming Leaderboard project. It uses PostgreSQL for persistence and Redis for caching.

---

## 📦 Tech Stack

- **Node.js** & **Express** – HTTP server and routing  
- **PostgreSQL** – main database (users, scores, leaderboard)  
- **Redis** – in-memory cache for top‑10 queries  
- **dotenv** – environment variable management  
- **express‑rate‑limit** – rate limiting (5 submissions/minute)  
- **pg** – PostgreSQL client  
- **redis** – Redis client  

---


## 🧪 Backend Setup

###  Prerequisites

- Node.js v14+
- PostgreSQL running locally
- Redis running locally

###  Install and Setup


-- cd backend
-- npm install

-- ** Create a file named .env in the backend/ folder with these contents: **


DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=leaderboarddb

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=3001

---
 
- *** Create Database Tables ***

npm run create-tables

- *** Seed Sample Data***

npm run populate-data

# Start backend server
node index.js


📌 API Endpoints  
Base URL: http://localhost:3000/api/leaderboard

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | /top             | Fetch top 10 users by score      |
| POST   | /submit          | Submit score `{ "user_id", score }` |
| GET    | /rank/:user_id   | Get rank & total score of a user |

---
