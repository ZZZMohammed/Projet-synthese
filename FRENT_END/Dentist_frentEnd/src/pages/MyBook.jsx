import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment, deleteAppointment } from '../redux/actions/appointmentAction';

export default function MyBook() {
  const dispatch = useDispatch();
  
  // Debug the full state
  const appointmentState = useSelector(state => state.appointments);
  console.log('Current appointments state:', appointmentState);
  
  const { appointments, loading, error, deleteSuccess } = useSelector(state => ({
    appointments: state.appointments.appointments || [],
    loading: state.appointments.loading,
    error: state.appointments.error,
    deleteSuccess: state.appointments.deleteSuccess
  }));

  useEffect(() => {
    dispatch(getAppointment());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (appointmentId) => {
    console.log('Attempting to delete appointment ID:', appointmentId); // Debug
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(deleteAppointment(appointmentId));
    }
  }

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

  if (loading) return <div className="text-center py-4">Loading appointments...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left">Date</th>
                <th className="py-3 px-4 border-b text-left">Time</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{formatDate(booking.time_slot?.date)}</td>
                  <td className="py-3 px-4 border-b">{formatTime(booking.time_slot?.time)}</td>
                  <td className="py-3 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <button 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleDelete(booking.id)} // Changed from booking.appointment_id to booking.id
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
        <p className="text-gray-500">You have no bookings yet.</p>
      )}
    </div>
  );
}