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
    <div className="admin-dashboard" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <header className="admin-header" style={{
        backgroundColor: '#2c3e50',
        color: '#ffffff',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 className="admin-title" style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h1>
        
        <div className="admin-actions" style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/profile" 
            className="btn btn-outline-light d-flex align-items-center"
            style={{
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="bi bi-person-fill me-2"></i>
            Profile
          </Link>
          
          <button 
            className='btn btn-outline-light d-flex align-items-center'
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoggingOut ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging out...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ 
        padding: '6rem 2rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="dashboard-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'center'
        }}>
          {/* Users Card */}
          <Link 
            to={'/users'} 
            className="dashboard-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: '#2c3e50',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderTop: '4px solid #3498db',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div className="card-icon" style={{
              backgroundColor: '#e8f4fc',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <i className="bi bi-people-fill" style={{ fontSize: '1.5rem', color: '#3498db' }}></i>
            </div>
            <h3 style={{ margin: '0.5rem 0', fontWeight: '600' }}>All Users</h3>
            <p style={{ color: '#7f8c8d', margin: 0 }}>Manage system users</p>
          </Link>

          {/* Time Slots Card */}
          <Link 
            to={'/allTimes'} 
            className="dashboard-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: '#2c3e50',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderTop: '4px solid #2ecc71',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div className="card-icon" style={{
              backgroundColor: '#e8f8f0',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <i className="bi bi-clock-fill" style={{ fontSize: '1.5rem', color: '#2ecc71' }}></i>
            </div>
            <h3 style={{ margin: '0.5rem 0', fontWeight: '600' }}>Time Slots</h3>
            <p style={{ color: '#7f8c8d', margin: 0 }}>Manage availability</p>
          </Link>

          {/* Bookings Card */}
          <Link 
            to={'/allBookings'} 
            className="dashboard-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: '#2c3e50',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderTop: '4px solid #9b59b6',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div className="card-icon" style={{
              backgroundColor: '#f5eef8',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <i className="bi bi-calendar-check-fill" style={{ fontSize: '1.5rem', color: '#9b59b6' }}></i>
            </div>
            <h3 style={{ margin: '0.5rem 0', fontWeight: '600' }}>Bookings</h3>
            <p style={{ color: '#7f8c8d', margin: 0 }}>View all appointments</p>
          </Link>

          {/* Notifications Card */}
          <Link 
            to={'/notifications'} 
            className="dashboard-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              color: '#2c3es50',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderTop: '4px solid #e74c3c',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
              }
            }}
          >
            <div className="card-icon" style={{
              backgroundColor: '#fdedec',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <i className="bi bi-bell-fill" style={{ fontSize: '1.5rem', color: '#e74c3c' }}></i>
            </div>
            <h3 style={{ margin: '0.5rem 0', fontWeight: '600' }}>Notifications</h3>
            <p style={{ color: '#7f8c8d', margin: 0 }}>System alerts</p>
          </Link>
        </div>
      </main>
    </div>
  );
}