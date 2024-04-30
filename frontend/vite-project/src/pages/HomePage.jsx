import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import collegeDormOne from '../media/collegeDormOne.jpg'

export default function HomePage() {

const {user, name} = useOutletContext();

const getHousingRequests = async () => {

    try {
        let response = await api.get(`housingreq/${user.id}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    };

}

const getRoommateRequests = async () => {

    try {
        let response = await api.get(`roommatereq/${user.id}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    };

}

const getRoommAssignment = async () => {

    try {
        let response = await api.get(`adminroomassignments/${user.id}`);
        console.log(response);
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
        className="min-h-screen bg-cover bg-center relative z-[-1]"
        style={{ backgroundImage: `url(${collegeDormOne})` }}>

            <div className="p-8 text-lg text-white absolute">Welcome {name}</div>
            <div className="min-h-screen flex justify-center items-center">
                <div className="h-[45rem] w-[35rem] bg-white border border-r grid grid-rows-3 p-2">
                    <div>
                        <p>Room Assignment</p>
                    </div>
                    <div>
                        <p>Housing Requests</p>
                    </div>
                    <div>
                        <p>Roommate Requests</p>
                    </div>
                </div>      
            </div>

        </div>
        </>
    )
}