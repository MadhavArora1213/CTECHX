import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Predefined achievements that can be unlocked
const AVAILABLE_ACHIEVEMENTS = [
  {
    id: 'first_visit',
    title: 'First Contact',
    description: 'Visited the site for the first time',
    icon: '👋',
    requirement: 'visit',
    points: 25
  },
  {
    id: 'scroll_explorer',
    title: 'Explorer',
    description: 'Scrolled through all sections',
    icon: '🔍',
    requirement: 'scroll_all',
    points: 100
  },
  {
    id: 'feature_curious',
    title: 'Feature Curious',
    description: 'Clicked on all features',
    icon: '🧩',
    requirement: 'feature_click',
    points: 75
  },
  {
    id: 'project_viewer',
    title: 'Project Observer',
    description: 'Viewed project details',
    icon: '📊',
    requirement: 'view_project',
    points: 50
  },
  {
    id: 'community_connector',
    title: 'Community Connector',
    description: 'Engaged with community profiles',
    icon: '🤝',
    requirement: 'community_engage',
    points: 50
  },
  {
    id: 'event_planner',
    title: 'Event Enthusiast',
    description: 'Checked out upcoming events',
    icon: '📅',
    requirement: 'view_events',
    points: 50
  },
  {
    id: 'sign_up',
    title: 'Recruit',
    description: 'Joined the community',
    icon: '🌟',
    requirement: 'signup',
    points: 200
  },
  {
    id: 'quick_clicker',
    title: 'Speed Demon',
    description: 'Clicked through sections in under 30 seconds',
    icon: '⚡',
    requirement: 'time_based',
    points: 150
  },
  {
    id: 'secret_finder',
    title: 'Easter Egg Hunter',
    description: 'Found a hidden interactive element',
    icon: '🥚',
    requirement: 'easter_egg',
    points: 300
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Visited the site after midnight',
    icon: '🦉',
    requirement: 'time_visit',
    timeCondition: { startHour: 0, endHour: 5 },
    points: 100
  }
];

const useAchievements = (onAchievement) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [progress, setProgress] = useState({
    visitedSections: [],
    clickedFeatures: 0,
    viewedProjects: false,
    engagedCommunity: false,
    viewedEvents: false,
    signedUp: false,
    startTime: Date.now(),
    foundEasterEggs: []
  });
  
  const [achievementNotification, setAchievementNotification] = useState(null);

  // Initialize with localStorage achievements if available
  useEffect(() => {
    const savedAchievements = localStorage.getItem('gameAchievements');
    if (savedAchievements) {
      try {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      } catch (e) {
        console.error("Error loading saved achievements", e);
      }
    }
    
    // Check for night owl achievement on load
    const currentHour = new Date().getHours();
    const nightOwl = AVAILABLE_ACHIEVEMENTS.find(a => a.id === 'night_owl');
    if (nightOwl && currentHour >= nightOwl.timeCondition.startHour && 
        currentHour <= nightOwl.timeCondition.endHour) {
      checkAndUnlockAchievement('night_owl');
    }
    
    // Mark first visit achievement
    checkAndUnlockAchievement('first_visit');
  }, []);
  
  // Save achievements to localStorage when they change
  useEffect(() => {
    if (unlockedAchievements.length > 0) {
      localStorage.setItem('gameAchievements', JSON.stringify(unlockedAchievements));
    }
  }, [unlockedAchievements]);

  // Main function to check and unlock achievements
  const checkAndUnlockAchievement = useCallback((achievementId) => {
    // Check if already unlocked
    if (unlockedAchievements.some(a => a.id === achievementId)) {
      return false;
    }
    
    // Find the achievement definition
    const achievement = AVAILABLE_ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return false;
    
    // Add timestamp and unique instance ID
    const unlockedAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString(),
      instanceId: uuidv4()
    };
    
    // Add to unlocked list
    setUnlockedAchievements(prev => [...prev, unlockedAchievement]);
    
    // Show notification
    setAchievementNotification(unlockedAchievement);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setAchievementNotification(null);
    }, 3000);
    
    // Call the callback if provided
    if (onAchievement) {
      onAchievement(unlockedAchievement);
    }
    
    return true;
  }, [unlockedAchievements, onAchievement]);

  // Track section visits
  const trackSectionVisit = useCallback((sectionId) => {
    setProgress(prev => {
      // If already visited, just return current state
      if (prev.visitedSections.includes(sectionId)) {
        return prev;
      }
      
      const newVisitedSections = [...prev.visitedSections, sectionId];
      
      // Check for explorer achievement
      if (newVisitedSections.length >= 6) {
        checkAndUnlockAchievement('scroll_explorer');
      }
      
      return {
        ...prev,
        visitedSections: newVisitedSections
      };
    });
  }, [checkAndUnlockAchievement]);
  
  // Track feature clicks
  const trackFeatureClick = useCallback(() => {
    setProgress(prev => {
      const newClickedFeatures = prev.clickedFeatures + 1;
      
      // Unlock achievement after clicking 5 features
      if (newClickedFeatures >= 5) {
        checkAndUnlockAchievement('feature_curious');
      }
      
      return {
        ...prev,
        clickedFeatures: newClickedFeatures
      };
    });
  }, [checkAndUnlockAchievement]);
  
  // Track project views
  const trackProjectView = useCallback(() => {
    setProgress(prev => {
      if (!prev.viewedProjects) {
        checkAndUnlockAchievement('project_viewer');
        return {
          ...prev,
          viewedProjects: true
        };
      }
      return prev;
    });
  }, [checkAndUnlockAchievement]);
  
  // Track community engagement
  const trackCommunityEngagement = useCallback(() => {
    setProgress(prev => {
      if (!prev.engagedCommunity) {
        checkAndUnlockAchievement('community_connector');
        return {
          ...prev,
          engagedCommunity: true
        };
      }
      return prev;
    });
  }, [checkAndUnlockAchievement]);
  
  // Track event views
  const trackEventView = useCallback(() => {
    setProgress(prev => {
      if (!prev.viewedEvents) {
        checkAndUnlockAchievement('event_planner');
        return {
          ...prev,
          viewedEvents: true
        };
      }
      return prev;
    });
  }, [checkAndUnlockAchievement]);
  
  // Track signup
  const trackSignup = useCallback(() => {
    setProgress(prev => {
      if (!prev.signedUp) {
        checkAndUnlockAchievement('sign_up');
        return {
          ...prev,
          signedUp: true
        };
      }
      return prev;
    });
  }, [checkAndUnlockAchievement]);
  
  // Track speed navigation (checks if user navigated through all sections quickly)
  const checkNavigationSpeed = useCallback(() => {
    setProgress(prev => {
      const timeSpent = Date.now() - prev.startTime;
      // If visited all sections in under 30 seconds
      if (prev.visitedSections.length >= 6 && timeSpent < 30000) {
        checkAndUnlockAchievement('quick_clicker');
      }
      return prev;
    });
  }, [checkAndUnlockAchievement]);
  
  // Track easter egg finds
  const trackEasterEgg = useCallback((eggId) => {
    setProgress(prev => {
      if (prev.foundEasterEggs.includes(eggId)) {
        return prev;
      }
      
      checkAndUnlockAchievement('secret_finder');
      
      return {
        ...prev,
        foundEasterEggs: [...prev.foundEasterEggs, eggId]
      };
    });
  }, [checkAndUnlockAchievement]);
  
  return {
    unlockedAchievements,
    achievementNotification,
    availableAchievements: AVAILABLE_ACHIEVEMENTS,
    trackSectionVisit,
    trackFeatureClick,
    trackProjectView,
    trackCommunityEngagement,
    trackEventView,
    trackSignup,
    checkNavigationSpeed,
    trackEasterEgg,
    checkAndUnlockAchievement,
    progress
  };
};

export default useAchievements;