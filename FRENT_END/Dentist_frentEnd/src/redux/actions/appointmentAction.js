

import axios from 'axios'

export const FetchAppointment = (time_slot_id) => async(dispatch) =>{

    try{
        dispatch({ type :'APPOINTMENT_REQUEST'}) ;

        const token = localStorage.getItem('token') ;
        const res = await axios.post('http://localhost:8000/api/appointments' ,
            {time_slot_id},
            {
                headers:{
                    Authorization: `Bearer ${token}` ,
                },
            }
        );
        dispatch ({type :'APPOINTMENT_SUCCESS' , payload: res.data }) ;
    }
    catch(error){
        dispatch({ type: 'APPOINTMENT_FAIL', payload: error.message });
    }
}