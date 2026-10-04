const express = require('express');
const router = express.Router();
const connectDb = require('../database');

router.get('/', async (req, res) => {
    const db = await connectDb();
    const data = await db.get('SELECT * FROM solar ORDER BY timestamp DESC LIMIT 1');
    res.json(data || {});
});

router.get('/history', async (req, res) => {
    const db = await connectDb();
    const data = await db.all('SELECT * FROM solar ORDER BY timestamp ASC LIMIT 30');
    res.json(data || []);
});

module.exports = router;
