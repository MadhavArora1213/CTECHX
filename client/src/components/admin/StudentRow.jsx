import React from 'react';
import { Link } from 'react-router-dom';

const StudentRow = ({ student, onDelete }) => {
  const { id, name, level, xp, club, batch } = student;

  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium text-lg">
            {name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{name}</div>
            <div className="text-sm text-gray-400">{batch}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-300">{club}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-900 text-purple-200">
          Level {level}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {xp} XP
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2 justify-end">
          <Link 
            to={`/admin/student/${id}`}
            className="text-indigo-400 hover:text-indigo-300"
          >
            View Book
          </Link>
          <Link 
            to={`/admin/report/${id}`}
            className="text-emerald-400 hover:text-emerald-300"
          >
            Edit Report
          </Link>
          <button 
            onClick={() => onDelete(id)}
            className="text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;