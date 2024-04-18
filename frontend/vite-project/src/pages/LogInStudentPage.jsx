
import { api } from "../utilities.jsx";
import { emailRegex, passwordRegex } from "../utilities.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
import LogInComp from "../components/LogInComp.jsx"

export default function LogInStudentPage() {
    const navigate = useNavigate();
    const {user, setUser} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async (e) => {
        e.preventDefault();
  
        if (!password.match(passwordRegex)) {
            window.alert("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., @$!%*?&).");
            return;
        }
  
        if (!email.match(emailRegex)) {
            window.alert("Invalid email format!");
            return;
        }
  
        const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
        try {
            let response = await api.post("loginstudent/", {
                email: lowercaseEmail, // Use the lowercase email
                password: password,
            });
            console.log(response)
            let user = response.data.user;
            let token = response.data.token;
            // Store the token securely (e.g., in localStorage or HttpOnly cookies)
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            // set the user using with useContext to allow all other pages that need user information
            setUser(user);
            navigate("/");
           
        } catch(error) {
            window.alert(error.response['data'])
            console.error(error)
        };
    };

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    return (
        <>
        <div className="relative h-3/4 w-3/4 mr-8 ml-8 border-8 flex flex-col justify-evenly items-center border-white bg-zinc-800 shadow-2xl rounded-md overflow-hidden">
            
                <LogInComp
                setEmail={setEmail}
                setPassword={setPassword}
                signIn={signIn}
                /> 
                
            <div className="ml-2 flex items-center absolute right-[40%] bottom-[2%] text-white h-[25%] w-[20%] overflow-hidden">
                <p className="w-40 text-xs">Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character @$!%*?&.</p>
            </div>
        </div>
        </>
    )
}