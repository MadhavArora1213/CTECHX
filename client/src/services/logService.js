// src/services/logService.js
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

class LogService {
  constructor() {
    this.logsCollection = collection(db, "logs");
    this.userId = null;
    this.username = null;
    this.userClub = null;
  }

  // Initialize with user info
  setUser(userData) {
    this.userId = userData.id;
    this.username = userData.username;
    this.userClub = userData.club;
  }

  // Clear user data on logout
  clearUser() {
    this.userId = null;
    this.username = null;
    this.userClub = null;
  }

  // Generic log function
  async logEvent(eventType, details = {}) {
    if (!this.userId) return;
    
    try {
      const logEntry = {
        userId: this.userId,
        username: this.username,
        club: this.userClub,
        eventType,
        details,
        timestamp: serverTimestamp(),
        sessionId: this.getSessionId(),
        userAgent: navigator.userAgent,
        path: window.location.pathname
      };
      
      await addDoc(this.logsCollection, logEntry);
      console.debug("Logged event:", eventType);
    } catch (error) {
      console.error("Error logging event:", error);
    }
  }

  // Specific event logging functions
  async logPageView(pageName) {
    await this.logEvent('PAGE_VIEW', { pageName });
  }

  async logClick(elementId, elementName) {
    await this.logEvent('CLICK', { elementId, elementName });
  }

  async logFormSubmit(formName, success, formData = {}) {
    await this.logEvent('FORM_SUBMIT', { formName, success, ...formData });
  }

  async logLessonStart(lessonId, lessonName) {
    await this.logEvent('LESSON_START', { lessonId, lessonName });
  }

  async logLessonComplete(lessonId, lessonName, timeSpentSeconds) {
    await this.logEvent('LESSON_COMPLETE', { lessonId, lessonName, timeSpentSeconds });
  }

  async logAchievementUnlocked(achievementId, achievementName) {
    await this.logEvent('ACHIEVEMENT', { achievementId, achievementName });
  }

  // Helper function to maintain consistent session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('loggingSessionId');
    
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      sessionStorage.setItem('loggingSessionId', sessionId);
    }
    
    return sessionId;
  }
}

// Singleton instance
export const logService = new LogService();
export default logService;