import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for demo purposes
  const [students] = useState([
    { id: 1, name: 'John Doe', club: 'Tech Club', attendance: 85, progress: 72 },
    { id: 2, name: 'Jane Smith', club: 'Robotics Club', attendance: 92, progress: 88 },
    { id: 3, name: 'Mike Johnson', club: 'Coding Club', attendance: 78, progress: 65 },
  ]);
  
  const [clubs] = useState([
    { id: 1, name: 'Tech Club', members: 24 },
    { id: 2, name: 'Robotics Club', members: 18 },
    { id: 3, name: 'Coding Club', members: 22 },
  ]);
  
  const [tasks] = useState([
    { id: 1, title: 'Complete Project', deadline: '2025-05-01', assigned: 'Tech Club' },
    { id: 2, title: 'Submit Report', deadline: '2025-04-25', assigned: 'All' },
  ]);
  
  // Function to render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent students={students} clubs={clubs} tasks={tasks} />;
      case 'clubs':
        return <ClubsContent clubs={clubs} />;
      case 'marks':
        return <MarksContent students={students} />;
      case 'tasks':
        return <TasksContent tasks={tasks} students={students} />;
      case 'students':
        return <StudentsContent students={students} />;
      case 'attendance':
        return <AttendanceContent students={students} />;
      case 'materials':
        return <MaterialsContent />;
      case 'quizzes':
        return <QuizzesContent />;
      case 'reports':
        return <ReportsContent students={students} />;
      case 'progress':
        return <ProgressContent students={students} />;
      case 'notifications':
        return <NotificationsContent students={students} />;
      case 'assign':
        return <AssignContent students={students} />;
      default:
        return <DashboardContent students={students} clubs={clubs} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h1 className="text-xl font-bold mb-6 text-indigo-400">Admin Panel</h1>
        <nav>
          <ul className="space-y-2">
            <NavItem label="Dashboard" id="dashboard" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Manage Clubs" id="clubs" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Student Marks" id="marks" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Daily Tasks" id="tasks" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Student Data" id="students" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Attendance" id="attendance" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Learning Materials" id="materials" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Quizzes & Competitions" id="quizzes" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Monthly Reports" id="reports" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Progress Tracking" id="progress" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Notifications" id="notifications" active={activeTab} setActive={setActiveTab} />
            <NavItem label="Assign Tasks" id="assign" active={activeTab} setActive={setActiveTab} />
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ label, id, active, setActive }) => (
  <li>
    <button 
      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${active === id ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
      onClick={() => setActive(id)}
    >
      {label}
    </button>
  </li>
);

// Dashboard Content
const DashboardContent = ({ students, clubs, tasks }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <DashboardCard title="Total Students" value={students.length} color="bg-indigo-600" />
    <DashboardCard title="Active Clubs" value={clubs.length} color="bg-green-600" />
    <DashboardCard title="Pending Tasks" value={tasks.length} color="bg-yellow-600" />
    
    <div className="lg:col-span-3">
      <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <QuickAccessCard title="Add Student" icon="👤" />
        <QuickAccessCard title="Take Attendance" icon="📋" />
        <QuickAccessCard title="Create Report" icon="📝" />
        <QuickAccessCard title="Send Notification" icon="🔔" />
      </div>
    </div>
  </div>
);

// Dashboard Card Component
const DashboardCard = ({ title, value, color }) => (
  <div className={`${color} rounded-lg p-6 shadow-md`}>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

// Quick Access Card Component
const QuickAccessCard = ({ title, icon }) => (
  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-sm font-medium">{title}</p>
  </div>
);

// Clubs Content
const ClubsContent = ({ clubs }) => {
  const [newClub, setNewClub] = useState({ name: '' });
  
  const handleAddClub = (e) => {
    e.preventDefault();
    alert(`Demo: Added new club "${newClub.name}"`);
    setNewClub({ name: '' });
  };
  
  return (
    <div>
      <form className="bg-gray-800 p-6 rounded-lg mb-6" onSubmit={handleAddClub}>
        <h3 className="text-xl font-semibold mb-4">Add New Club</h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Club Name" 
            className="flex-1 bg-gray-700 border border-gray-600 rounded p-2"
            value={newClub.name}
            onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
            required
          />
          <button type="submit" className="bg-indigo-600 px-4 py-2 rounded">Add Club</button>
        </div>
      </form>
      
      <h3 className="text-xl font-semibold mb-4">Existing Clubs</h3>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Club Name</th>
              <th className="py-2 px-4 text-left">Members</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map(club => (
              <tr key={club.id} className="border-t border-gray-700">
                <td className="py-2 px-4">{club.id}</td>
                <td className="py-2 px-4">{club.name}</td>
                <td className="py-2 px-4">{club.members}</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Marks Content
const MarksContent = ({ students }) => {
  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Add/Update Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="bg-gray-700 border border-gray-600 rounded p-2">
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded p-2">
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
          </select>
          <input type="number" placeholder="Marks" className="bg-gray-700 border border-gray-600 rounded p-2" />
        </div>
        <button className="bg-indigo-600 px-4 py-2 rounded">Save Marks</button>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Student Marks Overview</h3>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Student</th>
              <th className="py-2 px-4 text-left">Math</th>
              <th className="py-2 px-4 text-left">Science</th>
              <th className="py-2 px-4 text-left">English</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className="border-t border-gray-700">
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{80 + Math.floor(Math.random() * 20)}</td>
                <td className="py-2 px-4">{75 + Math.floor(Math.random() * 25)}</td>
                <td className="py-2 px-4">{70 + Math.floor(Math.random() * 30)}</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;