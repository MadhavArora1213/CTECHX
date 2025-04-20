import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Loading from '../../components/shared/Loading'; // Using your existing Loading component
import logService from '../../services/logService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [skillClub, setSkillClub] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for first-time visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setShowSplash(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      // Hide splash after timeout
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 4000); // Match your loading animation duration
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim() || !password || !skillClub) {
      setError('All fields are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Query Firebase directly
      const studentsRef = collection(db, "students");
      const q = query(
        studentsRef, 
        where("username", "==", username),
        where("club", "==", skillClub)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Invalid username or club. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Get user data
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      // Verify password
      if (userData.password !== password) {
        setError('Incorrect password');
        setIsLoading(false);
        return;
      }
      
      // User authenticated - create simple session
      const userSession = {
        id: userDoc.id,
        username: userData.username,
        club: userData.club
      };
      
      // Store in local storage
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      
      // Initialize logging with user data
      logService.setUser(userSession);
      
      // Log the login event
      await logService.logEvent('LOGIN', { 
        username: userData.username,
        club: userData.club,
        loginTime: new Date().toISOString()
      });
      
      // Check if we were trying to access a protected route
      const from = location.state?.from || `/student/${userDoc.id}/dashboard`;
      
      // Navigate user to dashboard with their ID
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show the loading component on first visit
  if (showSplash) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 px-4 py-8">
      <motion.div 
        className="w-full max-w-md bg-gray-800/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
            Welcome to CTechX
          </h2>
          <p className="text-gray-400 mt-1">Sign in to continue your journey</p>
        </div>

        {error && (
          <motion.div 
            className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="skillClub">
              Skill Club
            </label>
            <select
              id="skillClub"
              value={skillClub}
              onChange={(e) => setSkillClub(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
              disabled={isLoading}
            >
              <option value="" disabled>Select your club</option>
              <option value="web">Web Development</option>
              <option value="ai-ml">AI/ML</option>
              <option value="android">Android Development</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="digital-marketing">Digital Marketing</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.03 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;