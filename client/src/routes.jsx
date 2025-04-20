import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loading from './components/shared/Loading';

// Import pages
import Login from './pages/auth/Login';
import Landing from './Landing_Page/LandingPage';
import StudentLayout from './components/layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentLessons from './pages/student/StudentLessons';
import StudentAchievements from './pages/student/StudentAchievements';
import StudentReport from './pages/student/StudentReport';

// Import game-related pages
import GameHub from './pages/game/GameHub';
import PlanetView from './pages/game/PlanetView';
import AchievementsView from './pages/game/AchievementsView';
import InventoryView from './pages/game/InventoryView';
import LeaderboardView from './pages/game/LeaderboardView';

// Import context provider
import { InventoryProvider } from './contexts/InventoryContext';

// Import the wrapper
import GameRouteWrapper from './components/game/GameRouteWrapper';

// Root component with loading state
const RootRoute = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only show loading on first visit
    const hasVisited = sessionStorage.getItem('hasVisitedRoot');
    
    if (!hasVisited) {
      // Set a timeout to hide the loading screen
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasVisitedRoot', 'true');
      }, 3000); // Adjust time as needed
      
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);
  
  // Show loading or landing page
  return loading ? <Loading /> : <Landing />;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root route with conditional loading */}
      <Route path="/" element={<RootRoute />} />
      
      {/* These routes will never show loading */}
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Navigate to="/login" replace />} />
      
      {/* Protected Student Routes */}
      <Route path="/student/:userId" element={
        <ProtectedRoute>
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="lessons" element={<StudentLessons />} />
        <Route path="achievements" element={<StudentAchievements />} />
        <Route path="report" element={<StudentReport />} />
        
        {/* Wrap ALL game routes with GameRouteWrapper */}
        <Route path="gaming" element={
          <GameRouteWrapper>
            <GameHub />
          </GameRouteWrapper>
        } />
        <Route path="gaming/planets" element={
          <GameRouteWrapper>
            <PlanetView />
          </GameRouteWrapper>
        } />
        <Route path="gaming/achievements" element={
          <GameRouteWrapper>
            <AchievementsView />
          </GameRouteWrapper>
        } />
        <Route path="gaming/inventory" element={
          <GameRouteWrapper>
            <InventoryView />
          </GameRouteWrapper>
        } />
        <Route path="gaming/leaderboard" element={
          <GameRouteWrapper>
            <LeaderboardView />
          </GameRouteWrapper>
        } />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;