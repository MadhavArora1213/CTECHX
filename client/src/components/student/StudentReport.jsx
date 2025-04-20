import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';

const StudentReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  
  useEffect(() => {
    const fetchStudentReport = async () => {
      try {
        // Fetch the student data
        const studentRef = doc(db, "students", userId);
        const studentSnap = await getDoc(studentRef);
        
        if (studentSnap.exists()) {
          const studentData = studentSnap.data();
          
          // Create sample report data (in real app, this would be fetched from Firebase)
          setReportData({
            name: studentData.name,
            level: studentData.level || 1,
            xp: studentData.xp || 0,
            totalXp: studentData.totalXp || 1000,
            club: studentData.club,
            achievements: studentData.achievements || [],
            skills: [
              { name: 'HTML/CSS', progress: 75 },
              { name: 'JavaScript', progress: 60 },
              { name: 'React', progress: 45 },
              { name: 'Firebase', progress: 30 },
            ],
            completedLessons: studentData.completedLessons || 0,
            totalLessons: 20
          });
        }
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentReport();
  }, [userId]);
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading report card...</div>;
  }
  
  if (!reportData) {
    return <div className="text-center text-red-400">Unable to load report card</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Student Report Card</h2>
          <div className="px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full">
            <span className="text-white font-medium">Level {reportData.level}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-4">Student Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-medium">{reportData.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Club:</span>
                <span className="text-white font-medium">
                  {reportData.club === 'web' ? 'Web Development' : 
                   reportData.club === 'ai-ml' ? 'AI/ML' : 
                   reportData.club === 'android' ? 'Android Development' : 
                   reportData.club === 'cybersecurity' ? 'Cybersecurity' : 
                   reportData.club === 'digital-marketing' ? 'Digital Marketing' : 
                   'Unknown Club'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">XP Progress:</span>
                <span className="text-white font-medium">{reportData.xp}/{reportData.totalXp}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Lessons Completed:</span>
                <span className="text-white font-medium">{reportData.completedLessons}/{reportData.totalLessons}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-4">Skill Progress</h3>
            <div className="space-y-4">
              {reportData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-400">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Recent Achievements</h3>
          
          {reportData.achievements.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {reportData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{achievement.icon || '🏆'}</div>
                  <h4 className="font-medium text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No achievements yet. Start completing lessons to earn badges!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentReport;