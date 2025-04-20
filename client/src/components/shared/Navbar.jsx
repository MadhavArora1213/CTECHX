import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} text-gray-900`}>
            <div className="text-xl font-bold">
                <Link to="/">CTechX</Link>
            </div>
            <div className="flex space-x-4">
                <Link to="/student/book" className="hover:text-blue-500">Book</Link>
                <Link to="/student/profile" className="hover:text-blue-500">Profile</Link>
                <Link to="/student/achievements" className="hover:text-blue-500">Achievements</Link>
                <button onClick={toggleTheme} className="hover:text-blue-500">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;