# NewsApp (Expo) - Docker-ready

Features:
- Fetch top headlines (NewsAPI)
- Infinite scroll, pull-to-refresh
- Offline cache via AsyncStorage
- Article detail via WebView

## Setup
1. Clone repo
2. Edit `src/config.js` — tambahkan `NEWS_API_KEY`
3. Build & run with Docker:
   ```bash
   docker-compose build
   docker-compose up
