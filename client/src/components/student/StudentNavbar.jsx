import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaHome, 
  FaRocket, 
  FaUser, 
  FaBook, 
  FaCalendarAlt, 
  FaGamepad, 
  FaCog, 
  FaSignOutAlt,
  FaBars, 
  FaTimes,
  FaBell,
  FaStar,
  FaChevronDown
} from 'react-icons/fa';
import logo from '../../assets/logo.png'; // Make sure to add your logo

const StudentNavbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Check scroll position to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock notifications - in a real app, fetch these from an API
  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications = [
      {
        id: 'n1',
        type: 'achievement',
        title: 'New Achievement!',
        message: 'You\'ve unlocked "Code Wizard" achievement',
        date: '2023-09-15T14:30:00Z',
        read: false
      },
      {
        id: 'n2',
        type: 'mission',
        title: 'Mission Available',
        message: 'New mission unlocked on CodeForge planet',
        date: '2023-09-14T09:15:00Z',
        read: false
      },
      {
        id: 'n3',
        type: 'system',
        title: 'System Update',
        message: 'Tech Odyssey got new features! Check them out.',
        date: '2023-09-10T11:20:00Z',
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: FaHome },
    { name: 'Learning Path', path: '/student/learning-path', icon: FaRocket },
    { name: 'Tech Odyssey', path: '/student/gaming', icon: FaGamepad },
    { name: 'My Courses', path: '/student/courses', icon: FaBook },
    { name: 'Schedule', path: '/student/schedule', icon: FaCalendarAlt },
    { name: 'Profile', path: `/student/profile/${user?.id}`, icon: FaUser }
  ];

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-30 bg-gray-900 transition-all ${scrolled ? 'shadow-lg shadow-blue-900/20' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and desktop navigation */}
            <div className="flex items-center">
              <Link to="/student/dashboard" className="flex items-center">
                <img 
                  className="h-8 w-auto" 
                  src={logo || 'https://via.placeholder.com/40'} 
                  alt="Tech Odyssey"
                />
                <span className="ml-2 text-xl font-bold text-white">CTechX</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors
                      ${location.pathname === link.path || (link.path !== '/student/dashboard' && location.pathname.startsWith(link.path))
                        ? 'bg-indigo-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`
                    }
                  >
                    <link.icon className="mr-1.5" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative ml-3">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileOpen(false);
                  }}
                  className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <FaBell size={18} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white font-bold flex items-center justify-center transform translate-x-1 -translate-y-1">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                <AnimatePresence>
                  {notificationsOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40 bg-transparent" 
                        onClick={() => setNotificationsOpen(false)}
                      ></div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-700"
                      >
                        <div className="px-4 py-2 border-b border-gray-700">
                          <h3 className="text-sm font-medium text-white">Notifications</h3>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="px-4 py-3 text-center text-gray-400">
                              No notifications
                            </div>
                          ) : (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-gray-750' : ''}`}
                                onClick={() => markAsRead(notification.id)}
                              >
                                <div className="flex items-start">
                                  <div className="shrink-0 mr-3">
                                    {notification.type === 'achievement' && (
                                      <FaStar className="text-yellow-500" />
                                    )}
                                    {notification.type === 'mission' && (
                                      <FaRocket className="text-blue-500" />
                                    )}
                                    {notification.type === 'system' && (
                                      <FaBell className="text-gray-400" />
                                    )}
                                  </div>

                                  <div>
                                    <p className={`text-sm ${!notification.read ? 'font-medium text-white' : 'text-gray-300'}`}>
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div className="px-4 py-2 border-t border-gray-700">
                          <button 
                            className="text-xs text-indigo-400 hover:text-indigo-300"
                            onClick={() => {
                              setNotifications(prev => prev.map(n => ({...n, read: true})));
                              setNotificationsOpen(false);
                            }}
                          >
                            Mark all as read
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile dropdown */}
              <div className="relative ml-4">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white border border-gray-500">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || <FaUser />}
                  </div>
                  <div className="hidden md:flex md:items-center ml-2 text-gray-300">
                    <span className="text-sm">{user?.name || 'Student'}</span>
                    <FaChevronDown className="ml-1 h-3 w-3" />
                  </div>
                </button>

                {/* Profile dropdown content */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40 bg-transparent" 
                        onClick={() => setProfileOpen(false)}
                      ></div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-700"
                      >
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm text-white">{user?.name || 'Student'}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to={`/student/profile/${user?.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <FaUser className="mr-3 text-gray-400" />
                          Your Profile
                        </Link>
                        <Link
                          to="/student/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <FaCog className="mr-3 text-gray-400" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <FaSignOutAlt className="mr-3 text-gray-400" />
                          Sign out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden ml-3">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                      location.pathname === link.path || (link.path !== '/student/dashboard' && location.pathname.startsWith(link.path))
                        ? 'bg-indigo-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <link.icon className="mr-3" />
                    {link.name}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                >
                  <FaSignOutAlt className="mr-3" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer to account for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default StudentNavbar;