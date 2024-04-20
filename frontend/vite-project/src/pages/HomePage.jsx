import { api } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function HomePage() {

const {user, setUser} = useOutletContext();
const {name, setName} = useOutletContext();

useEffect(() => {
    console.log(user)
    console.log(name)
}, []);

    return (
        <>
        <div>Welcome {name}</div>
        </>
    )
}