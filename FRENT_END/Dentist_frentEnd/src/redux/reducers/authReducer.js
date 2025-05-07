


const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'LOGOUT_REQUEST':
        return { ...state, loading: true, error: null };
        
      case 'LOGIN_SUCCESS':
        return { ...state, isAuthenticated: true, loading: false };
        
      case 'LOGOUT_SUCCESS':
        return { ...state, isAuthenticated: false, loading: false };
        
      case 'LOGIN_FAIL':
      case 'LOGOUT_FAIL':
        return { ...state, loading: false, error: action.payload };
        
      default:
        return state;
    }
  };