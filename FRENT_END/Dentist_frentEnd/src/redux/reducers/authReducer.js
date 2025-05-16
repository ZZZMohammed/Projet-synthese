const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,           // Current authenticated user
  users: [],            // List of all users (for admin)
  loading: false,
  error: null,
  usersLoading: false,  // Separate loading state for users list
  usersError: null      // Separate error state for users list
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Existing authentication cases
    case 'LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return { ...state, loading: true, error: null };
      
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: true, 
        user: action.payload.user,
        loading: false 
      };
      
    case 'LOGOUT_SUCCESS':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        loading: false 
      };
      
    case 'LOGIN_FAIL':
    case 'LOGOUT_FAIL':
      return { ...state, loading: false, error: action.payload };
    
    // Profile cases
    case 'PROFILE_LOADING':
      return { ...state, loading: true, error: null };
      
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true
      };
      
    case 'PROFILE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    // Users list cases
    case 'USERS_LOADING':
      return { 
        ...state, 
        usersLoading: true,
        usersError: null 
      };
      
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        usersLoading: false,
        users: action.payload,
        usersError: null
      };
      
    case 'GET_USERS_FAIL':
      return {
        ...state,
        usersLoading: false,
        usersError: action.payload
      };
      
    case 'AUTH_ERROR':
      return {
        ...initialState,
        error: action.payload || 'Authentication error'
      };
      
    default:
      return state;
  }
};