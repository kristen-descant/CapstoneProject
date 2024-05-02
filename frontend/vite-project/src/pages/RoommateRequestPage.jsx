import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import dormRomm from "../media/capstonDormRoom.jpg"

export default function RoommateRequestPage() {

    const {user} = useOutletContext();
    const [roommateFullName, setRoommateFullName] = useState(null);
    const [roommateEmail, setRoommateEmail] = useState(null);
    const [roommateGrade, setRoommateGrade] = useState(null);
    const [currentGrade, setCurrentGrade] = useState(null);
    const [submissionMessage, setSubmissionMessage] = useState(null);

    const createRoommateRequest = async (e) => {
        e.preventDefault();

        // Check if either currentGrade or roommateGrade is not selected
        if (!currentGrade || !roommateGrade) {
            window.alert("Please select both your current grade and the requested roommate's grade.");
            return; // Exit the function early
        }

        // Check if the difference between currentGrade and roommateGrade is more than 1
        if (Math.abs(currentGrade - roommateGrade) > 1) {
            window.alert("The requested roommate must be one grade above or below your current grade.");
            return; // Exit the function early
        }

        // Generate the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        try {
            let response = await api.post(`createroommatereq/`, {
                createdDate: formattedDate,
                roommateFullName: roommateFullName,
                roommateEmail: roommateEmail,
                roommateGrade: roommateGrade,
            });
            console.log(response);
            setSubmissionMessage("Roommate request submitted successfully.");
        } catch (error) {
            console.log(error);
        };

    }

    return (
        <>
        <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${dormRomm})` }}>

            <div className="h-[25rem] w-[35rem] bg-white border border-r">
                <div className="m-4 text-lg">Create a roommate request</div>
                <div className="m-4">Your requested roommate must be one grade above or below your current grade.</div>
                <form  onSubmit={createRoommateRequest} className="pl-10 pr-10  mt-10 flex flex-col" style={{ marginLeft: 0 }}>

                    <div className="flex flex-row justify-between overflow-hidden mb-1 mr-[3rem]">
                        <label htmlFor="buildingNumber">Your current grade:</label>
                        <select
                            className="bg-blue-100 ml-3 w-[6rem] mr-[2.2rem]"
                            onChange={(e) => setCurrentGrade(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="1">Freshman</option>
                            <option value="2">Sophmore</option>
                            <option value="3">Junior</option>
                            <option value="4">Senior</option>
                        </select>
                    </div>

                    <div className="flex flex-row justify-between overflow-hidden mb-1 mr-[3rem]">
                        <label htmlFor="buildingNumber">Requested roommate's grade:</label>
                        <select
                            className="bg-blue-100 ml-3 w-[6rem] mr-[2.2rem]"
                            onChange={(e) => setRoommateGrade(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="1">Freshman</option>
                            <option value="2">Sophmore</option>
                            <option value="3">Junior</option>
                            <option value="4">Senior</option>
                        </select>
                    </div>
        
    
                    <div className="flex flex-row justify-between mb-1">
                        <label htmlFor="floor">Requested roommate's email:</label>
                        <input type="text" className="bg-blue-100 ml-3"
                            onChange={(e) => setRoommateEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-row justify-between mb-1">
                        <label htmlFor="floor">Requested roommate's full name:</label>
                        <input type="text" className="bg-blue-100 ml-3"
                            onChange={(e) => setRoommateFullName(e.target.value)} />
                    </div>
                
                    <div className="flex justify-center mt-3">
                        <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Submit</button>
                    </div>
                </form>
                <div className="m-3">
                    {submissionMessage && <p>{submissionMessage}</p>}
                </div>
                <div className="m-4 mt-8 flex flex-row">
                    <div>Create a housing request?</div>
                    <a className="rounded ml-3 bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" href="/housingrequest" >Housing Request</a>
                </div>
            </div>
        </div>
        </>
    )
}