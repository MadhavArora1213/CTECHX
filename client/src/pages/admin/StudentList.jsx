import React, { useEffect, useState } from 'react';
import { db } from '../../utils/firebase'; // Adjust the import based on your firebase setup
import { collection, getDocs } from 'firebase/firestore';
import StudentRow from '../../components/admin/StudentRow'; // Assuming you have a StudentRow component for displaying each student

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentsCollection = collection(db, 'students'); // Adjust the collection name based on your Firestore setup
                const studentSnapshot = await getDocs(studentsCollection);
                const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudents(studentList);
            } catch (error) {
                console.error("Error fetching students: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student List</h1>
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <StudentRow key={student.id} student={student} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;