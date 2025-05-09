import { React, useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots, deleteTimeSlot } from '../../redux/actions/timeSlotAction';

export default function AllTimeSlots() {
  const dispatch = useDispatch();
  const { slots: times, loading, error, deleting } = useSelector(state => state.timeSlots);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  const handleDelete = (timeSlot_id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setDeletingId(timeSlot_id);
      dispatch(deleteTimeSlot(timeSlot_id))
        .finally(() => setDeletingId(null));
    }
  };

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
                  <th scope="col">Action</th>
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
                    <td>
                      <button 
                        className={`btn btn-danger ${deletingId === time.id ? 'disabled' : ''}`}
                        onClick={() => handleDelete(time.id)}
                        disabled={deletingId === time.id}
                      >
                        {deletingId === time.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Deleting...
                          </>
                        ) : 'Delete'}
                      </button>
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