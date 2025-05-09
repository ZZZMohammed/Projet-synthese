const initialState = {
    loading: false,
    slots: [],
    error: null,
    updating: false
};

export const timeSlotReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TIMESLOT_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'TIMESLOT_SUCCESS':
            return {
                loading: false,
                slots: action.payload,
                error: null
            };
        
        case 'TIMESLOT_FAIL':
            return {
                loading: false,
                slots: [],
                error: action.payload
            };

        case 'DELETE_TIME_REQUEST':
            return {
                ...state,
                deleting: true
            };

        case 'DELETE_TIME_SUCCESS':
            return {
                ...state,
                deleting: false,
                slots: state.slots.filter(slot => slot.id !== action.payload),
                error: null
            };

        case 'DELETE_TIME_FAIL':
            return {
                ...state,
                deleting: false,
                error: action.payload
            };

        case 'UPDATE_TIME_REQUEST':
            return {
                ...state,
                updating: true
            };

        case 'UPDATE_TIME_SUCCESS':
            return {
                ...state,
                updating: false,
                slots: state.slots.map(slot => 
                    slot.id === action.payload.id ? action.payload : slot
                ),
                error: null
            };

        case 'UPDATE_TIME_FAIL':
            return {
                ...state,
                updating: false,
                error: action.payload
            };

        default:
            return state;
    }
};