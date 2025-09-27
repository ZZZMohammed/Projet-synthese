import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment, deleteAppointment } from '../redux/actions/appointmentAction';
import { Link } from 'react-router-dom';

export default function MyBook() {
  const dispatch = useDispatch();

  // Get appointments state
  const { appointments, loading, error, deleteSuccess } = useSelector(state => ({
    appointments: state.appointments.appointments || [],
    loading: state.appointments.loading,
    error: state.appointments.error,
    deleteSuccess: state.appointments.deleteSuccess
  }));

  // Fetch appointments on mount and after delete
  useEffect(() => {
    dispatch(getAppointment());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(deleteAppointment(appointmentId));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container py-5" style={{ marginTop: '70px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h1 className="text-center mb-4">My Bookings</h1>

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading appointments...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="alert alert-danger text-center py-4">
              <p>Error fetching appointments.</p>
              <Link className="btn btn-primary mt-2" to="/list">
                Book Now
              </Link>
            </div>
          )}

          {/* Success */}
          {!loading && !error && (
            <>
              {appointments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((booking) => (
                        <tr key={booking.id}>
                          <td>{formatDate(booking.time_slot?.date)}</td>
                          <td>{formatTime(booking.time_slot?.time)}</td>
                          <td>
                            <span
                              className={`badge ${
                                booking.status === 'pending'
                                  ? 'bg-warning text-dark'
                                  : booking.status === 'confirmed'
                                  ? 'bg-success'
                                  : 'bg-danger'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(booking.id)}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info text-center">
                  You have no bookings yet. <br />
                  <Link to="/list" className="btn btn-outline-primary mt-2">
                    Book Now
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
