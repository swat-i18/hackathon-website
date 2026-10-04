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
    const staff = await db.get('SELECT * FROM staff ORDER BY timestamp DESC LIMIT 1');

    res.json({
        energy: {
            currentConsumption: energy ? energy.current_consumption_kwh : 0,
            unit: "kWh"
        },
        water: {
            usage: water ? water.daily_usage_liters : 0,
            unit: "L"
        },
        waste: {
            segregation: waste ? waste.segregation_percentage : 0,
            unit: "%"
        },
        solar: {
            generation: solar ? solar.generated_kwh : 0,
            unit: "kWh"
        },
        beds: {
            total: beds ? beds.total_beds : 0,
            occupied: beds ? beds.occupied_beds : 0,
            available: beds ? beds.available_beds : 0
        },
        staff: {
            total: staff ? staff.total_staff : 0,
            available: staff ? staff.available_staff : 0,
            onDuty: staff ? staff.on_duty : 0
        }
    });
});

module.exports = router;
