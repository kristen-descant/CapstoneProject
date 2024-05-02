import { Link, useOutletContext } from "react-router-dom";
import React from "react";

export default function NavbarComp(
  {
    isStudent,
    isStaff
  }
) {


  return (
    <nav className="ml-0 pl-5 mt-0 pt-5 overflow-hidden border-r bg-sky-700 w-full min-h-screen flex flex-col z-[10] ">
      <ul className="flex flex-col">
        <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link to="home">Home</Link></li>
        <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link to="housingrequest">Housing Request</Link></li>
        <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="roommaterequest">Roommate Request</Link></li>
      </ul>
      {isStaff && 
        <div>
          <div className="border-t-2 border-white mr-4 mt-6 mb-6">
            
          </div>
          <ul className="flex flex-col">
            <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link className="" to="managerequests">Manage Requests</Link></li>
            <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="searchtenants">Tenant Search</Link></li>
            <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">Room Assignments</Link></li>
          </ul>
        </div>
      }
    </nav>
  )
}