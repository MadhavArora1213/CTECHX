// src/contexts/LoggingContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logService from '../services/logService';

const LoggingContext = createContext();

export const LoggingProvider = ({ children }) => {
  const location = useLocation();
  
  // Log page views automatically
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // Set user in log service
      logService.setUser(currentUser);
      
      // Log the page view
      const pageName = location.pathname;
      logService.logPageView(pageName);
    }
  }, [location.pathname]);
  
  // Export logging functions
  const contextValue = {
    logClick: logService.logClick.bind(logService),
    logFormSubmit: logService.logFormSubmit.bind(logService),
    logLessonStart: logService.logLessonStart.bind(logService),
    logLessonComplete: logService.logLessonComplete.bind(logService),
    logAchievementUnlocked: logService.logAchievementUnlocked.bind(logService),
    logEvent: logService.logEvent.bind(logService)
  };
  
  return (
    <LoggingContext.Provider value={contextValue}>
      {children}
    </LoggingContext.Provider>
  );
};

// Custom hook to use the logging context
export const useLogging = () => {
  const context = useContext(LoggingContext);
  
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  
  return context;
};