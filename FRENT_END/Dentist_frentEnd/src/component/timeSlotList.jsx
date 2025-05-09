import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../redux/actions/timeSlotAction';
import { bookAppointment } from '../redux/actions/appointmentAction';


const TimeSlotList = () => {
  const dispatch = useDispatch();
  const [bookingInProgress, setBookingInProgress] = useState(null);

  const { slots, loading, error } = useSelector((state) => state.timeSlots);
  const { success, error: bookingError, loading: bookingLoading } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  const handleBook = async (id) => {
    setBookingInProgress(id);
    const result = await dispatch(bookAppointment(id));
    setBookingInProgress(null);
    
    if (result) {
      // Success - slots will refresh automatically from the action
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Time Slots</h2>

      {loading && <div className="alert alert-info">Loading time slots...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {bookingError && <div className="alert alert-danger">{bookingError}</div>}
      {success && (
        <div className="alert alert-success">
          Appointment booked successfully!
        </div>
      )}

      <ul className="list-group">
        {slots &&
          slots
            .filter((slot) => !slot.is_booked)
            .map((slot) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={slot.id}
              >
                <span>
                  {new Date(slot.date).toLocaleDateString()} at{' '}
                  {slot.time.substring(0, 5)}
                </span>
                <button
                  className={`btn btn-primary ${
                    bookingInProgress === slot.id ? 'disabled' : ''
                  }`}
                  onClick={() => handleBook(slot.id)}
                  disabled={bookingLoading || bookingInProgress === slot.id}
                >
                  {bookingInProgress === slot.id ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Booking...
                    </>
                  ) : (
                    'Book'
                  )}
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TimeSlotList;