import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token') ;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await axios.get('http://localhost:8000/api/notifications' ,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    setNotifications([...data.unread, ...data.read]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-4 rounded-lg ${notification.read_at ? 'bg-white' : 'bg-blue-50'}`}
          >
            <h3 className="font-medium">{notification.data.message}</h3>
            <p className="text-sm text-gray-600">
              {notification.data.date} • {notification.data.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}