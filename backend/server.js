const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the parent directory
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/energy', require('./routes/energy'));
app.use('/api/water', require('./routes/water'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/solar', require('./routes/solar'));
app.use('/api/beds', require('./routes/beds'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/insights', require('./routes/insights'));

// Fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:\${PORT}`);
});
