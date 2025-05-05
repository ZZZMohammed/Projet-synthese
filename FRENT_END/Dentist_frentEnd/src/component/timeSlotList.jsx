import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../redux/actions/timeSlotAction';
import { bookAppointment } from '../redux/actions/appointmentAction';

 const TimeSlotList = () => {
  const dispatch = useDispatch();
  const { slots, loading, error } = useSelector((state) => state.timeSlots);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  const handleBook = (id) => {
    dispatch(bookAppointment(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Time Slots</h2>
      <ul>
        {slots
          .filter((slot) => !slot.is_booked)
          .map((slot) => (
            <li key={slot.id}>
              {slot.date} at {slot.time}
              <button onClick={() => handleBook(slot.id)}>Book</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default TimeSlotList; 