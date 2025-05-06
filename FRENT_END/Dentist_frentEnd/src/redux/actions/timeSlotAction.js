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
