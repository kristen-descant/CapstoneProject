import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import collegeDormOne from '../media/collegeDormOne.jpg'

export default function HomePage() {

const {user, name} = useOutletContext();

useEffect(() => {
    console.log(user);
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