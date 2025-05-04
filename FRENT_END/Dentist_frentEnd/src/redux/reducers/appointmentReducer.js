

const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'APPOINTMENT_REQUEST':
        return { ...state, loading: true };
      case 'APPOINTMENT_SUCCESS':
        return { loading: false, success: true, error: null };
      case 'APPOINTMENT_FAIL':
        return { loading: false, success: false, error: action.payload };
      default:
        return state;
    }
  };
  