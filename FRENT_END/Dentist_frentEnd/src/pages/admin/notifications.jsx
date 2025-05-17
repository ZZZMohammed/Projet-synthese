import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      // Combine unread and read, sort by newest first
      const allNotifications = [...data.unread, ...data.read]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      setNotifications(allNotifications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
      console.error('Notification fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId = null) => {
    try {
      const payload = notificationId ? { notification_id: notificationId } : {};
      
      await axios.post('http://localhost:8000/api/notifications/mark-read', 
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      // Optimistic UI update
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => {
          if (!notificationId || notification.id === notificationId) {
            return { ...notification, read_at: notification.read_at || new Date().toISOString() };
          }
          return notification;
        })
      );
    } catch (err) {
      setError('Failed to mark as read');
      console.error('Mark as read error:', err.message);
      fetchNotifications(); // Fallback to refresh if optimistic update fails
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Notifications</h1>
            
            <button 
              onClick={() => markAsRead()}
              className="btn btn-primary"
            >
              <i className="bi bi-check-all me-2"></i>
              Mark All as Read
            </button>
            <Link className='btn btn-warning m-4 fw-bold' to={'/back'}>Back</Link>
          </div>

          {notifications.length === 0 ? (
            <div className="alert alert-info">No notifications found</div>
          ) : (
            <div className="list-group">
              {notifications.map(notification => (
                <div 
                  key={`${notification.id}-${notification.read_at || 'unread'}`}
                  className={`list-group-item ${!notification.read_at ? 'list-group-item-primary' : 'bg-light'}`}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="me-3 flex-grow-1">
                      <h5 className={`mb-1 ${notification.read_at ? 'text-muted' : ''}`}>
                        {notification.data.message}
                      </h5>
                      <small className="text-muted d-block">
                        <i className="bi bi-calendar me-1"></i>
                        {notification.data.date} • {notification.data.time}
                      </small>
                      <small className="text-muted">
                        Appointment ID: {notification.data.appointment_id}
                      </small>
                    </div>
                    {!notification.read_at && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="btn btn-sm btn-outline-primary align-self-start"
                      >
                        <i className="bi bi-check"></i> Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}