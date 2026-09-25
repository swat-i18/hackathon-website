const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.resolve(__dirname, 'hospital.db');

async function connectDb() {
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

module.exports = connectDb;
