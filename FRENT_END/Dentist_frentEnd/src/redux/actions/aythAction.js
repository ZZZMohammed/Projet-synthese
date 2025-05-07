

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