import React from 'react';

const BookCover = ({ studentData, onOpen }) => {
  return (
    <div className="book-cover relative cursor-pointer" onClick={onOpen}>
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-8 shadow-lg border-4 border-gray-700 transform transition-transform hover:scale-105 hover:shadow-2xl">
        {/* Book binding edge */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-l-lg"></div>
        
        <div className="text-center p-8 mt-4">
          <h1 className="text-4xl font-bold mb-8 text-white tracking-wide">The Book of Student Growth</h1>
          
          <div className="mb-12">
            <div className="h-28 w-28 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              {studentData?.avatar ? (
                <img src={studentData.avatar} alt="Student" className="h-24 w-24 rounded-full" />
              ) : (
                <span className="text-5xl font-bold text-indigo-400">
                  {studentData?.name ? studentData.name.charAt(0) : 'S'}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-semibold text-indigo-300">{studentData?.name || 'Student Name'}</h2>
            <p className="text-gray-300 mt-2">{studentData?.club || 'Club'} - {studentData?.batch || 'Batch'}</p>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium transition-colors shadow-lg">
              Open Book
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-8 right-8 text-gray-400 opacity-50 text-sm">
          CTechX Program
        </div>
      </div>
    </div>
  );
};

export default BookCover;
