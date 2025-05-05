import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../redux/actions/timeSlotAction';
import { bookAppointment } from '../redux/actions/appointmentAction';

const TimeSlotList = () => {
  const dispatch = useDispatch();

  const { slots, loading, error } = useSelector((state) => state.timeSlots);
  const { success, error: bookingError } = useSelector(
    (state) => state.appointments || {} // fix: match 'appointments' from store.js
  );

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  const handleBook = (id) => {
    dispatch(bookAppointment(id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Time Slots</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {bookingError && <p className="text-danger">Booking Failed: {bookingError}</p>}
      {success && <p className="text-success">Appointment booked successfully!</p>}

      <ul className="list-group">
        {slots &&
          slots
            .filter((slot) => !slot.is_booked)
            .map((slot) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={slot.id}>
                {slot.date} at {slot.time}
                <button className="btn btn-primary" onClick={() => handleBook(slot.id)}>
                  Book
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TimeSlotList;
