import React from 'react';

const BookPage = ({ monthName, monthData }) => {
  // Default values if monthData is missing or incomplete
  const attendance = monthData?.attendance || 0;
  const xp = monthData?.xp || 0;
  const badges = monthData?.badges || [];
  const feedback = monthData?.feedback || "No feedback available for this month.";

  return (
    <div className="book-page relative p-8 bg-gradient-to-br from-gray-800 to-gray-900 min-h-[600px] overflow-y-auto">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      {/* Page header */}
      <div className="text-center mb-8 pb-2 border-b border-gray-600">
        <h2 className="text-3xl font-bold text-indigo-400">{monthName}</h2>
        <div className="h-1 w-24 bg-indigo-500 mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Monthly Statistics
          </h3>
          <div className="space-y-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div>
              <div className="flex justify-between mb-2">
                <span>Attendance</span>
                <span className="font-medium">{attendance}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${attendance}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>XP Earned</span>
                <span className="font-medium">{xp} XP</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-indigo-500 h-2.5 rounded-full" 
                  style={{ width: `${Math.min((xp / 200) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Badges Earned
          </h3>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            {badges && badges.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-purple-900/50 border border-purple-500 text-purple-200 rounded-full text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-center py-2">No badges earned this month.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
            Mentor Feedback
          </h3>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8">
            <p className="text-gray-300 italic leading-relaxed">{feedback}</p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Activities
          </h3>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
            {monthData?.activities && monthData.activities.length > 0 ? (
              <div className="space-y-3">
                {monthData.activities.map((activity, index) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                    <h4 className="font-medium">{activity.name}</h4>
                    <p className="text-sm text-gray-400">{activity.date}</p>
                    <p className="text-sm text-green-400 mt-1">+{activity.xp} XP</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic text-center py-2">No activities recorded this month.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Page number watermark */}
      <div className="absolute bottom-4 right-4 opacity-30 text-gray-500 text-sm font-medium">
        CTechX Journal
      </div>
    </div>
  );
};

export default BookPage;