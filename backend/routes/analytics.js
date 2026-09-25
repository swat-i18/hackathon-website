const express = require('express');
const router = express.Router();
const connectDb = require('../database');

const resources = ['energy', 'water', 'waste', 'solar', 'beds', 'staff'];

resources.forEach(resType => {
    router.get('/' + resType, async (req, res) => {
        const db = await connectDb();
        const data = await db.all(`SELECT * FROM ${resType} ORDER BY timestamp ASC LIMIT 30`);
        res.json(data || []);
    });
});

module.exports = router;
