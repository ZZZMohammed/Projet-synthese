import axios from 'axios';

// Fetch all time slots
export const fetchTimeSlots = () => async (dispatch) => {
  try {
    dispatch({ type: 'TIMESLOT_REQUEST' });

    const res = await axios.get('http://localhost:8000/api/times');
    dispatch({ type: 'TIMESLOT_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ 
      type: 'TIMESLOT_FAIL', 
      payload: error.response?.data?.message || error.message || 'Something went wrong' 
    });
  }
};

// Delete a time slot by ID
export const deleteTimeSlot = (timeSlot_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.delete(`http://localhost:8000/api/times/${timeSlot_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: 'DELETE_TIME_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({
      type: 'DELETE_TIME_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Update a time slot by ID
export const updateTimeSlot = (timeSlot_id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_TIME_REQUEST' });

    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:8000/api/times/${timeSlot_id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: 'UPDATE_TIME_SUCCESS', payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({
      type: 'UPDATE_TIME_FAIL',
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// Add a single new time slot
export const ajouterTimeSlot = (timeSlotData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const res = await axios.post('http://localhost:8000/api/times', timeSlotData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: 'ADD_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'ADD_FAIL', payload: error.response?.data?.message || error.message });
  }
};

// Create time slots in bulk (not used in your component but kept here)
export const createTimeSlots = (slotData) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_SLOTS_REQUEST' });
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:8000/api/slots/generate', slotData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: 'CREATE_SLOTS_SUCCESS', payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({
      type: 'CREATE_SLOTS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};
