import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BookPage from './BookPage';
import Badges from './Badges';

const BookView = () => {
    const { currentUser } = useAuth();

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to Your Book, {currentUser.displayName}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
                    <BookPage />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Your Badges</h2>
                    <Badges />
                </div>
            </div>
        </div>
    );
};

export default BookView;