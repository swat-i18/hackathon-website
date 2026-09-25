const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const connectDb = require("./database");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the parent directory
app.use(express.static(path.join(__dirname, "../")));

// API Routes



// --- API Route: ALERTS ---
app.get('/api/alerts', async (req, res) => {
  const db = await connectDb();
  const data = await db.all("SELECT * FROM alerts ORDER BY created_at DESC");
  res.json(data || []);
});

app.get('/api/alerts/active', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    'SELECT * FROM alerts WHERE status = "active" ORDER BY created_at DESC',
  );
  res.json(data || []);
});

app.get('/api/alerts/resolved', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    'SELECT * FROM alerts WHERE status = "resolved" ORDER BY created_at DESC',
  );
  res.json(data || []);
});

// --- API Route: ANALYTICS ---
const resources = ["energy", "water", "waste", "solar", "beds", "staff"];

resources.forEach((resType) => {
  app.get("/api/analytics/" + resType, async (req, res) => {
    const db = await connectDb();
    const data = await db.all(
      `SELECT * FROM ${resType} ORDER BY timestamp ASC LIMIT 30`,
    );
    res.json(data || []);
  });
});

// --- API Route: BEDS ---
app.get('/api/beds', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM beds ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/beds/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM beds ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// --- API Route: DASHBOARD ---
app.get('/api/dashboard', async (req, res) => {
  const db = await connectDb();
  const energy = await db.get(
    "SELECT * FROM energy ORDER BY timestamp DESC LIMIT 1",
  );
  const water = await db.get(
    "SELECT * FROM water ORDER BY timestamp DESC LIMIT 1",
  );
  const waste = await db.get(
    "SELECT * FROM waste ORDER BY timestamp DESC LIMIT 1",
  );
  const solar = await db.get(
    "SELECT * FROM solar ORDER BY timestamp DESC LIMIT 1",
  );
  const beds = await db.get(
    "SELECT * FROM beds ORDER BY timestamp DESC LIMIT 1",
  );
  const staff = await db.get(
    "SELECT * FROM staff ORDER BY timestamp DESC LIMIT 1",
  );

  res.json({
    energy: {
      currentConsumption: energy ? energy.current_consumption_kwh : 0,
      unit: "kWh",
    },
    water: {
      usage: water ? water.daily_usage_liters : 0,
      unit: "L",
    },
    waste: {
      segregation: waste ? waste.segregation_percentage : 0,
      unit: "%",
    },
    solar: {
      generation: solar ? solar.generated_kwh : 0,
      unit: "kWh",
    },
    beds: {
      total: beds ? beds.total_beds : 0,
      occupied: beds ? beds.occupied_beds : 0,
      available: beds ? beds.available_beds : 0,
    },
    staff: {
      total: staff ? staff.total_staff : 0,
      available: staff ? staff.available_staff : 0,
      onDuty: staff ? staff.on_duty : 0,
    },
  });
});

// --- API Route: ENERGY ---
app.get('/api/energy', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM energy ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/energy/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM energy ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// --- API Route: INSIGHTS ---
app.get('/api/insights', async (req, res) => {
  const db = await connectDb();
  const energy = await db.get(
    "SELECT * FROM energy ORDER BY timestamp DESC LIMIT 1",
  );
  const water = await db.get(
    "SELECT * FROM water ORDER BY timestamp DESC LIMIT 1",
  );
  const waste = await db.get(
    "SELECT * FROM waste ORDER BY timestamp DESC LIMIT 1",
  );
  const solar = await db.get(
    "SELECT * FROM solar ORDER BY timestamp DESC LIMIT 1",
  );
  const beds = await db.get(
    "SELECT * FROM beds ORDER BY timestamp DESC LIMIT 1",
  );

  const insights = [];
  let id = 1;

  if (energy && energy.current_consumption_kwh > energy.threshold_kwh * 0.8) {
    insights.push({
      id: id++,
      category: "Energy",
      title: "High Energy Consumption",
      message:
        "Energy consumption is above the recommended operating threshold.",
      severity: "high",
      recommendation: "Check HVAC systems in unoccupied wings.",
      created_at: new Date().toISOString(),
    });
  }

  if (beds && beds.icu_occupied / beds.icu_total > 0.8) {
    insights.push({
      id: id++,
      category: "Beds",
      title: "ICU Occupancy High",
      message: "ICU occupancy is high. Monitor available ICU capacity.",
      severity: "high",
      recommendation: "Prepare overflow ICU beds if needed.",
      created_at: new Date().toISOString(),
    });
  }

  if (water && water.daily_usage_liters > water.threshold_liters * 0.9) {
    insights.push({
      id: id++,
      category: "Water",
      title: "Water Usage Monitoring",
      message:
        "Water consumption is approaching the configured monitoring threshold.",
      severity: "medium",
      recommendation: "Check for potential leaks in main wards.",
      created_at: new Date().toISOString(),
    });
  }

  if (waste && waste.segregation_percentage < 70) {
    insights.push({
      id: id++,
      category: "Waste",
      title: "Waste Segregation Efficiency",
      message: "Waste segregation efficiency requires attention.",
      severity: "medium",
      recommendation: "Remind staff to properly segregate medical waste.",
      created_at: new Date().toISOString(),
    });
  }

  if (solar && solar.generated_kwh > 4000) {
    insights.push({
      id: id++,
      category: "Solar",
      title: "Solar Generation Optimal",
      message:
        "Solar generation is contributing significantly to hospital energy requirements.",
      severity: "low",
      recommendation: "No action required. Systems operating optimally.",
      created_at: new Date().toISOString(),
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: id++,
      category: "System",
      title: "All Systems Normal",
      message: "All monitored parameters are within standard operating ranges.",
      severity: "low",
      recommendation: "Continue standard monitoring.",
      created_at: new Date().toISOString(),
    });
  }

  res.json(insights);
});

// --- API Route: SOLAR ---
app.get('/api/solar', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM solar ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/solar/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM solar ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// --- API Route: STAFF ---
app.get('/api/staff', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM staff ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/staff/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM staff ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// --- API Route: WASTE ---
app.get('/api/waste', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM waste ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/waste/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM waste ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// --- API Route: WATER ---
app.get('/api/water', async (req, res) => {
  const db = await connectDb();
  const data = await db.get(
    "SELECT * FROM water ORDER BY timestamp DESC LIMIT 1",
  );
  res.json(data || {});
});

app.get('/api/water/history', async (req, res) => {
  const db = await connectDb();
  const data = await db.all(
    "SELECT * FROM water ORDER BY timestamp ASC LIMIT 30",
  );
  res.json(data || []);
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:\${PORT}`);
});
