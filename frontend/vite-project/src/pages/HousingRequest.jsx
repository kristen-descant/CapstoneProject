import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import apartments from "../media/apartments.jpg"

export default function HousingRequest() {

    const [buildingNumber, setBuildingNumber] = useState(null);
    const [unitSize, setUnitSize] = useState(null);
    const [floor, setFloor] = useState(null);
    const [accessible, setAccessible] = useState(null);
    const {user} = useOutletContext();

    const createHousingRequest = async (e) => {
        e.preventDefault();

        // Generate the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        try {
            let response = await api.post(`createhousingreq/`, {
                buildingNumber: buildingNumber,
                unitSize: unitSize,
                floor: floor,
                accessible: accessible,
                createdDate: formattedDate,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        };

    }

    return (
        <>
        <div
        className="min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${apartments})` }}>

            <div className="h-[25rem] w-[35rem] bg-white border border-r">
                <div className="m-4 text-lg">Create a housing request</div>
                <div className="m-4">You can request housing specifications or submit the blank form to request housing with no specific attributes.</div>
                <form  onSubmit={createHousingRequest} className="mt-10 flex flex-col items-center" style={{ marginLeft: 0 }}>
                    <div>
                        <div className="flex flex-row justify-start overflow-hidden mb-1 mr-[3rem]">
                            <label htmlFor="buildingNumber">Building number:</label>
                            <select
                                className="bg-blue-100 ml-3"
                                onChange={(e) => setBuildingNumber(parseInt(e.target.value))}
                            >
                                <option value=""></option>
                                {[...Array(20)].map((_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row justify-start overflow-hidden mb-1">
                            <label htmlFor="unitSize">Unit Size:</label>
                            <select
                                className="bg-blue-100 ml-[4.8rem]"
                                onChange={(e) => setUnitSize(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                   
                 
                        <div className="flex flex-row justify-start overflow-hidden mb-1">
                            <label htmlFor="floor">Floor:</label>
                            <select
                                className="bg-blue-100 ml-[6.4rem]"
                                onChange={(e) => setFloor(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="flex flex-row justify-start overflow-hidden mb-1">
                            <label htmlFor="accessible">Accessible:</label>
                            <select
                                className="bg-blue-100 ml-[3.2rem]"
                                onChange={(e) => setAccessible(e.target.value === 'Yes')}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        
                        <div className="ml-[7.3rem] mt-3">
                            <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                
                <div className="m-4 mt-8 flex flex-row">
                    <div>Create a roommate request?</div>
                    <a className="rounded ml-3 bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" href="/roommaterequest" >Roommate Request</a>
                </div>
            </div>
        </div>
        </>
    )
}
