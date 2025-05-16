import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/aythAction';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem('token');
      await dispatch(logout(token));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header with flex container */}
      <div 
        className='d-flex justify-content-between align-items-center fixed-top' 
        style={{
          backgroundColor: '#4ad66d',
          color: '#ffffff', 
          padding: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}
      >
        {/* Empty div on left for balance */}
        <div style={{width: '150px'}}></div>
        
        {/* Centered title */}
        <h1 className='text-center fw-bold m-0 flex-grow-1'>
          Admin Dashboard
        </h1>
        
        {/* Buttons container on right */}
        <div className="d-flex">
          <Link 
            to="/profile" 
            className="btn btn-light d-flex align-items-center me-2"
          >
            <i className="bi bi-person-fill me-2"></i>
            Profile
          </Link>
          
          <button 
            className='btn btn-danger d-flex align-items-center' 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging out...
              </>
            ) : (
              'Logout'
            )}
          </button>
        </div>
      </div>

      {/* Main content with padding for fixed header */}
      <div 
        className='d-flex justify-content-center align-items-center vh-100'
        style={{paddingTop: '80px'}}
      >
        <div className='d-flex flex-wrap gap-5 justify-content-center'>
            <div>
            <Link 
              to={'/users'} 
              className='nav-link text-white  p-4 d-flex align-items-center justify-content-center fw-bold rounded' 
              style={{width: '200px', height: '100px', minWidth: '200px' , backgroundColor:'#99582a'}}
              aria-label="Manage available time slots"
            >
              All Users
            </Link>
          </div>

          <div>
            <Link 
              to={'/allTimes'} 
              className='nav-link text-white bg-dark p-4 d-flex align-items-center justify-content-center fw-bold rounded' 
              style={{width: '200px', height: '100px', minWidth: '200px'}}
              aria-label="Manage available time slots"
            >
              Available <br />Time Slots
            </Link>
          </div>

          <div>
            <Link 
              to={'/allBookings'} 
              className='nav-link text-white bg-primary p-4 d-flex align-items-center justify-content-center fw-bold rounded' 
              style={{width: '200px', height: '100px', minWidth: '200px'}}
              aria-label="View all bookings"
            >
              All Bookings
            </Link>
          </div>

          <div>
            <Link 
              to={'/notifications'} 
              className='nav-link text-white bg-danger p-4 d-flex align-items-center justify-content-center fw-bold rounded' 
              style={{width: '200px', height: '100px', minWidth: '200px'}}
              aria-label="View notifications"
            >
              Notifications
            </Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}