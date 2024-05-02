import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import dormRomm from "../media/capstonDormRoom.jpg"
import CreateRoomAssignmentComp from "../components/CreateRoomAssignmentComp.jsx";

export default function ManageRequestsPage() {

    const {user} = useOutletContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredHousingRequests, setFilteredHousingRequests] = useState([]);
    const [filteredRoommateRequests, setFilteredRoommateRequests] = useState([]);
    const [housing, setHousing] = useState([]);
    const [roommates, setRoommates] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getHousingRequests = async () => {

        try {
            let response = await api.get(`allhousing/`);
            setHousing(response.data)
            console.log(response);
        } catch (error) {
            console.log(error);
        };

    }

    const getRoommateRequests = async () => {

        try {
            let response = await api.get(`allroommatereq/`);
            setRoommates(response.data)
            console.log(response);
        } catch (error) {
            console.log(error);
        };

    }

    const handleSearch = (query) => {
        console.log("Search query:", query);
        const filteredHousing = housing.filter(
            (request) =>
                request.user.id.toString() === query || request.user.email === query
        );
        const filteredRoommates = roommates.filter(
            (request) =>
                request.user.id.toString() === query || request.user.email === query
        );
        console.log("Filtered Housing Requests:", filteredHousing);
        console.log("Filtered Roommate Requests:", filteredRoommates);
        setFilteredHousingRequests(filteredHousing);
        setFilteredRoommateRequests(filteredRoommates);
    };

    useEffect(() => {
        getHousingRequests();
        getRoommateRequests();
    }, []);

    const handleCreateRoomAssignment = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitRoomAssignment = (roomAssignmentDetails) => {
        // Implement your logic to handle submitting the room assignment details
        console.log("Room Assignment Details:", roomAssignmentDetails);
    };

    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/3">
                    <input
                    className="m-5 w-[20rem] border border-black"
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
                    <button className="bg-blue-500 text-white p-1 py-2 rounded-md" onClick={() => handleSearch(searchQuery)}>Search</button>
                </div>
                <p className="m-5 w-1/3 text-center">Click on a request to begin creating a room assignment.</p>
                <div className="w-1/3"></div>
            `   </div>
            <div className="h-full w-full flex flex-row">
    
                <div className="min-h-full border-black border-r w-[50%] m-5 mr-0">
                    <h2 className="text-center mb-3">Housing Requests</h2>
                    <ul className="h-[78vh] overflow-y-scroll overflow-x-hidden">
                        {(searchQuery === '' ? housing : filteredHousingRequests).map((request) => (
                            <li key={request.id} className="border border-gray p-3 hover:bg-gray-200" onClick={() => handleCreateRoomAssignment(request)}>
                                {/* Render details of each housing request */}
                                <div className="flex flex-row">
                                    <p className="w-1/2">Created: {request.createdDate}</p>
                                    <p className="ml-3">Name: {request.user.fullName}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="w-1/2">Building Number: {request.buildingNumber}</p>
                                    <p className="ml-3">Unit Size: {request.unitSize}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="w-1/2">Floor: {request.floor}</p>
                                    <p className="ml-3">Accessible: {request.accessible}</p>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-[50%] m-5 ml-0 ">
                    <h2 className="text-center mb-3">Roommate Requests</h2>
                    <ul className="h-[78vh] overflow-y-scroll overflow-x-hidden">
                        {(searchQuery === '' ? roommates : filteredRoommateRequests).map((request) => (
                            <li key={request.id} className="border border-gray hover:bg-gray-200 p-3" onClick={() => handleCreateRoomAssignment(request)}>
                                {/* Render details of each housing request */}
                                <div className="flex flex-row">
                                    <p className="w-1/2">Created: {request.createdDate}</p>
                                    <p className="ml-3">Name: {request.user.fullName}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="w-full">Roommate Email: {request.roommateEmail}</p>
                                </div>
                                <div className="flex flex-row">
                                    <p className="w-1/2">Roommate Name: {request.roommateFullName}</p>
                                    <p className="ml-3">Roommate Grade: {request.roommateGrade}</p>
                                </div>
    
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isModalOpen && (
                <CreateRoomAssignmentComp
                    request={selectedRequest}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitRoomAssignment}
                />
            )}
        </>
    );
    
}