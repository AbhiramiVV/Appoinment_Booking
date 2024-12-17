const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./appointments.db');

db.serialize(() => {
  // Create the slots table with times from 10 AM to 5 PM (excluding 1-2 PM break)
  db.run(`CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT UNIQUE
  )`);

  // Create the appointments table
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    date TEXT,
    time TEXT,
    UNIQUE(date, time)
  )`);
});

// Generate available slots (30 min intervals, excluding break)
function generateSlots() {
  const slots = [];
  const times = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
    "12:00 PM", "12:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
    "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  times.forEach(time => {
    db.run('INSERT OR IGNORE INTO slots (time) VALUES (?)', [time]);
  });
}

generateSlots();

module.exports = db;
