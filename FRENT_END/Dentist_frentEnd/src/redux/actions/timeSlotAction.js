import axios from 'axios';

export const fetchTimeSlots = () => async (dispatch) => {
    try {
        dispatch({ type: 'TIMESLOT_REQUEST' });

      

        // Make the GET request with the token in the Authorization header
        const res = await axios.get('http://localhost:8000/api/times', {
          
        });

        dispatch({ type: 'TIMESLOT_SUCCESS', payload: res.data }); // Dispatch success with the data
    } catch (error) {
        dispatch({ type: 'TIMESLOT_FAIL', payload: error.message || 'Something went wrong' }); // Dispatch failure with error message
    }
};


export const deleteTimeSlot = (timeSlot_id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
    const res = await axios.delete(`http://localhost:8000/api/times/${timeSlot_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ 
      type: 'DELETE_TIME_SUCCESS', 
      payload: res.data 
    });
    
  } catch (error) {
    dispatch({
      type: 'DELETE_TIME_FAIL',
      payload: error.response?.data?.message || error.message
    });
  }
}


export const updateTimeSlot = (timeSlot_id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_TIME_REQUEST' });
    
    const token = localStorage.getItem('token');
    const res = await axios.put(
      `http://localhost:8000/api/times/${timeSlot_id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({
      type: 'UPDATE_TIME_SUCCESS',
      payload: res.data
    });
    
    return res.data; // Return the updated data if needed
  } catch (error) {
    dispatch({
      type: 'UPDATE_TIME_FAIL',
      payload: error.response?.data?.message || error.message
    });
    throw error; // Re-throw the error for handling in the component
  }
};