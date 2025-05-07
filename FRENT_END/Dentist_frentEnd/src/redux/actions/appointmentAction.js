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


export const deleteAppointment = (time_slot_id) => async (dispatch) => {

  try{

      dispatch ({ type: 'APPOINTMENTS_REQUEST'}) ;
      const token = localStorage.getItem('token') ;

      const res = await axios.delete(`http://localhost:8000/api/appointments/${time_slot_id}` ,
        { headers : {

             Authorization : `Bearer ${token}`
        }
         
        }
      ) ;

      dispatch ({ type : 'DELETE_SUCCESS' }) ;

  }
  catch(error){
    const errorMsg = error.response ? error.response.data.message : error.message;
    dispatch({ type: 'DELETE_FAIL', payload: errorMsg });
  }
}