

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/aythAction';

const LogoutButton = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;