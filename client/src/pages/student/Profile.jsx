import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`profile-container ${theme}`}>
            <h1 className="text-2xl font-bold">Student Profile</h1>
            {user ? (
                <div className="profile-details">
                    <img src={user.avatar} alt="Avatar" className="avatar" />
                    <h2 className="text-xl">{user.name}</h2>
                    <p>Club: {user.club}</p>
                    <p>Batch: {user.batch}</p>
                    <p>Current Level: {user.level}</p>
                    <p>XP: {user.xp}</p>
                </div>
            ) : (
                <p className="text-red-500">No user data available.</p>
            )}
        </div>
    );
};

export default Profile;