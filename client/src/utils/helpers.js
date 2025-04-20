import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Helper function for student activity data
export const getStudentActivity = async (startDate, endDate) => {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(
      activitiesRef, 
      where('timestamp', '>=', startDate),
      where('timestamp', '<=', endDate)
    );
    
    const snapshot = await getDocs(q);
    const activities = [];
    
    snapshot.forEach(doc => {
      activities.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return processActivityData(activities);
  } catch (error) {
    console.error("Error fetching student activity:", error);
    return [];
  }
};

const processActivityData = (activities) => {
  // Group activities by date
  const groupedByDate = activities.reduce((acc, activity) => {
    const date = new Date(activity.timestamp.toDate()).toISOString().split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(activity);
    return acc;
  }, {});
  
  // Format for charts
  return {
    labels: Object.keys(groupedByDate),
    datasets: [{
      label: 'Activity Count',
      data: Object.values(groupedByDate).map(group => group.length),
      backgroundColor: 'rgba(129, 140, 248, 0.6)',
      borderColor: 'rgb(129, 140, 248)',
      borderWidth: 1
    }]
  };
};

// Additional helper functions
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const calculateXpForNextLevel = (currentLevel) => {
  return Math.floor(100 * Math.pow(1.5, currentLevel));
};

export const calculateXPProgress = (currentXP, levelXP) => {
    return ((currentXP / levelXP) * 100).toFixed(2);
};

export const getBadgeColor = (badgeType) => {
    const badgeColors = {
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
    };
    return badgeColors[badgeType] || '#FFFFFF';
};

export const generateRandomID = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9);
};