import React from 'react';
import Dashboard from '../../components/admin/Dashboard';
import StudentManager from '../../components/admin/StudentManager';
import BadgeControl from '../../components/admin/BadgeControl';

const AdminDashboard = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <header className="p-4 bg-gray-800">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </header>
            <main className="flex-grow p-4">
                <Dashboard />
                <StudentManager />
                <BadgeControl />
            </main>
        </div>
    );
};

export default AdminDashboard;