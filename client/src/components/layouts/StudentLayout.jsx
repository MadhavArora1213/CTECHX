import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FaGamepad, 
  FaGlobeAmericas,
  FaTrophy, 
  FaBoxOpen, 
  FaChartLine, 
  FaChevronDown 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { InventoryProvider } from '../../contexts/InventoryContext';

const StudentLayout = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Add this line - was missing
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);
  const gameMenuRef = useRef(null);

  // Game submenu items - make sure these match your route definitions
  const gameSubmenuItems = [
    { name: 'Game Home', path: `/student/${userId}/gaming`, icon: FaGamepad },
    { name: 'Planets', path: `/student/${userId}/gaming/planets`, icon: FaGlobeAmericas },
    { name: 'Achievements', path: `/student/${userId}/gaming/achievements`, icon: FaTrophy },
    { name: 'Inventory', path: `/student/${userId}/gaming/inventory`, icon: FaBoxOpen },
    { name: 'Leaderboard', path: `/student/${userId}/gaming/leaderboard`, icon: FaChartLine },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userId) return;
        
        const userDoc = doc(db, "students", userId);
        const userSnap = await getDoc(userDoc);
        
        if (userSnap.exists()) {
          setUserProfile({
            id: userSnap.id,
            ...userSnap.data()
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);

  // Handle clicks outside the game dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gameMenuRef.current && !gameMenuRef.current.contains(event.target)) {
        setGameDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fixed logout function
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login', { replace: true });
  };

  // Fixed function using the imported location
  const isGamingPath = () => {
    return location.pathname.includes(`/student/${userId}/gaming`);
  };

  // Check if current path matches a specific gaming path
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!userProfile) {
    return <div className="text-center text-red-500 p-8">User not found</div>;
  }

  // Check if the current path is a gaming route
  const isGamingRoute = location.pathname.includes(`/student/${userId}/gaming`);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Simple Student Navbar */}
      <nav className="bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-white">CTechX</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <NavLink to={`/student/${userId}/dashboard`} className={({isActive}) => 
                isActive ? "text-indigo-300" : "text-gray-300 hover:text-white"
              }>
                Dashboard
              </NavLink>
              <NavLink to={`/student/${userId}/lessons`} className={({isActive}) => 
                isActive ? "text-indigo-300" : "text-gray-300 hover:text-white"
              }>
                Lessons
              </NavLink>
              
              {/* Gaming dropdown menu */}
              <div className="relative" ref={gameMenuRef}>
                <button
                  onClick={() => setGameDropdownOpen(!gameDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                    isGamingPath() 
                      ? 'text-indigo-300 bg-gray-700' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <FaGamepad className="mr-1" />
                  <span>Tech Odyssey</span>
                  <FaChevronDown className={`ml-1.5 h-3 w-3 transition-transform ${gameDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {gameDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                    >
                      {gameSubmenuItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({isActive}) => `
                            flex items-center px-4 py-2 text-sm
                            ${isActive
                              ? 'bg-indigo-700 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }
                          `}
                          onClick={() => setGameDropdownOpen(false)}
                        >
                          <item.icon className="mr-3 text-indigo-400" />
                          {item.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <NavLink to={`/student/${userId}/achievements`} className={({isActive}) => 
                isActive ? "text-indigo-300" : "text-gray-300 hover:text-white"
              }>
                Achievements
              </NavLink>
              <NavLink to={`/student/${userId}/report`} className={({isActive}) => 
                isActive ? "text-indigo-300" : "text-gray-300 hover:text-white"
              }>
                Report
              </NavLink>
              <NavLink to={`/student/${userId}/profile`} className={({isActive}) => 
                isActive ? "text-indigo-300" : "text-gray-300 hover:text-white"
              }>
                Profile
              </NavLink>
              <button 
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="pt-20 pb-12">
        {isGamingRoute ? (
          <InventoryProvider>
            <Outlet context={{ userProfile }} />
          </InventoryProvider>
        ) : (
          <Outlet context={{ userProfile }} />
        )}
      </div>
    </div>
  );
};

export default StudentLayout;