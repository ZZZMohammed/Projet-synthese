

import axios from 'axios';






export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
   
    await axios.post('http://localhost:8000/api/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
 
    dispatch({ type: 'LOGOUT_SUCCESS' });
    
 
    localStorage.removeItem('token');
    

    window.location.href = '/login';
    
  } catch (error) {
    console.error('Logout error:', error);
    dispatch({ type: 'LOGOUT_FAIL', payload: error.response?.data?.message || 'Logout failed' });
  }
};



export const getProfile = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_LOADING' }); // Set loading state
  
  try {
    const token = localStorage.getItem('token');
    
    const res = await axios.get('http://localhost:8000/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    dispatch({
      type: 'GET_PROFILE_SUCCESS',
      payload: res.data.user // Assuming your API returns { user: {...} }
    });
    
  } catch (error) {
    let errorMessage = 'Failed to fetch profile';
    
    if (error.response) {
      // Server responded with a status code outside 2xx
      errorMessage = error.response.data.message || errorMessage;
      
      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - token expired or invalid
        dispatch({ type: 'AUTH_ERROR' });
      }
    }
    
    dispatch({
      type: 'GET_PROFILE_FAIL',
      payload: errorMessage
    });
    
    // Optional: Re-throw the error if you want components to catch it
    throw error;
  }
};


export const getUsers = () => async (dispatch) => {
  dispatch({ type: 'USERS_LOADING' }); // Set loading state
  
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8000/api/users', { // Use relative path
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Handle potential response structures
    const users = res.data.data || res.data.users || res.data;

    
    dispatch({
      type: 'GET_USERS_SUCCESS',
      payload: users
    });

  } catch (error) {
    let errorMessage = 'Failed to fetch users';
    
    // More detailed error handling
    if (error.response) {
      // Server responded with non-2xx status
      errorMessage = error.response.data?.message || 
                    error.response.statusText || 
                    `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'Network error - no response from server';
    }

    dispatch({
      type: 'GET_USERS_FAIL',
      payload: errorMessage
    });
    
    // Optional: Re-throw if you want components to catch it
    throw error;
  }
};