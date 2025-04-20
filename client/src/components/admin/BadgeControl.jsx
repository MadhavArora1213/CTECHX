import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebase'; // Adjust the import based on your firebase setup
import { collection, addDoc, getDocs } from 'firebase/firestore';

const BadgeControl = () => {
    const [badges, setBadges] = useState([]);
    const [badgeName, setBadgeName] = useState('');
    const [badgeDescription, setBadgeDescription] = useState('');

    useEffect(() => {
        const fetchBadges = async () => {
            const badgeCollection = collection(db, 'badges');
            const badgeSnapshot = await getDocs(badgeCollection);
            const badgeList = badgeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBadges(badgeList);
        };

        fetchBadges();
    }, []);

    const handleAddBadge = async (e) => {
        e.preventDefault();
        if (badgeName && badgeDescription) {
            await addDoc(collection(db, 'badges'), {
                name: badgeName,
                description: badgeDescription,
            });
            setBadgeName('');
            setBadgeDescription('');
            // Optionally refresh the badge list
            const badgeCollection = collection(db, 'badges');
            const badgeSnapshot = await getDocs(badgeCollection);
            const badgeList = badgeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBadges(badgeList);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Badge Control</h2>
            <form onSubmit={handleAddBadge} className="mb-4">
                <input
                    type="text"
                    placeholder="Badge Name"
                    value={badgeName}
                    onChange={(e) => setBadgeName(e.target.value)}
                    className="p-2 rounded-md mr-2"
                />
                <input
                    type="text"
                    placeholder="Badge Description"
                    value={badgeDescription}
                    onChange={(e) => setBadgeDescription(e.target.value)}
                    className="p-2 rounded-md mr-2"
                />
                <button type="submit" className="bg-blue-500 p-2 rounded-md">Add Badge</button>
            </form>
            <ul>
                {badges.map(badge => (
                    <li key={badge.id} className="border-b border-gray-600 py-2">
                        <strong>{badge.name}</strong>: {badge.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BadgeControl;