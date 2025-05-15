const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,           // Added to store user profile data
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Existing cases
    case 'LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return { ...state, loading: true, error: null };
      
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload.user, // Store user data on login
        loading: false 
      };
      
    case 'LOGOUT_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, // Clear user data on logout
        loading: false 
      };
      
    case 'LOGIN_FAIL':
    case 'LOGOUT_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    // New profile cases
    case 'PROFILE_LOADING':
      return { ...state, loading: true, error: null };
      
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload, // Store profile data
        isAuthenticated: true // Maintain auth state
      };

      
    case 'PROFILE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case 'AUTH_ERROR':
      return {
        ...initialState, // Reset to initial state
        error: action.payload || 'Authentication error'
      };
      
    default:
      return state;
  }
};