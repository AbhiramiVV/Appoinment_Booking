import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedDate) {
      axios.get(`http://localhost:5000/api/slots?date=${selectedDate}`)
        .then(response => {
          setAvailableSlots(response.data);
        })
        .catch(error => {
          if (error.response) {
            setMessage( error.response.data?.error);
  
          }else{
            setMessage('Error fetching available slots');

          }
        });
    }
  }, [selectedDate]);

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/appointments', {
      name,
      phone,
      date: selectedDate,
      time: selectedSlot
    })
      .then(response => {
        console.log(response,"response");
        setMessage(response.data.message);
      })
      .catch(error => {
        if (error.response) {
          setMessage( error.response.data?.error);

        }

      });
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={e => setSelectedDate(e.target.value)} 
      />
      
      <select onChange={e => setSelectedSlot(e.target.value)}>
        <option value="">Select Time Slot</option>
        {availableSlots.map(slot => (
          <option key={slot.id} value={slot.time}>
            {slot.time}
          </option>
        ))}
      </select>
      
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phone} 
        onChange={e => setPhone(e.target.value)} 
      />
      
      <button onClick={handleBooking}>Book Appointment</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
