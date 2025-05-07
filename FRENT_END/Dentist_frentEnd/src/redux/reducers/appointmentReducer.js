const initialState = {
  appointments: [],
  loading: false,
  success: false,
  error: null
};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPOINTMENTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'APPOINTMENTS_SUCCESS':
      return { 
        ...state,
        loading: false,
        success: true,
        appointments: action.payload,  // Store the appointments here
        error: null
      };
    case 'APPOINTMENTS_FAIL':
      return { 
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};