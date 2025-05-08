import axios from 'axios';

// Consistent action types
const APPOINTMENTS_REQUEST = 'APPOINTMENTS_REQUEST';
const APPOINTMENTS_SUCCESS = 'APPOINTMENTS_SUCCESS';
const APPOINTMENTS_FAIL = 'APPOINTMENTS_FAIL';


export const bookAppointment = (time_slot_id) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENTS_REQUEST });

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token is missing.');

    const res = await axios.post(
      'http://localhost:8000/api/appointments',
      { time_slot_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({ type: APPOINTMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    const errorMsg = error.response ? error.response.data.message : error.message;
    dispatch({ type: APPOINTMENTS_FAIL, payload: errorMsg });
  }
};

export const getAppointment = () => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENTS_REQUEST });

    const token = localStorage.getItem('token');
    if (!token) throw new Error("Authentication token is missing.");

    const res = await axios.get('http://localhost:8000/api/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({ type: APPOINTMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    const errorMsg = error.response ? error.response.data.message : error.message;
    dispatch({ type: APPOINTMENTS_FAIL, payload: errorMsg });
  }
};


export const deleteAppointment = (appointment_id) => async (dispatch) => {

  try{

      dispatch ({ type: 'APPOINTMENTS_REQUEST'}) ;
      const token = localStorage.getItem('token') ;

      const res = await axios.delete(`http://localhost:8000/api/appointments/${appointment_id}` ,
        { headers : {

             Authorization : `Bearer ${token}`
        }
         
        }
      ) ;

      dispatch ({ type : 'DELETE_SUCCESS' , payload:res.data}) ;

  }
  catch(error){
    console.error('Delete error:', error.response); // Detailed error log
    const errorMsg = error.response ? error.response.data.message : error.message;
    dispatch({ type: 'DELETE_FAIL', payload: errorMsg });
  }
} ;


export const updateAppointmentStatus = (appointment_id, newStatus) => async (dispatch) => {
    try {
        dispatch({ type: 'APPOINTMENTS_REQUEST' });
        
        const token = localStorage.getItem('token');
        
        const res = await axios.put(
            `http://localhost:8000/api/appointments/${appointment_id}`,
            { status: newStatus }, // The data being sent to update
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        dispatch({ 
            type: 'UPDATE_APPOINTMENT_STATUS_SUCCESS', 
            payload: res.data 
        });
    } 
    catch(error) {
        const errorMsg = error.response?.data?.message || error.message;
        dispatch({ 
            type: 'UPDATE_APPOINTMENT_STATUS_FAIL', 
            payload: errorMsg 
        });
    }
};