// src/components/common/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { motion } from 'framer-motion';

/**
 * Protected route component that handles authentication and authorization
 */
const ProtectedRoute = ({
  children,
  requireAuth = true, // Does this route require authentication?
  requiredRole = null, // Optional role requirement (admin, student, etc)
  redirectTo = '/login', // Where to redirect if auth fails
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyUserAccess = async () => {
      try {
        // Get user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // If no user and auth is required, not authorized
        if (!currentUser && requireAuth) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
        
        // If user exists but no role check needed, they're authorized
        if (currentUser && !requiredRole) {
          setIsAuthorized(true);
          setIsLoading(false);
          return;
        }
        
        // If role check is needed, verify it from Firestore
        if (currentUser && requiredRole) {
          const userDoc = await getDoc(doc(db, "students", currentUser.id));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Check if user has the required role
            setIsAuthorized(userData.role === requiredRole);
          } else {
            setIsAuthorized(false);
          }
        }
      } catch (error) {
        console.error('Error verifying authorization:', error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserAccess();
  }, [requireAuth, requiredRole]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Verifying access...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect if not authorized
  if (!isAuthorized) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Render children if authorized
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requireAuth: PropTypes.bool,
  requiredRole: PropTypes.string,
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;