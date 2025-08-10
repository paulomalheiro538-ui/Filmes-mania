1) copy .env.example -> .env and fill YT_API_KEY and DATABASE_URL
2) npm install
3) npm start
4) Open GET /api/videos to see collected links

Notes:
- You must enable YouTube Data API and set YT_API_KEY.
- Facebook scraping is fragile and may require adjustments; it's example-only.
- For production, replace in-memory Map with Postgres DB and add robust error handling, rate-limiting, retries and logging.
