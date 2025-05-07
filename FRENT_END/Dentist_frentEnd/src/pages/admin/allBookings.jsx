import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token') ;


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/appointments', {
          headers : {
            Authorization : `Bearer ${token}` ,
          }
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>
              {/* Render your booking data here */}
              {JSON.stringify(booking)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}