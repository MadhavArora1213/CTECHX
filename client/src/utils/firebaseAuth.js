import { db } from './firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { createUserSession, destroyUserSession } from './sessionUtils';

// Login with username, password and club
export const loginWithUsernameAndClub = async (username, password, skillClub) => {
  try {
    // Query Firestore to find user by username
    const usersRef = collection(db, "students");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    // Check if user exists
    if (querySnapshot.empty) {
      return { success: false, error: 'user-not-found' };
    }
    
    // Get user data
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Check if password matches
    if (userData.password !== password) {
      return { success: false, error: 'wrong-password' };
    }
    
    // Check if club matches
    if (userData.club !== skillClub) {
      return { success: false, error: 'wrong-club' };
    }
    
    // Update last login timestamp
    await updateDoc(doc(db, "students", userDoc.id), {
      lastLogin: serverTimestamp()
    });
    
    // Create user session
    createUserSession({
      id: userDoc.id,
      username: userData.username,
      name: userData.name,
      club: userData.club
    });
    
    // Return success with user data
    return { 
      success: true, 
      userId: userDoc.id,
      userData: {
        id: userDoc.id,
        username: userData.username,
        name: userData.name,
        club: userData.club,
        level: userData.level || 1,
        xp: userData.xp || 0,
        totalXp: userData.totalXp || 1000
      }
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: 'An error occurred during login' };
  }
};

// Register new user with username
export const registerUser = async (userData) => {
  try {
    // Check if username already exists
    const usernameQuery = query(collection(db, "students"), where("username", "==", userData.username));
    const usernameSnapshot = await getDocs(usernameQuery);
    
    if (!usernameSnapshot.empty) {
      return { success: false, error: 'Username already taken' };
    }
    
    // Create new document in students collection
    const newUserRef = doc(collection(db, "students"));
    
    // Set user data
    await setDoc(newUserRef, {
      username: userData.username,
      password: userData.password, // In a real app, never store plain passwords!
      name: userData.name,
      club: userData.club,
      level: 1,
      xp: 0,
      totalXp: 1000,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
    
    return { 
      success: true, 
      userId: newUserRef.id 
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    destroyUserSession();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: error.message };
  }
};

// Get user data by ID
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "students", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { 
        success: true, 
        userData: {
          id: userSnap.id,
          username: userData.username,
          name: userData.name,
          club: userData.club,
          level: userData.level || 1,
          xp: userData.xp || 0,
          totalXp: userData.totalXp || 1000
        }
      };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error("Get user data error:", error);
    return { success: false, error: error.message };
  }
};