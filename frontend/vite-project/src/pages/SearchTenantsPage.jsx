import { api } from "../utilities.jsx";
import { React, useEffect, useState } from "react";

export default function SearchTenantsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("searchtenants/");
            console.log(response);
            setStudents(response.data);
            // Initially set filtered students to all students
            setFilteredStudents(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSearch = () => {
        // Filter students based on search query
        const filteredStudents = students.filter(
            (student) =>
                student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.id.toString() === searchQuery
        );
        setFilteredStudents(filteredStudents);
    };

    return (
        <div className="m-5">
            <input
            className=" w-[20rem] border border-black"
                type="text"
                placeholder="Search by ID or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(searchQuery);
                    }
                }}
            />
            <button className="bg-blue-500 text-white p-1 rounded-md ml-3" onClick={handleSearch}>Search</button>
            <ul className="mt-8 overflow-y-scroll max-h-[78vh]">
                {filteredStudents.map((student) => (
                    <li key={student.id} className="border-b border-gray-300 py-4 flex flex-row">
                        <div className="w-1/2">
                            <p className="text-lg font-semibold">{student.fullName}</p>
                            <p className="text-gray-600">{student.email}</p>
                            <p className="text-gray-600">ID: {student.id}</p>
                        </div>
                        {student.legalGuardian && (
                            <div className="w-1/2">
                                <p className="font-semibold">Legal Guardian:</p>
                                <div className="flex flex-row">
                                    <p className="w-1/2">{student.legalGuardian.fullName}</p>
                                    <p>{student.legalGuardian.fullAddress}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="w-1/2">{student.legalGuardian.phoneNumber}</p>
                                    <p>{student.legalGuardian.email}</p>
                                </div>
                            </div>
                        )}
                        {student.title && (
                            <div className="">
                                <p className="font-semibold">Title:</p>
                                <p>{student.title}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
