
import { api } from "../utilities.jsx";
import { emailRegex, passwordRegex } from "../utilities.jsx";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function LogInStudentPage() {
    const navigate = useNavigate();
    const {user, setUser} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {whoAmI} = useOutletContext();
    const {isStaff, setIsStaff} = useOutletContext();
    const {name, setName} = useOutletContext();

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
            let user = response.data;
            let token = response.data.token;
            // Store the token securely (e.g., in localStorage or HttpOnly cookies)
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            // call whoAmI to set user details
            whoAmI();
           
        } catch(error) {
            window.alert(error.response['data'])
            console.error(error)
        };
    };

    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [])

    useEffect(() => {
        console.log("this is the login page")
    }, [])

    return (
        <>
        <Link to="/" className="w-[15%] bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 mb-5 rounded">
            Done with Demo
        </Link>
        
       <div className="relative h-[30rem] w-[50rem] mr-8 ml-8 border-8 flex flex-col justify-evenly items-center border-white bg-zinc-800 shadow-2xl rounded-md overflow-hidden">
            <div className="bg-white w-3/4 h-1/2 p-5 rounded md:h-1/2  flex flex-col justify-center overflow-hidden">
                <div className="w-full h-full flex flex-col items-start justify-center">
                    <div className="lg:mb-2 ml-20 pl-10 md:mb-1 sm:mb-0 mb-1 flex-nowrap w-3/4">Not a Student? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/loginstaff">Log In to Staff Account</Link></div> 
                    <div className="lg:mb-2 ml-20 pl-10 md:mb-1 mb-1 flex-nowrap w-3/4">Need an account? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/signupstudent">Create Student Account</Link></div>
                
                    <form  onSubmit={signIn} className="w-3/4 ml-20 pl-10">
                        <div className="flex flex-row flex justify-start overflow-hidden mb-1">
                            <label htmlFor="email">email:</label>
                            <input className="bg-blue-100 w-[50%] ml-10" type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex flex-row justify-start overflow-hidden mb-1">
                            <label htmlFor="password">password:</label>
                            <input className="bg-blue-100 w-[50%] ml-3" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex justify-center mt-3">
                        <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
                    
            <div className="ml-2 flex items-center absolute right-[40%] bottom-[2%] text-white h-[25%] w-[20%] overflow-hidden">
                <p className="w-40 text-xs">Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character @$!%*?&.</p>
            </div>
        </div>
        </>
    )
}