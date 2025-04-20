import React, { useState } from 'react';

const Notifications = ({ notifications = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Add null/undefined check to prevent the error
  const notificationCount = notifications?.length || 0;
  
  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white">
            {notificationCount}
          </span>
        )}
      </button>
      
      {showNotifications && notificationCount > 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
          {notifications.map((notification, index) => (
            <div key={index} className="px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0">
              <p className="text-sm text-white">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      )}

      {showNotifications && notificationCount === 0 && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
          <div className="px-4 py-3">
            <p className="text-sm text-white">No new notifications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;