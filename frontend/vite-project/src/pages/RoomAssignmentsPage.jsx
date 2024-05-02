import { api } from "../utilities.jsx";
import { React, useEffect, useState } from "react";
import CreateRoomAssignmentComp from "../components/CreateRoomAssignmentComp.jsx"; // Import the modal component


export default function RoomAssignmentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roomAssignments, setRoomAssignments] = useState([]);
    const [filteredRoomAssignments, setFilteredRoomAssignments] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchRoomAssignments();
    }, []);

    const fetchRoomAssignments = async () => {
        try {
            const response = await api.get("allroomassignments/");
            console.log(response);
            setRoomAssignments(response.data);
            // Initially set filtered room assignments to all room assignments
            setFilteredRoomAssignments(response.data);
        } catch (error) {
            console.error("Error fetching room assignments:", error);
        }
    };

    const handleSearch = () => {
        // Filter room assignments based on search query
        const filteredRoomAssignments = roomAssignments.filter(
            (assignment) =>
                assignment.appUser.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                assignment.appUser.id.toString() === searchQuery
        );
        setFilteredRoomAssignments(filteredRoomAssignments);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

     // Function to get roommates for a specific room assignment
     const getRoommates = (currentAssignment) => {
        return filteredRoomAssignments.filter(
            (assignment) =>
                assignment.buildingNumber === currentAssignment.buildingNumber &&
                assignment.roomNumber === currentAssignment.roomNumber &&
                assignment.appUser.id !== currentAssignment.appUser.id
        );
    };

    return (
        <div className="m-5">
             
            <input
                className="w-[20rem] border border-black"
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
            <button className="bg-green-500 text-white p-1 rounded-md ml-10" onClick={openModal}>Create Room Assignment</button>
            {/* Modal for creating room assignment */}
            {showModal && <CreateRoomAssignmentComp onClose={closeModal} />}
            <ul className="mt-8 overflow-y-scroll max-h-[78vh]">
                {filteredRoomAssignments.map((assignment) => (
                    <li key={assignment.id} className="border-b border-gray-300 py-4 flex flex-row">
                        <div className="w-1/3">
                            <p className="text-lg font-semibold">{assignment.appUser.fullName}</p>
                            <p className="text-gray-600">{assignment.appUser.email}</p>
                            <p className="text-gray-600">ID: {assignment.appUser.id}</p>
                        </div>
                        <div className="w-1/3">
                            <p className="font-semibold">Room Assignment:</p>
                            <p>Room: {assignment.roomNumber}</p>
                            <p>Building: {assignment.buildingNumber}</p>
                            {/* Add other room assignment details as needed */}
                        </div>
                        <div className="w-1/3">
                            <p className="font-semibold">Roommates:</p>
                            {getRoommates(assignment).map((roommate) => (
                                <div key={roommate.appUser.id}>
                                    <p>{roommate.appUser.fullName}</p>
                                    <p>{roommate.appUser.email}</p>
                                    {/* Add other roommate details as needed */}
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
