import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useDispatch , useSelector} from 'react-redux'
import { deleteAppointment , updateAppointmentStatus } from '../../redux/actions/appointmentAction';

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch()

  const appointmentState = useSelector(state => state.appointments);
  console.log('Current appointments state:', appointmentState);
  
  const { appointments,  deleteSuccess , updateSuccess } = useSelector(state => ({
    appointments: state.appointments.appointments || [],
    deleteSuccess: state.appointments.deleteSuccess
  }));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [deleteSuccess , updateSuccess]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const handleDelete =(appointment_id)=>{
   console.log('Attempting to delete appointment ID:', appointment_id); // Debug
       if (window.confirm('Are you sure you want to cancel this appointment?')) {
         dispatch(deleteAppointment(appointment_id));
  }} ;

  const handleUpdate = (appointment_id) => {
    if (window.confirm('Are you sure you want to accept this appointment?')) {
      dispatch(updateAppointmentStatus(appointment_id, 'accepted'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Patient</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Appointment Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{booking.user.name}</td>
                  <td className="py-2 px-4 border-b text-center">{booking.user.email}</td>
                  <td className="py-2 px-4 border-b text-center">{booking.user.role}</td>
                  <td className="py-2 px-4 border-b text-center">{formatDate(booking.time_slot.date)}</td>
                  <td className="py-2 px-4 border-b text-center">{formatTime(booking.time_slot.time)}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center btn btn-danger" onClick={()=>handleDelete(booking.id)}>Delete</td>
                   <td className="py-2 px-4 border-b text-center btn btn-warning" onClick={()=>handleUpdate(booking.id)}>Update</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No bookings found</p>
      )}
    </div>
  );
}