// src/layouts/GameLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useInventory } from '../contexts/InventoryContext';
import { 
  FaBook, FaRocket, FaUser, FaStar, FaMedal, FaChartLine,
  FaCog, FaSignOutAlt, FaHome, FaBars, FaTimes,
  FaGamepad, FaLaptopCode, FaBoxes
} from 'react-icons/fa';
import PropTypes from 'prop-types';

/**
 * Main game layout with responsive navigation and game stats
 */
const GameLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    xp: 0,
    maxXp: 100,
    achievements: 0,
    completedMissions: 0
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { inventoryStats, calculateEquippedStats } = useInventory();
  
  // Fetch player stats on component mount
  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        // This would be replaced with a real API call
        // const response = await axios.get(`/api/player/stats/${user.id}`);
        // setPlayerStats(response.data);
        
        // Mock data for now
        setPlayerStats({
          level: 12,
          xp: 2450,
          maxXp: 3000,
          achievements: 24,
          completedMissions: 47
        });
        
        // Mock notifications
        setNotifications([
          { id: 1, type: 'achievement', message: 'New achievement unlocked: Code Wizard', read: false },
          { id: 2, type: 'mission', message: 'Mission "Fix Broken API" is available', read: false },
          { id: 3, type: 'reward', message: 'You received a new item: Advanced Debugger', read: true }
        ]);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    if (user?.id) {
      fetchPlayerStats();
    }
  }, [user?.id]);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/student/dashboard', icon: FaHome },
    { name: 'Learning Journey', path: '/student/journey', icon: FaRocket },
    { name: 'Tech Odyssey', path: '/student/gaming', icon: FaGamepad },
    { name: 'Missions', path: '/student/gaming/missions', icon: FaLaptopCode },
    { name: 'Inventory', path: '/student/gaming/inventory', icon: FaBoxes },
    { name: 'Achievements', path: '/student/gaming/achievements', icon: FaMedal },
    { name: 'Leaderboards', path: '/student/leaderboards', icon: FaChartLine },
    { name: 'Profile', path: `/student/profile/${user?.id}`, icon: FaUser }
  ];
  
  // Calculate XP percentage for progress bar
  const xpPercentage = Math.round((playerStats.xp / playerStats.maxXp) * 100);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  // Calculate player equipped stats
  const equippedStats = calculateEquippedStats();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Top navigation bar (mobile and desktop) */}
      <nav className="bg-gray-800 border-b border-gray-700 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            className="mr-4 text-gray-400 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/student/dashboard" className="flex items-center">
            <div className="bg-indigo-600 h-8 w-8 rounded-md flex items-center justify-center mr-2">
              <FaRocket className="text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">Tech Odyssey</span>
          </Link>
        </div>
        
        {/* XP display on top bar (visible on all screens) */}
        <div className="flex items-center">
          <div className="hidden sm:flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <FaStar className="text-yellow-400 mr-2" />
            <span className="font-medium text-yellow-100">{playerStats.xp} XP</span>
          </div>
          
          {/* Notifications icon */}
          <div className="relative">
            <button
              className="p-2 ml-4 text-gray-400 hover:text-white relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">Notifications</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {/* Notification badge */}
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-medium text-gray-200">Notifications</h3>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-400 text-center">
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-700 last:border-0 ${!notification.read ? 'bg-gray-700/40' : ''}`}
                        >
                          <div className="flex items-start">
                            <div className="mr-3">
                              {notification.type === 'achievement' && <FaMedal className="text-yellow-500" />}
                              {notification.type === 'mission' && <FaRocket className="text-blue-500" />}
                              {notification.type === 'reward' && <FaStar className="text-purple-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${!notification.read ? 'font-medium text-white' : 'text-gray-300'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                1 hour ago
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-700">
                      <button className="text-xs text-blue-400 hover:text-blue-300">
                        Mark all as read
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User profile dropdown */}
          <div className="relative ml-4">
            <div>
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white border border-gray-600">
                  {user?.displayName?.charAt(0) || <FaUser />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar navigation - hidden on mobile */}
        <AnimatePresence>
          {(mobileMenuOpen || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'tween' }}
              className={`bg-gray-800 w-64 border-r border-gray-700 overflow-y-auto flex-shrink-0 
                ${mobileMenuOpen ? 'fixed inset-y-0 left-0 z-40 md:relative md:z-0' : 'hidden md:block'}`}
            >
              {/* User profile summary */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white border border-gray-600 mr-3">
                    {user?.displayName?.charAt(0) || <FaUser />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-white font-medium truncate">
                      {user?.displayName || 'Game Player'}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Level {playerStats.level} Explorer
                    </p>
                  </div>
                </div>
                
                {/* XP progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">XP Progress</span>
                    <span className="text-gray-400">{playerStats.xp} / {playerStats.maxXp}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      initial={{ width: '0%' }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                
                {/* Quick stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-gray-700/50 rounded p-2 text-center">
                    <span className="text-xs text-gray-400">Achievements</span>
                    <div className="flex items-center justify-center mt-1">
                      <FaMedal className="text-yellow-500 mr-1" />
                      <span className="text-white font-medium">{playerStats.achievements}</span>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 rounded p-2 text-center">
                    <span className="text-xs text-gray-400">Missions</span>
                    <div className="flex items-center justify-center mt-1">
                      <FaRocket className="text-blue-500 mr-1" />
                      <span className="text-white font-medium">{playerStats.completedMissions}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation links */}
              <nav className="px-3 py-4">
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path || 
                                     (item.path !== '/student/dashboard' && location.pathname.startsWith(item.path));
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                          ${isActive
                            ? 'bg-indigo-800 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className={`mr-3 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Game stats section */}
                <div className="mt-8 pt-4 border-t border-gray-700">
                  <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Game Stats
                  </h3>
                  <div className="mt-2 space-y-1">
                    {Object.entries(equippedStats).map(([stat, value]) => (
                      <div key={stat} className="flex justify-between items-center px-3 py-1 text-sm">
                        <span className="text-gray-400 capitalize">{stat}</span>
                        <span className={value > 0 ? 'text-green-400' : 'text-red-400'}>
                          {value > 0 ? `+${value}` : value}
                        </span>
                      </div>
                    ))}
                    
                    {Object.keys(equippedStats).length === 0 && (
                      <div className="px-3 py-2 text-sm text-gray-500 italic">
                        No active bonuses
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Logout button */}
                <div className="mt-8 pt-4 border-t border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-red-800/30 hover:text-white w-full"
                  >
                    <FaSignOutAlt className="mr-3 flex-shrink-0 text-gray-400" />
                    <span>Log out</span>
                  </button>
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

GameLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameLayout;