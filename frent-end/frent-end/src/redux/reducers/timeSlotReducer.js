const initialState = {
    loading: false,
    slots: [],
    error: null,
    updating: false,
    deleting: false,
    adding: false,
    addSuccess: false,
    creating: false,
    createSuccess: false,
    createMessage: null
};

export const timeSlotReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'TIMESLOT_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'TIMESLOT_SUCCESS':
            return {
                ...state,
                loading: false,
                slots: action.payload,
                error: null
            };

        case 'TIMESLOT_FAIL':
            return {
                ...state,
                loading: false,
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

        case 'ADD_REQUEST':
            return {
                ...state,
                adding: true,
                addSuccess: false
            };

        case 'ADD_SUCCESS':
            return {
                ...state,
                adding: false,
                addSuccess: true,
                slots: [...state.slots, action.payload],
                error: null
            };

        case 'ADD_FAIL':
            return {
                ...state,
                adding: false,
                addSuccess: false,
                error: action.payload
            };

        case 'RESET_ADD_STATE':
            return {
                ...state,
                addSuccess: false,
                error: null
            };

        // 💡 New slot generation (bulk create)
        case 'CREATE_SLOTS_REQUEST':
            return {
                ...state,
                creating: true,
                createSuccess: false,
                createMessage: null
            };

        case 'CREATE_SLOTS_SUCCESS':
            return {
                ...state,
                creating: false,
                createSuccess: true,
                createMessage: action.payload.message,
                slots: [...state.slots, ...action.payload.data],
                error: null
            };

        case 'CREATE_SLOTS_FAIL':
            return {
                ...state,
                creating: false,
                createSuccess: false,
                error: action.payload
            };

        case 'RESET_CREATE_STATE':
            return {
                ...state,
                createSuccess: false,
                createMessage: null,
                error: null
            };

        default:
            return state;
    }
};
