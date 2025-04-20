import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase'; // Assuming you have a firebase utility for database access
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ReportEditor = () => {
    const { studentId } = useParams();
    const [reportData, setReportData] = useState({
        attendance: '',
        xp: '',
        mentorNotes: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const docRef = doc(db, 'students', studentId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setReportData(docSnap.data());
                } else {
                    setError('No such document!');
                }
            } catch (err) {
                setError('Error fetching report data');
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'students', studentId);
            await updateDoc(docRef, reportData);
            alert('Report updated successfully!');
        } catch (err) {
            setError('Error updating report');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4 bg-gray-800 text-white">
            <h1 className="text-2xl mb-4">Edit Report for Student ID: {studentId}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Attendance:</label>
                    <input
                        type="text"
                        name="attendance"
                        value={reportData.attendance}
                        onChange={handleChange}
                        className="p-2 w-full bg-gray-700 border border-gray-600 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">XP:</label>
                    <input
                        type="text"
                        name="xp"
                        value={reportData.xp}
                        onChange={handleChange}
                        className="p-2 w-full bg-gray-700 border border-gray-600 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Mentor Notes:</label>
                    <textarea
                        name="mentorNotes"
                        value={reportData.mentorNotes}
                        onChange={handleChange}
                        className="p-2 w-full bg-gray-700 border border-gray-600 rounded"
                        rows="4"
                    />
                </div>
                <button type="submit" className="bg-blue-600 p-2 rounded">
                    Update Report
                </button>
            </form>
        </div>
    );
};

export default ReportEditor;