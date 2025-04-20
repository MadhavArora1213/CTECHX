import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase'; // Adjust the import based on your firebase setup
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const StudentManager = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentsCollection = collection(db, 'students');
            const studentSnapshot = await getDocs(studentsCollection);
            const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentList);
            setLoading(false);
        };

        fetchStudents();
    }, []);

    const handleUpdate = async (studentId, updatedData) => {
        const studentDoc = doc(db, 'students', studentId);
        await updateDoc(studentDoc, updatedData);
        // Optionally refresh the student list after update
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student Manager</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Email</th>
                        <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="border-b border-gray-300 px-4 py-2">{student.name}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{student.email}</td>
                            <td className="border-b border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleUpdate(student.id, { /* updated data */ })}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentManager;