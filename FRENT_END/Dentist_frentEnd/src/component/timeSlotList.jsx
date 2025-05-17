import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../redux/actions/timeSlotAction';
import { bookAppointment } from '../redux/actions/appointmentAction';
import { Link } from 'react-router-dom';

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
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="h5 mb-0">Available Time Slots</h2>
            </div>
            
            <div className="card-body">
              {loading && (
                <div className="alert alert-info d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Loading time slots...
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}
              
              {bookingError && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Please Log From Here First <Link className='btn btn-primary' to={'/login'}>Login</Link>
                </div>
              )}
              
              {success && (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Appointment booked successfully!
                </div>
              )}

              {slots && slots.filter(slot => !slot.is_booked).length === 0 && !loading && (
                <div className="alert alert-warning">
                  No available time slots at the moment. Please check back later.
                </div>
              )}

              <ul className="list-group list-group-flush">
                {slots &&
                  slots
                    .filter((slot) => !slot.is_booked)
                    .map((slot) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center py-3"
                        key={slot.id}
                      >
                        <div>
                          <span className="badge bg-light text-dark me-2">
                            <i className="bi bi-calendar-date me-1"></i>
                            {new Date(slot.date).toLocaleDateString()}
                          </span>
                          <span className="badge bg-light text-dark">
                            <i className="bi bi-clock me-1"></i>
                            {slot.time.substring(0, 5)}
                          </span>
                        </div>
                        <button
                          className={`btn btn-sm ${
                            bookingInProgress === slot.id 
                              ? 'btn-secondary' 
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => handleBook(slot.id)}
                          disabled={bookingLoading || bookingInProgress === slot.id}
                          style={{ minWidth: '80px' }}
                        >
                          {bookingInProgress === slot.id ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Booking
                            </>
                          ) : (
                            <>
                              <i className="bi bi-bookmark-plus me-1"></i>
                              Book
                            </>
                          )}
                        </button>
                      </li>
                    ))}
              </ul>
            </div>
            
            <div className="card-footer bg-light">
              <small className="text-muted">
                Select an available time slot to book your appointment
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotList;