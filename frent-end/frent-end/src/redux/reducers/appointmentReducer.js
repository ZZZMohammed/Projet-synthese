const initialState = {
  appointments: [],
  loading: false,
  success: false,
  error: null,
  deleteSuccess: false,
  updateLoading: false,
  updateSuccess: false,
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
        appointments: action.payload,
        error: null,
      };
      
    case 'APPOINTMENTS_FAIL':
      return { 
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
      
    case 'DELETE_SUCCESS':
      return {
        ...state, 
        loading: false,
        deleteSuccess: true,
        error: null,
      };
      
    case 'DELETE_FAIL':
      return {
        ...state, 
        loading: false,
        deleteSuccess: false,
        error: action.payload,
      };
      
    // New cases for status update
    case 'APPOINTMENTS_REQUEST': // Reused for update loading state
    case 'UPDATE_APPOINTMENT_STATUS_REQUEST':
      return { 
        ...state, 
        updateLoading: true, 
        updateSuccess: false,
        error: null 
      };
      
    case 'UPDATE_APPOINTMENT_STATUS_SUCCESS':
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        appointments: state.appointments.map(appointment => 
          appointment.id === action.payload.id ? action.payload : appointment
        ),
        error: null,
      };
      
    case 'UPDATE_APPOINTMENT_STATUS_FAIL':
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        error: action.payload,
      };
      
    default:
      return state;
  }
};