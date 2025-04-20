import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar userType="admin" />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;