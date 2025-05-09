import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../../redux/actions/timeSlotAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

export default function AllTimeSlots() {
  const dispatch = useDispatch();
  const { slots: times, loading, error } = useSelector(state => state.timeSlots);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger text-center mt-5" role="alert">
      Error: {error}
    </div>
  );

  if (!times || !Array.isArray(times)) return (
    <div className="alert alert-info text-center mt-5" role="alert">
      No time slots available
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h1 className="text-center mb-4">All Time Slots</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {times.map((time) => (
                  <tr key={time.id}>
                    <td>{new Date(time.date).toLocaleDateString()}</td>
                    <td>{time.time}</td>
                    <td>
                      <span className={`badge ${time.is_booked ? 'bg-danger' : 'bg-success'}`}>
                        {time.is_booked ? "Booked" : "Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}