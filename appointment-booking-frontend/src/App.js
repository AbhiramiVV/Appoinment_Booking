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
console.log(availableSlots,"availableSlots");

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/appointments', {
      name,
      phone,
      date: selectedDate,
      time: selectedSlot
    })
      .then(response => {
        console.log(response,"response")
        setMessage(response.data.message);
      })
      .catch(error => {
        if (error.response) {
          setMessage( error.response.data?.error);

        }

      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Book an Appointment
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Select Time Slot</label>
        <select
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Select Time Slot</option>
          {availableSlots.map((slot) => (
            <option key={slot.id} value={slot.time}>
              {slot.time}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Your Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Book Appointment
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </div>
  </div>
  );
};

export default App;
