import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import collegeDormOne from '../media/collegeDormOne.jpg'

export default function HomePage() {

const {user, name} = useOutletContext();
const [housingRequests, setHousingRequests] = useState([]);
const [roommateRequests, setRoommateRequests] = useState([]);
const [roomAssignment, setRoomAssignment] = useState(null);

const getHousingRequests = async () => {

    try {
        let response = await api.get(`housingreq/${user.id}`);
        setHousingRequests(response.data);
        console.log(response);
    } catch (error) {
        console.log(error);
    };

}

const getRoommateRequests = async () => {

    try {
        let response = await api.get(`roommatereq/${user.id}`);
        console.log(response);
        setRoommateRequests(response.data);
    } catch (error) {
        console.log(error);
    };

}

const getRoommAssignment = async () => {

    try {
        let response = await api.get(`adminroomassignments/${user.id}`);
        console.log(response);
        setRoomAssignment(response.data);
    } catch (error) {
        console.log(error);
    };

}

useEffect(() => {
    getHousingRequests();
    getRoommateRequests();
    getRoommAssignment();
}, []);

    return (
        <>
        <div
        className="min-h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${collegeDormOne})` }}>

            <div className=" pl-3 text-lg text-white absolute">Welcome {name}</div>
            <div className="min-h-screen flex justify-center items-center z-[10]">
                <div className="h-[40rem] w-[35rem] bg-white border border-r grid grid-rows-3 p-2 z-[2]">
                    <div>
                        <p>Room Assignment</p>
                        {roomAssignment ? (
                            <div className="flex flex-col">
                                <div className="flex flex-row">
                                    <p>Created: {roomAssignment.createdDate}</p>
                                    <p>Start Date: {roomAssignment.startDate}</p>
                                    <p>End Date: {roomAssignment.endDate}</p>
                                </div>
                                <div>
                                    <p>Building: {roomAssignment.buildingNumber}</p>
                                    <p>Room: {roomAssignment.roomNumber}</p>
                                </div>
                            </div>
                        ) : <p>No current room assignment.</p>}
                    </div>
                    <div>
                        <p>Housing Requests</p>
                        <div className="overflow-auto max-h-40">
                            {housingRequests.map(request => (
                                <div key={request.id} className="border border-gray-300 p-2 m-2 flex flex-col">
                                    <div>
                                        <p>Created: {request.createdDate}</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <p>Building: {request.buildingNumber}</p>
                                        <p className="ml-5">Unit Size: {request.unitSize}</p>
                                        <p className="ml-5">Floor: {request.floor}</p>
                                        <p className="ml-5">Accessible: {request.accessible}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p>Roommate Requests</p>
                        <div className="overflow-auto max-h-40">
                            {roommateRequests.map(request => (
                                <div key={request.id} className="border border-gray-300 p-2 m-2 flex flex-col">
                                    <div>
                                        <p>Created: {request.createdDate}</p>
                                    </div>
                                  
                                        <p>Roommate Full Name: {request.roommateFullName}</p>
                                        <p>Roommate Email: {request.roommateEmail}</p>
                                        <p>Roommate Grade: {request.roommateGrade}</p>
                                    </div>
                              
                            ))}
                        </div>
                    </div>
                </div>      
            </div>

        </div>
        </>
    )
}