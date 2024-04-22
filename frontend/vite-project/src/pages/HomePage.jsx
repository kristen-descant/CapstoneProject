import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import collegeDormOne from '../media/collegeDormOne.jpg'

export default function HomePage() {

const {user, setUser} = useOutletContext();
const {name, setName} = useOutletContext();

useEffect(() => {
    console.log(user)
    console.log(user)
    console.log(name)
}, []);

    return (
        <>
        <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${collegeDormOne})` }}>

            <div className="p-8 text-lg text-white">Welcome {name}</div>

        </div>
        </>
    )
}