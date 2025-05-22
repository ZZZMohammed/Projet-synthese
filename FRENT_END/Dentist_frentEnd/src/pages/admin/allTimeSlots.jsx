import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTimeSlots,
  deleteTimeSlot,
  updateTimeSlot,
  ajouterTimeSlot
} from '../../redux/actions/timeSlotAction';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function AllTimeSlots() {
  const dispatch = useDispatch();
  const {
    slots: times,
    loading,
    error,
    deleting,
    updating,
    adding,
    addSuccess
  } = useSelector(state => state.timeSlots);

  const [deletingId, setDeletingId] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    is_booked: false
  });
  const [timeError, setTimeError] = useState('');

  // New states for checkbox time logic
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  useEffect(() => {
    if (addSuccess) {
      setShowAddModal(false);
      dispatch(fetchTimeSlots());
    }
  }, [addSuccess, dispatch]);

  const handleDelete = (timeSlot_id) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      setDeletingId(timeSlot_id);
      dispatch(deleteTimeSlot(timeSlot_id)).finally(() =>
        setDeletingId(null)
      );
    }
  };

  const handleEditClick = (timeSlot) => {
    setEditingSlot(timeSlot);
    setTimeError('');
    setFormData({
      date: timeSlot.date.split('T')[0],
      time: formatTimeTo24Hour(timeSlot.time),
      is_booked: timeSlot.is_booked
    });
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setTimeError('');
    setSelectedDate('');
    setAvailableTimes([]);
    setSelectedTimes([]);
    setShowAddModal(true);
  };

  const formatTimeTo24Hour = (timeString) => {
    if (!timeString) return '';

    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)) {
      return timeString;
    }

    const timeParts = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = timeParts[2];
      const period = timeParts[3].toUpperCase();

      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    return timeString;
  };

  const validateTimeFormat = () => {
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.time)) {
      setTimeError('Please enter time in 24-hour format (HH:MM)');
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateTimeFormat()) return;

    try {
      await dispatch(updateTimeSlot(editingSlot.id, formData));
      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  
  const fetchAvailableTimes = async (date) => {
    
    const response = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00" , "18:00"];
    setAvailableTimes(response);
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTimes([]);
    await fetchAvailableTimes(date);
  };

  const handleCheckboxChange = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time]
    );
  };

  const handleSubmitSelectedTimes = async () => {
    try {
      for (let time of selectedTimes) {
        await dispatch(ajouterTimeSlot({
          date: selectedDate,
          time,
          is_booked: false
        }));
      }
      setShowAddModal(false);
      dispatch(fetchTimeSlots());
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'time') setTimeError('');
  };

  if (loading && times.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">All Time Slots</h1>
            <Button variant="success" onClick={handleAddClick}>
              Add New Time Slot
            </Button>
            <Link className="btn btn-primary m-4 fw-bold" to="/back">
              Back
            </Link>
          </div>

          {Array.isArray(times) && times.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {times.map((time) => (
                    <tr key={time.id}>
                      <td>{new Date(time.date).toLocaleDateString()}</td>
                      <td>{time.time}</td>
                      <td>
                        <span className={`badge ${time.is_booked ? 'bg-danger' : 'bg-success'}`}>
                          {time.is_booked ? 'Booked' : 'Available'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="danger"
                            disabled={deletingId === time.id}
                            onClick={() => handleDelete(time.id)}
                          >
                            {deletingId === time.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1" />
                                Deleting...
                              </>
                            ) : 'Delete'}
                          </Button>
                          <Button
                            variant="warning"
                            disabled={updating && editingSlot?.id === time.id}
                            onClick={() => handleEditClick(time)}
                          >
                            {updating && editingSlot?.id === time.id ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1" />
                                Updating...
                              </>
                            ) : 'Edit'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info text-center mt-5" role="alert">
              No time slots available.
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time (24-hour format)</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                isInvalid={!!timeError}
              />
              <Form.Control.Feedback type="invalid">
                {timeError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Booked"
                name="is_booked"
                checked={formData.is_booked}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={updating}>
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal with Checkbox Times */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Time Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Form.Group>

            {availableTimes.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Available Times</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {availableTimes.map((time) => (
                    <Form.Check
                      key={time}
                      type="checkbox"
                      id={`time-${time}`}
                      label={time}
                      checked={selectedTimes.includes(time)}
                      onChange={() => handleCheckboxChange(time)}
                    />
                  ))}
                </div>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmitSelectedTimes}
            disabled={selectedTimes.length === 0 || !selectedDate}
          >
            Add Selected Slots
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
