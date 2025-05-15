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

### 1. Clone and Install

    ```bash
    # From your terminal (Git Bash, WSL or other Bash shell)
    git clone https://github.com/<your-username>/gaming-leaderboard.git
    cd gaming-leaderboard/backend
    npm install

---

 - ** Create a file named .env in the backend/ folder with these contents: **

```bash
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

- *** 4. Seed Sample Data***

npm run populate-data


