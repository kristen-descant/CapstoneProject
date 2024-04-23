import { Link, useOutletContext } from "react-router-dom";
import React from "react";

export default function NavbarComp(
  {
    isStudent,
    isStaff
  }
) {


  return (
    <nav className="ml-0 pl-5 mt-0 pt-5 overflow-hidden border-r bg-sky-700 w-full min-h-screen flex flex-col ">
      <ul className="flex flex-col">
        <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link className="" to="housingrequest">Housing Request</Link></li>
        <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">Roommate Request</Link></li>
        <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">My Room Assignment</Link></li>
        <li className="w-[90%] overflow-hidden shadow-md mb-2 bg-white rounded text-center hover:bg-sky-900 hover:text-white"><Link to="">Balance</Link></li>
      </ul>
      {isStaff && 
        <div>
          <div className="border-t-2 border-white mr-4 mt-6 mb-6">
            
          </div>
          <ul className="flex flex-col">
            <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link className="" to="">Manage Requests</Link></li>
            <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">Student Search</Link></li>
            <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">Room Assignments</Link></li>
          </ul>
        </div>
      }
    </nav>
  )
}