import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
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
      setNotifications([...data.unread, ...data.read]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notifications');
      console.error('API Error:', err.response);
    }
  };

  const markAsRead = async (notificationId = null) => {
    try {
      await axios.post('http://localhost:8000/api/notifications/mark-read', 
        { notification_id: notificationId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      fetchNotifications();
    } catch (err) {
      setError('Failed to mark as read');
      console.error('Mark as read error:', err.response);
    }
  };

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
          </div>

          {notifications.length === 0 ? (
            <div className="alert alert-info">No notifications found</div>
          ) : (
            <div className="list-group">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`list-group-item ${!notification.read_at ? 'list-group-item-primary' : ''} position-relative`}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.data.message}</h5>
                    {!notification.read_at && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 mt-2 me-2"
                        style={{ zIndex: 1 }}
                      >
                        <i className="bi bi-check"></i>
                      </button>
                    )}
                  </div>
                  <small className="text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {notification.data.date} • {notification.data.time}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}