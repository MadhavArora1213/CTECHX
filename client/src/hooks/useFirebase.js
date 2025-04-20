import { useState, useEffect } from 'react';
import { auth, db, storage } from '../utils/firebase';

export function useFirebase() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    currentUser,
    loading,
    auth,
    db,
    storage
  };
}

// Export auth directly for convenience
export { auth, db, storage };