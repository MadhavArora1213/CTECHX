import React from 'react';

const Achievements = () => {
    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Your Achievements</h1>
            <p className="mb-2">Here you can view all your earned badges and achievements.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example Badge */}
                <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                    <h2 className="font-semibold">Achievement Title</h2>
                    <p className="text-sm">Description of the achievement.</p>
                </div>
                {/* Add more badges here */}
            </div>
        </div>
    );
};

export default Achievements;