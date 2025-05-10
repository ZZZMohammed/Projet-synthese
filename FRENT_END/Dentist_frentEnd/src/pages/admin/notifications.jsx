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
        { notification_id: notificationId }, // Send specific ID or mark all as read
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      
      // Refresh notifications after marking as read
      fetchNotifications();
    } catch (err) {
      setError('Failed to mark as read');
      console.error('Mark as read error:', err.response);
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      {/* Mark all as read button */}
      <button 
        onClick={() => markAsRead()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Mark All as Read
      </button>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications found</p>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-4 rounded-lg ${notification.read_at ? 'bg-white' : 'bg-blue-50'} relative`}
            >
              <h3 className="font-medium">{notification.data.message}</h3>
              <p className="text-sm text-gray-600">
                {notification.data.date} • {notification.data.time}
              </p>
              
              {/* Mark single notification as read */}
              {!notification.read_at && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="absolute top-2 right-2 text-xs text-blue-500 hover:text-blue-700"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}