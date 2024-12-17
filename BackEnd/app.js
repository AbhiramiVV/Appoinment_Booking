const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package
const db = require('./database');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true                
  }));
  

// Fetch available slots for a specific date
app.get('/api/slots', (req, res) => {
  const { date } = req.query;
  const query = `SELECT * FROM slots WHERE time NOT IN (
      SELECT time FROM appointments WHERE date = ?
    )`;

  db.all(query, [date], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Book an appointment
app.post('/api/appointments', (req, res) => {
  const { name, phone, date, time } = req.body;

  const query = 'INSERT INTO appointments (name, phone, date, time) VALUES (?, ?, ?, ?)';
  db.run(query, [name, phone, date, time], function(err) {
    if (err) {
      res.status(500).json({ error: 'Slot is already booked or invalid data.' });
      return;
    }
    res.json({ message: 'Appointment successfully booked' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
