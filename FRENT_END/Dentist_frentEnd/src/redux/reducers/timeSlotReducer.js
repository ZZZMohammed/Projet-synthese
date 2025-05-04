

const initialState = {
    loading: false,
    slots: [],
    error: null,
} ;

export const timeSlotReducer = (state = initialState , action) =>{
    switch(action.type){

        case 'TIMESLOT_REQUEST' :
            return {
                ...state , loading:true
            } ;

        case 'TIMESLOT_SUCCESS' :
            return { loading: false, slots: action.payload, error: null };
        
        case 'TIMESLOT_FAIL':
                return { loading: false, slots: [], error: action.payload };

            default:
                return state;
    }
}



