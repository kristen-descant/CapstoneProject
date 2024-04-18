import { Link, useOutletContext } from "react-router-dom";
import React from "react";

export default function NavbarComp() {

  return (
      <nav className="ml-0 pl-5 mt-0 pt-5 overflow-hidden border-r bg-sky-700  w-1/2 min-h-screen ">
        <ul className="flex flex-col">
          <li className="w-[90%] overflow-hidden shadow mb-2 bg-white rounded-md text-center hover:bg-sky-900 hover:text-white"><Link className="" to="">Housing Request</Link></li>
          <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">Roommate Request</Link></li>
          <li className="w-[90%] overflow-hidden bg-white rounded text-center shadow-md mb-2 hover:bg-sky-900 hover:text-white"><Link to="">My Room Assignment</Link></li>
          <li className="w-[90%] overflow-hidden shadow-md mb-2 bg-white rounded text-center hover:bg-sky-900 hover:text-white"><Link to="">Balance</Link></li>
        </ul>
    </nav>
  )
}