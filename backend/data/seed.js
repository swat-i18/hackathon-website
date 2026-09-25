const connectDb = require("../database");

async function runSeed() {
  console.log("Seeding database...");
  const db = await connectDb();

  // Create Tables
  await db.exec(`
        CREATE TABLE IF NOT EXISTS energy (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            current_consumption_kwh INTEGER,
            daily_consumption_kwh INTEGER,
            monthly_consumption_kwh INTEGER,
            threshold_kwh INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS water (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            daily_usage_liters INTEGER,
            monthly_usage_liters INTEGER,
            threshold_liters INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS waste (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_waste_kg INTEGER,
            recycled_waste_kg INTEGER,
            medical_waste_kg INTEGER,
            general_waste_kg INTEGER,
            segregation_percentage INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS solar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            generated_kwh INTEGER,
            daily_generation_kwh INTEGER,
            monthly_generation_kwh INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS beds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_beds INTEGER,
            occupied_beds INTEGER,
            available_beds INTEGER,
            icu_total INTEGER,
            icu_occupied INTEGER,
            icu_available INTEGER,
            general_total INTEGER,
            general_occupied INTEGER,
            general_available INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total_staff INTEGER,
            available_staff INTEGER,
            on_duty INTEGER,
            doctors INTEGER,
            nurses INTEGER,
            support_staff INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS alerts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            title TEXT,
            message TEXT,
            severity TEXT,
            status TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

  // Clear existing data
  await db.exec(`
        DELETE FROM energy;
        DELETE FROM water;
        DELETE FROM waste;
        DELETE FROM solar;
        DELETE FROM beds;
        DELETE FROM staff;
        DELETE FROM alerts;
    `);

  console.log("Inserting demo data...");

  // Insert current values
  await db.run(
    `INSERT INTO beds (total_beds, occupied_beds, available_beds, icu_total, icu_occupied, icu_available, general_total, general_occupied, general_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [150, 118, 32, 30, 25, 5, 120, 93, 27],
  );
  await db.run(
    `INSERT INTO staff (total_staff, available_staff, on_duty, doctors, nurses, support_staff) VALUES (?, ?, ?, ?, ?, ?)`,
    [124, 48, 76, 24, 62, 38],
  );

  // Alerts
  await db.run(
    `INSERT INTO alerts (type, title, message, severity, status) VALUES (?, ?, ?, ?, ?)`,
    [
      "energy",
      "High Energy Consumption",
      "Current energy consumption is approaching the configured threshold.",
      "medium",
      "active",
    ],
  );
  await db.run(
    `INSERT INTO alerts (type, title, message, severity, status) VALUES (?, ?, ?, ?, ?)`,
    [
      "beds",
      "ICU Bed Capacity",
      "ICU occupancy is above 80 percent.",
      "high",
      "active",
    ],
  );
  await db.run(
    `INSERT INTO alerts (type, title, message, severity, status) VALUES (?, ?, ?, ?, ?)`,
    [
      "water",
      "Water Usage Monitoring",
      "Water consumption is within the normal operating range.",
      "low",
      "resolved",
    ],
  );

  // 30 days of historical data
  for (let i = 30; i >= 0; i--) {
    const timeOffset = `-${i} days`;
    const energyCurrent = 8450 + Math.floor(Math.random() * 1000 - 500);
    const waterDaily = 10200 + Math.floor(Math.random() * 1000 - 500);
    const wasteTotal = 1250 + Math.floor(Math.random() * 100 - 50);
    const wasteRecycled = Math.floor(wasteTotal * 0.57); // ~57%
    const wasteMedical = Math.floor(wasteTotal * 0.25);
    const wasteGeneral = wasteTotal - wasteRecycled - wasteMedical;
    const wasteSeg = Math.floor((wasteRecycled / wasteTotal) * 100);
    const solarGen = 4280 + Math.floor(Math.random() * 500 - 250);

    await db.run(
      `INSERT INTO energy (current_consumption_kwh, daily_consumption_kwh, monthly_consumption_kwh, threshold_kwh, timestamp) VALUES (?, ?, ?, ?, datetime('now', ?))`,
      [energyCurrent, 18450, 482300, 10000, timeOffset],
    );
    await db.run(
      `INSERT INTO water (daily_usage_liters, monthly_usage_liters, threshold_liters, timestamp) VALUES (?, ?, ?, datetime('now', ?))`,
      [waterDaily, 298500, 15000, timeOffset],
    );
    await db.run(
      `INSERT INTO waste (total_waste_kg, recycled_waste_kg, medical_waste_kg, general_waste_kg, segregation_percentage, timestamp) VALUES (?, ?, ?, ?, ?, datetime('now', ?))`,
      [
        wasteTotal,
        wasteRecycled,
        wasteMedical,
        wasteGeneral,
        wasteSeg,
        timeOffset,
      ],
    );
    await db.run(
      `INSERT INTO solar (generated_kwh, daily_generation_kwh, monthly_generation_kwh, timestamp) VALUES (?, ?, ?, datetime('now', ?))`,
      [solarGen, solarGen, 125400, timeOffset],
    );
  }

  console.log("Database seeded successfully.");
}

runSeed();
