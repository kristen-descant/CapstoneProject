import { useState, useRef } from "react";
import { api } from "../utilities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateRoomAssignmentComp({ request, onClose, onSubmit }) {
    const [roomNumber, setRoomNumber] = useState("");
    const [buildingNumber, setBuildingNumber] = useState("");
    const [costPerSemester, setCostPerSemester] = useState(null);
    const [semesters, setSemesters] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userID, setUserID] = useState(null);

    const handleSubmit = async () => {

        // Generate the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        try {
            let response = await api.post(`createroomassignment/`, {
                createdDate: formattedDate,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                buildingNumber: buildingNumber,
                roomNumber: roomNumber,
                costPerSemester: costPerSemester,
                balanceDue: costPerSemester * semesters,
                appUser: parseInt(userID)
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        };

        // Close the modal
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50 ">
            <div className="bg-white p-4 rounded-lg relative w-[35rem]">
                <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md">Exit</button>
                <h2 className="text-xl mb-4">Create Room Assignment</h2>
                <label htmlFor="userID">Enter Student/Staff ID:</label>
                    <input
                        type="number"
                        id="userID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        className="border rounded-md p-1 w-[6rem] ml-[.5rem]"
                    />
                <div className="flex flex-row mt-5 ">
                    <label htmlFor="roomNumber">Room Number:</label>
                    <input
                        type="text"
                        id="roomNumber"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="border rounded-md p-1 mb-2 w-[3rem] ml-[.5rem]"
                    />
                    <label htmlFor="buildingNumber" className="ml-[4rem]">Building Number:</label>
                    <input
                        type="text"
                        id="buildingNumber"
                        value={buildingNumber}
                        onChange={(e) => setBuildingNumber(e.target.value)}
                        className="border rounded-md p-1 mb-2 w-[3rem] ml-[.9rem]"
                    />
                </div>
                <div className="flex flex-row">
                    <label htmlFor="semesters">Semesters:</label>
                    <input
                        type="number"
                        id="semesters"
                        value={semesters}
                        onChange={(e) => setSemesters(e.target.value)}
                        className="border rounded-md p-1 mb-2 w-[3rem] ml-[2.5rem]"
                    />
                    <label htmlFor="costPerSemester" className="ml-[4rem]">Cost Per Semester:</label>
                    <input
                        type="number"
                        id="costPerSemester"
                        value={costPerSemester}
                        onChange={(e) => setCostPerSemester(e.target.value)}
                        className="border rounded-md p-1 mb-2 w-[6rem] ml-[.5rem]"
                    />
                </div>
                <div className="flex flex-row">
                    <div className="mb-2 mr-5">
                        <label htmlFor="startDate">Start Date:</label>
                        <br />
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border border-black"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="endDate" className="ml-[1.6rem]">End Date:</label>
                        <br />
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border border-black ml-[1.6rem]"
                        />
                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </div>
        </div>
    );
}