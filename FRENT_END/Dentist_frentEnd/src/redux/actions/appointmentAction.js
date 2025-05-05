import axios from 'axios';

export const bookAppointment = (time_slot_id) => async (dispatch) => {
  try {
    dispatch({ type: 'APPOINTMENT_REQUEST' });

    // Fetch the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    // Make the API request with the token included in the headers
    const res = await axios.post(
      'http://localhost:8000/api/appointments',
      { time_slot_id },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in header
        },
      }
    );

    // Dispatch success action with response data
    dispatch({ type: 'APPOINTMENT_SUCCESS', payload: res.data });
  } catch (error) {
    // Improved error handling to show better error messages
    const errorMsg = error.response ? error.response.data.message : error.message;
    dispatch({ type: 'APPOINTMENT_FAIL', payload: errorMsg });
  }
};
