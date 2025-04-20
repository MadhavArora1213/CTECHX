// client/src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layout components
import AuthLayout from '../components/layouts/AuthLayout';
import StudentLayout from '../components/layouts/StudentLayout';
import TeacherLayout from '../components/layouts/TeacherLayout';
import AdminLayout from '../components/layouts/AdminLayout';
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy-loaded page components for better performance
// Auth pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Student pages
const StudentDashboard = lazy(() => import('../pages/student/Dashboard'));
const StudentLearningPath = lazy(() => import('../pages/student/LearningPath'));
const StudentCourses = lazy(() => import('../pages/student/Courses'));
const CourseDetails = lazy(() => import('../pages/student/CourseDetails'));
const StudentProfile = lazy(() => import('../pages/student/Profile'));
const StudentSettings = lazy(() => import('../pages/student/Settings'));
const StudentSchedule = lazy(() => import('../pages/student/Schedule'));

// Game pages
const GameHub = lazy(() => import('../pages/game/GameHub'));
const PlanetView = lazy(() => import('../pages/game/PlanetView'));
const MissionView = lazy(() => import('../pages/game/MissionView'));
const AchievementsView = lazy(() => import('../pages/game/AchievementsView'));
const InventoryView = lazy(() => import('../pages/game/InventoryView'));
const LeaderboardView = lazy(() => import('../pages/game/LeaderboardView'));

// Teacher pages
const TeacherDashboard = lazy(() => import('../pages/teacher/Dashboard'));
const TeacherStudents = lazy(() => import('../pages/teacher/Students'));
const TeacherCourses = lazy(() => import('../pages/teacher/Courses'));

// Admin pages
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/admin/Users'));

// Error pages
const NotFound = lazy(() => import('../pages/errors/NotFound'));
const Forbidden = lazy(() => import('../pages/errors/Forbidden'));

// Route protection component
const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to forbidden if user doesn't have required role
    return <Navigate to="/forbidden" replace />;
  }
  
  return element;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        
        {/* Student routes */}
        <Route path="/student" element={
          <ProtectedRoute 
            element={<StudentLayout />} 
            allowedRoles={['student']} 
          />
        }>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="learning-path" element={<StudentLearningPath />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="profile/:userId" element={<StudentProfile />} />
          <Route path="settings" element={<StudentSettings />} />
          <Route path="schedule" element={<StudentSchedule />} />
          
          {/* Game routes */}
          <Route path="gaming" element={<GameHub />} />
          <Route path="gaming/planet/:planetId" element={<PlanetView />} />
          <Route path="gaming/mission/:missionId" element={<MissionView />} />
          <Route path="gaming/achievements" element={<AchievementsView />} />
          <Route path="gaming/inventory" element={<InventoryView />} />
          <Route path="gaming/leaderboard" element={<LeaderboardView />} />
        </Route>
        
        {/* Teacher routes */}
        <Route path="/teacher" element={
          <ProtectedRoute 
            element={<TeacherLayout />} 
            allowedRoles={['teacher', 'admin']} 
          />
        }>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute 
            element={<AdminLayout />} 
            allowedRoles={['admin']} 
          />
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
        
        {/* Error routes */}
        <Route path="forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;