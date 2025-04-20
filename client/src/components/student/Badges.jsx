import React from 'react';

const Badges = ({ badges }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-4">Your Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {badges.length > 0 ? (
                    badges.map((badge) => (
                        <div key={badge.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
                            <img src={badge.image} alt={badge.name} className="w-16 h-16 mx-auto mb-2" />
                            <h3 className="text-lg font-semibold text-white">{badge.name}</h3>
                            <p className="text-gray-400">{badge.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No badges earned yet.</p>
                )}
            </div>
        </div>
    );
};

export default Badges;