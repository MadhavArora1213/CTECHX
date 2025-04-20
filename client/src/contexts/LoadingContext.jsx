// src/contexts/LoadingContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check if this is truly the first load of the session
    const hasLoaded = localStorage.getItem('hasInitiallyLoaded');
    
    if (!hasLoaded && window.location.pathname === '/') {
      // Only show loading on first visit to root
      setShowLoading(true);
      
      // Simulate loading time (you can replace this with actual data loading)
      const timer = setTimeout(() => {
        setShowLoading(false);
        setIsInitialLoad(false);
        localStorage.setItem('hasInitiallyLoaded', 'true');
      }, 2000); // 2 second loading screen
      
      return () => clearTimeout(timer);
    } else {
      // Skip loading for subsequent navigations
      setShowLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ isInitialLoad, showLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};