import axios from 'axios';

export const fetchTimeSlots = () => async (dispatch) => {
    try {
        dispatch({ type: 'TIMESLOT_REQUEST' });

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication token is missing.');
        }

        // Make the GET request with the token in the Authorization header
        const res = await axios.get('http://localhost:8000/api/times', {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token here
            },
        });

        dispatch({ type: 'TIMESLOT_SUCCESS', payload: res.data }); // Dispatch success with the data
    } catch (error) {
        dispatch({ type: 'TIMESLOT_FAIL', payload: error.message || 'Something went wrong' }); // Dispatch failure with error message
    }
};
