import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, useParams } from 'react-router-dom';
import StudentReport from '../../components/student/StudentReport';

const StudentDashboard = () => {
  const { userId } = useParams();
  const { userProfile } = useOutletContext() || {};

  const quickLinks = [
    {
      title: "View Profile",
      link: `/student/${userId}/profile`
    },
    {
      title: "Lessons",
      link: `/student/${userId}/lessons`
    },
    {
      title: "Achievements",
      link: `/student/${userId}/achievements`
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {userProfile?.username}!
      </h1>
      <p className="mb-4">You're logged in to the {userProfile?.club} club.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="list-disc pl-5">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.link} className="text-blue-400 hover:underline">{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-6">Your Progress Report</h2>
        <StudentReport />
      </div>
    </div>
  );
};

export default StudentDashboard;