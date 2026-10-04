# Hospital Intelligence

This is a Hospital Intelligence dashboard for monitoring hospital resources including energy, water, waste, solar generation, bed availability, and staff availability.

## Setup Instructions

1. **Install Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Open the project terminal**: Navigate to this directory (`hackathon-website`).
3. **Run npm install**: Install the required dependencies.
   \`\`\`bash
   cd backend
   npm install
   \`\`\`
4. **Run npm start**: Start the backend server which also serves the frontend.
   \`\`\`bash
   npm start
   \`\`\`
   *(Alternatively, run `node backend/server.js` from the root directory).*
5. **Open http://localhost:3000**: Access the application in your web browser.

## Database Location
The backend uses a local SQLite database named `hospital.db`, located inside the `backend/` directory.

## Demo Data Generation
Demo data is generated via the `backend/data/seed.js` script. It automatically runs when necessary or can be manually triggered to insert realistic current metrics, historical chart records (30 days of data), and sample active alerts.

## API Endpoints

- **GET /api/dashboard**
  Returns a combined response containing current values for energy, water, waste, solar, beds, and staff.

- **GET /api/energy**
  Returns current energy consumption.

- **GET /api/energy/history**
  Returns historical energy records.

- **GET /api/water**
  Returns current water usage.

- **GET /api/water/history**
  Returns historical water records.

- **GET /api/waste**
  Returns current waste management metrics.

- **GET /api/waste/history**
  Returns historical waste records.

- **GET /api/solar**
  Returns current solar generation.

- **GET /api/solar/history**
  Returns historical solar records.

- **GET /api/beds**
  Returns current bed information (Total, Occupied, Available, ICU, General).

- **GET /api/staff**
  Returns current staff information (Total, Available, On-duty, Doctors, Nurses, Support).

- **GET /api/alerts**
  Returns all alerts.

- **GET /api/alerts/active**
  Returns only active alerts.

- **GET /api/alerts/resolved**
  Returns resolved alerts.

- **GET /api/analytics/:resource**
  Returns historical data for charts.

- **GET /api/insights**
  Returns automatically generated insights based on current database values (rules-based).

## Security & Privacy Note
This is a DEMO hospital project. It uses purely synthetic resource-management data. There is no patient information, no patient records, and no personal medical data stored or processed within this application.
