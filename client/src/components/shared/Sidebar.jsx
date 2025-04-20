import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-5">
            <h2 className="text-xl font-bold mb-4">CTechX</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <NavLink to="/student/book" className="hover:text-gray-400">
                            Student Book
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/student/profile" className="hover:text-gray-400">
                            Profile
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/student/achievements" className="hover:text-gray-400">
                            Achievements
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/dashboard" className="hover:text-gray-400">
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/student-list" className="hover:text-gray-400">
                            Student List
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/report-editor" className="hover:text-gray-400">
                            Report Editor
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to="/admin/panel" className="hover:text-gray-400">
                            Admin Panel
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;