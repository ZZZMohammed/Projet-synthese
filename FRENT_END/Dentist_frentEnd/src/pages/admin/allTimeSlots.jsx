import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../../redux/actions/timeSlotAction';

export default function AllTimeSlots() {
  const dispatch = useDispatch();
  const { slots: times, loading, error } = useSelector(state => state.timeSlots);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!times || !Array.isArray(times)) return <div>No time slots available</div>;

  return (
    <div>
      <h1>All Time Slots</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time.id}>
              <td>{time.date}</td>
              <td>{time.time}</td>
              <td>{time.is_booked ? "Booked" : "Available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}