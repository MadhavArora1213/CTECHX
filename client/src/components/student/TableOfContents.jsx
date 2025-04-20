import React from 'react';

const TableOfContents = ({ months, currentMonth, onSelectMonth }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-400">Table of Contents</h2>
      
      <div className="border-b border-gray-600 mb-6"></div>
      
      <div className="space-y-4">
        {months.map((month, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-md cursor-pointer transition-colors ${
              month === currentMonth 
                ? 'bg-indigo-900/50 border-l-4 border-indigo-500' 
                : 'hover:bg-gray-700'
            }`}
            onClick={() => onSelectMonth(month)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">{month}</h3>
              <span className="text-sm text-gray-400">Chapter {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-600 mt-6 pt-6">
        <div className="flex items-center space-x-2 text-gray-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Click on a month to navigate to that chapter</span>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
