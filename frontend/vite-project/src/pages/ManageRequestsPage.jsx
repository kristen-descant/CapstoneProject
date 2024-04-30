import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import dormRomm from "../media/capstonDormRoom.jpg"

export default function ManageRequestsPage() {

    const {user} = useOutletContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredHousingRequests, setFilteredHousingRequests] = useState([]);
    const [filteredRoommateRequests, setFilteredRoommateRequests] = useState([]);
    const [housing, setHousing] = useState([]);
    const [roommates, setRoommates] = useState([]);

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
                request.user.id === query || request.user.email === query
        );
        const filteredRoommates = roommates.filter(
            (request) =>
                request.user.id === query || request.user.email === query
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

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search by Student ID or Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(searchQuery);
                        }
                    }}
                />
            </div>
            <div className="h-full w-full flex flex-row">
    
                <div>
                    <h2>Housing Requests</h2>
                    <ul>
                        {(searchQuery === '' ? housing : filteredHousingRequests).map((request) => (
                            <li key={request.id}>
                                {/* Render details of each housing request */}
                                <p>Building Number: {request.buildingNumber}</p>
                                <p>Unit Size: {request.unitSize}</p>
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Roommate Requests</h2>
                    <ul>
                        {(searchQuery === '' ? roommates : filteredRoommateRequests).map((request) => (
                            <li key={request.id}>
                                {/* Render details of each housing request */}
                                <p>Building Number: {request.createdDate}</p>
    
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
    
}