
import axios from 'axios'


export  const fetchTimeSlots = (dispatch)=>{

    try {

        dispatch ({ type : 'TIMESLOT_REQUEST'}) ;

        const res = axios.get('http://localhost:8000/api/times') ;
        dispatch ({type: 'TIMESLOT_SUCCESS' , payload : res.data})
    }
    catch (error){
        dispatch ({ type: 'TIMESLOT_FAIL' , payload :error.message}) ;
    }
}