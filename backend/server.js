// backend/server.js
const express = require('express');
const { Client } = require('pg');
const app = express();
require('dotenv').config();


// Use environment variables
const PORT = process.env.BACKEND_PORT || 3000;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// Connect to PostgreSQL
(async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
})();

// Health endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.json({
      message: 'Backend is running',
      db_time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

