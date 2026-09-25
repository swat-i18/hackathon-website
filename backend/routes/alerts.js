const express = require('express');
const router = express.Router();
const connectDb = require('../database');

router.get('/', async (req, res) => {
    const db = await connectDb();
    const data = await db.all('SELECT * FROM alerts ORDER BY created_at DESC');
    res.json(data || []);
});

router.get('/active', async (req, res) => {
    const db = await connectDb();
    const data = await db.all('SELECT * FROM alerts WHERE status = "active" ORDER BY created_at DESC');
    res.json(data || []);
});

router.get('/resolved', async (req, res) => {
    const db = await connectDb();
    const data = await db.all('SELECT * FROM alerts WHERE status = "resolved" ORDER BY created_at DESC');
    res.json(data || []);
});

module.exports = router;
