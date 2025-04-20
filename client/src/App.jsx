import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoggingProvider } from './contexts/LoggingContext';
import { GameProvider } from './contexts/GameContext'; // Add GameProvider if you have one
import { Toaster } from 'react-hot-toast'; // For notifications
import AppRoutes from './routes';
import ErrorBoundary from './components/common/ErrorBoundary'; // Error boundary component
import Loading from './components/shared/Loading.jsx';
import GameLoading from './components/shared/GameLoading.jsx';

// Import Firebase configuration to ensure it's initialized
import './utils/firebase';

// Lazy load landing pages for better performance
const LandingPage = lazy(() => import('./Landing_Page/LandingPage'));
const GameLandingPage = lazy(() => import('./Game/GameLandingPage'));

function App() {
  const [loading, setLoading] = useState(true);
  const [gameLoading, setGameLoading] = useState(true);
  const [appInitialized, setAppInitialized] = useState(false);

  // Initialize app and handle startup tasks
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Any initialization tasks can go here
        // For example: Firebase auth state checking, preloading essential data, etc.
        
        // Set initialized state when complete
        setAppInitialized(true);
      } catch (error) {
        console.error("App initialization error:", error);
        setAppInitialized(true); // Still mark as initialized so UI shows something
      }
    };
    
    initializeApp();
  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Separate loading handler for game page
  const handleGameLoadingComplete = () => {
    setGameLoading(false);
  };

  // Show initial loading screen
  if (loading || !appInitialized) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <ThemeProvider>
            <LoggingProvider>
              <GameProvider>
                <div className="min-h-screen bg-gray-900 text-white">
                  <Suspense fallback={<Loading />}>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route 
                        path="/game" 
                        element={
                          gameLoading ? 
                            <GameLoading onComplete={handleGameLoadingComplete} /> :
                            <GameLandingPage />
                        } 
                      />
                      {/* Add a direct route to game features */}
                      <Route path="/game/*" element={<Navigate to="/student/gaming" replace />} />
                      
                      {/* Handle all other routes */}
                      <Route path="/*" element={<AppRoutes />} />
                    </Routes>
                  </Suspense>
                </div>
                
                {/* Global toast notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: '#2D3748',
                      color: '#fff',
                    },
                    success: {
                      duration: 3000,
                      iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      duration: 4000,
                      iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              </GameProvider>
            </LoggingProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;