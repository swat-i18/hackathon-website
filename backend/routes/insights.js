const express = require('express');
const router = express.Router();
const connectDb = require('../database');

router.get('/', async (req, res) => {
    const db = await connectDb();
    const energy = await db.get('SELECT * FROM energy ORDER BY timestamp DESC LIMIT 1');
    const water = await db.get('SELECT * FROM water ORDER BY timestamp DESC LIMIT 1');
    const waste = await db.get('SELECT * FROM waste ORDER BY timestamp DESC LIMIT 1');
    const solar = await db.get('SELECT * FROM solar ORDER BY timestamp DESC LIMIT 1');
    const beds = await db.get('SELECT * FROM beds ORDER BY timestamp DESC LIMIT 1');

    const insights = [];
    let id = 1;

    if (energy && energy.current_consumption_kwh > energy.threshold_kwh * 0.8) {
        insights.push({
            id: id++,
            category: 'Energy',
            title: 'High Energy Consumption',
            message: 'Energy consumption is above the recommended operating threshold.',
            severity: 'high',
            recommendation: 'Check HVAC systems in unoccupied wings.',
            created_at: new Date().toISOString()
        });
    }

    if (beds && beds.icu_occupied / beds.icu_total > 0.8) {
        insights.push({
            id: id++,
            category: 'Beds',
            title: 'ICU Occupancy High',
            message: 'ICU occupancy is high. Monitor available ICU capacity.',
            severity: 'high',
            recommendation: 'Prepare overflow ICU beds if needed.',
            created_at: new Date().toISOString()
        });
    }

    if (water && water.daily_usage_liters > water.threshold_liters * 0.9) {
        insights.push({
            id: id++,
            category: 'Water',
            title: 'Water Usage Monitoring',
            message: 'Water consumption is approaching the configured monitoring threshold.',
            severity: 'medium',
            recommendation: 'Check for potential leaks in main wards.',
            created_at: new Date().toISOString()
        });
    }

    if (waste && waste.segregation_percentage < 70) {
        insights.push({
            id: id++,
            category: 'Waste',
            title: 'Waste Segregation Efficiency',
            message: 'Waste segregation efficiency requires attention.',
            severity: 'medium',
            recommendation: 'Remind staff to properly segregate medical waste.',
            created_at: new Date().toISOString()
        });
    }

    if (solar && solar.generated_kwh > 4000) {
        insights.push({
            id: id++,
            category: 'Solar',
            title: 'Solar Generation Optimal',
            message: 'Solar generation is contributing significantly to hospital energy requirements.',
            severity: 'low',
            recommendation: 'No action required. Systems operating optimally.',
            created_at: new Date().toISOString()
        });
    }

    if (insights.length === 0) {
        insights.push({
            id: id++,
            category: 'System',
            title: 'All Systems Normal',
            message: 'All monitored parameters are within standard operating ranges.',
            severity: 'low',
            recommendation: 'Continue standard monitoring.',
            created_at: new Date().toISOString()
        });
    }

    res.json(insights);
});

module.exports = router;
