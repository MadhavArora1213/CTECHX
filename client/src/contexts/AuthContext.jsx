import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginWithUsernameAndClub, registerUser, logoutUser, getUserData } from '../utils/firebaseAuth';
import { getCurrentUser, isAuthenticated } from '../utils/sessionUtils';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage when the app starts
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Login with username and club
  const login = async (username, password, skillClub) => {
    const result = await loginWithUsernameAndClub(username, password, skillClub);
    if (result.success) {
      setCurrentUser(result.userData);
    }
    return result;
  };

  // Register new user
  const signup = async (userData) => {
    return await registerUser(userData);
  };

  // Logout user
  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setCurrentUser(null);
    }
    return result;
  };

  // Get user data
  const refreshUserData = async (userId) => {
    if (!userId && currentUser) {
      userId = currentUser.id;
    }
    
    if (userId) {
      const result = await getUserData(userId);
      if (result.success) {
        setCurrentUser(result.userData);
      }
      return result;
    }
    return { success: false, error: 'No user ID provided' };
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    refreshUserData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;