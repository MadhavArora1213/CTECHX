import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import BookCover from '../../components/student/BookCover';
import '../../assets/styles/book.css';
import axios from 'axios';

const StudentBook = () => {
  const { studentId } = useParams();
  const { currentUser, userProfile } = useAuth();
  const [showCover, setShowCover] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const bookRef = useRef(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setTimeout(() => {
          setStudentData({
            name: userProfile?.name || currentUser?.displayName || 'Student',
            club: userProfile?.club || 'Tech Club',
            batch: userProfile?.batch || '2025',
            level: userProfile?.level || 3,
            xp: userProfile?.xp || 750,
            totalXp: userProfile?.totalXp || 1000,
          });

          const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
          ];

          const dummyReports = months.map((month, index) => ({
            month,
            attendance: 85 + (Math.random() * 15),
            xp: 120 + (index * 15),
            badges: Array(index % 3 + 1).fill(0).map((_, i) => ({
              id: `badge-${i}`,
              name: ['Coding Master', 'Team Player', 'Problem Solver'][i % 3],
              image: `https://cdn-icons-png.flaticon.com/512/2583/258${i + 3}636.png`
            })),
            feedback: index % 3 === 0 ?
              "Great progress this month! Continue focusing on practical applications." :
              index % 3 === 1 ?
              "Some challenges faced, but overcame with perseverance. Keep up the good work!" :
              "Excellent collaboration with teammates. Leadership skills are developing well.",
            activities: Array(Math.floor(Math.random() * 3) + 1).fill(0).map((_, i) => ({
              name: ['Hackathon', 'Workshop', 'Project Submission'][i % 3],
              date: `${month} ${10 + i}, 2025`,
              xp: 25 + (i * 10)
            }))
          }));

          setReports(dummyReports);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [currentUser, userProfile, studentId]);

  const handleOpenBook = () => {
    setShowCover(false);
  };

  const handleFlip = (e) => {
    const currentPage = e.data;
    if (currentPage === 0) {
      setShowCover(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mb-4"></div>
          <p className="text-indigo-300 text-lg font-medium">Loading your journey...</p>
        </motion.div>
      </div>
    );
  }

  if (showCover) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <BookCover studentData={studentData} onOpen={handleOpenBook} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-indigo-400">{studentData?.name || 'Student'}</h2>
          <p className="text-gray-400">{studentData?.club} - {studentData?.batch}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-medium">Level {studentData?.level}</span>
          <div className="w-48 bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${(studentData?.xp / studentData?.totalXp) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-400">{studentData?.xp}/{studentData?.totalXp} XP</span>
        </div>
      </div>

      <div className="book-container">
        <HTMLFlipBook
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={450}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="real-book"
          ref={bookRef}
        >
          <div className="demoPage book-cover bg-gradient-to-br from-indigo-900 to-purple-900">
            <div className="cover-content text-center p-8">
              <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-300">Growth Journal</h1>
              <h2 className="text-2xl font-semibold mb-8 text-gray-300">{studentData?.name}</h2>
              <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto border-4 border-indigo-500/50 flex items-center justify-center">
                <span className="text-5xl">{studentData?.name.charAt(0)}</span>
              </div>
              <div className="mt-8 text-gray-300">
                <p className="mb-1">Club: {studentData?.club}</p>
                <p>Batch: {studentData?.batch}</p>
              </div>
              <div className="mt-12 text-sm text-gray-400">Click to turn page</div>
            </div>
          </div>

          {reports.map((report, index) => (
            <div className="demoPage" key={report.month}>
              <div className="page-inner flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{report.month}</h2>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Attendance
                  </h4>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${report.attendance}%` }}></div>
                  </div>
                  <p className="text-right text-sm text-gray-400 mt-1">
                    {Math.round(report.attendance)}%
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Performance
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-indigo-900/30 border border-indigo-500/30 p-3 rounded-lg text-center">
                      <p className="text-xl font-bold text-indigo-400">{report.xp}</p>
                      <p className="text-xs text-gray-400">XP Earned</p>
                    </div>
                    <div className="bg-indigo-900/30 border border-indigo-500/30 p-3 rounded-lg text-center">
                      <p className="text-xl font-bold text-indigo-400">{report.badges.length}</p>
                      <p className="text-xs text-gray-400">Badges</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                    Mentor Feedback
                  </h4>
                  <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4">
                    <p className="text-gray-300 italic leading-relaxed">{report.feedback}</p>
                  </div>
                </div>

                {report.badges.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      Badges Earned
                    </h4>
                    <div className="flex space-x-2">
                      {report.badges.map((badge) => (
                        <div key={badge.id} className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-2 text-center flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold mb-1">🏆</div>
                          <span className="text-xs text-gray-300">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {report.activities && report.activities.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-300 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Activities
                    </h4>
                    <div className="space-y-3">
                      {report.activities.map((activity, i) => (
                        <div key={i} className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-3">
                          <h5 className="font-medium">{activity.name}</h5>
                          <p className="text-sm text-gray-400">{activity.date}</p>
                          <p className="text-sm text-green-400 mt-1">+{activity.xp} XP</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="demoPage book-cover bg-gradient-to-br from-indigo-900 to-purple-900">
            <div className="cover-content text-center">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-300">Your Journey Continues</h2>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="mt-8 text-gray-300 font-medium">Keep Growing!</p>
              <p className="mt-4 text-sm text-gray-400">Developed by CTechX</p>
            </div>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default StudentBook;