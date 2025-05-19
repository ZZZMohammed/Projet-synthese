const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
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
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload
        }
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
      return {
        ...initialState,
        error: action.payload || 'Authentication error',
        isAuthenticated: false,
        token: null
      };

    case 'RESET_AUTH_STATE':
      return {
        ...initialState,
        isAuthenticated: !!localStorage.getItem('token'),
        token: localStorage.getItem('token') || null
      };

    default:
      return state;
  }
};