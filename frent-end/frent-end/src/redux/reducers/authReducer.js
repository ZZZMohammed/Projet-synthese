const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Fixed: Load user from localStorage
  token: localStorage.getItem('token') || null,
  users: [],
  loading: false,
  error: null,
  usersLoading: false,
  usersError: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Authentication cases
    case 'LOGIN_REQUEST':
    case 'LOGOUT_REQUEST':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Also store user in localStorage
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };

    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Also remove user from localStorage
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null
      };

    case 'LOGIN_FAIL':
    case 'LOGOUT_FAIL':
      return { ...state, loading: false, error: action.payload };

    // Profile cases
    case 'PROFILE_LOADING':
      return { ...state, loading: true, error: null };

    case 'GET_PROFILE_SUCCESS':
      // Update localStorage when profile is fetched
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case 'UPDATE_PROFILE_SUCCESS':
      const updatedUser = {
        ...state.user,
        ...action.payload
      };
      // Update localStorage when profile is updated
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        ...state,
        loading: false,
        user: updatedUser
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

    // General error cases
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Clear user data on auth error
      return {
        ...initialState,
        error: action.payload || 'Authentication error',
        isAuthenticated: false,
        token: null,
        user: null
      };

    case 'RESET_AUTH_STATE':
      return {
        ...initialState,
        isAuthenticated: !!localStorage.getItem('token'),
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      };

    default:
      return state;
  }
};