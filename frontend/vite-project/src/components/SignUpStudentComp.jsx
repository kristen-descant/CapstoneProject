import React from "react";
import { Link } from "react-router-dom";

export default function SignUpStudentComp({
        setEmail,
        setPassword,
        setVerifyPassword,
        setFullName,
        setPhoneNumber,
        signUp,
}) {
    return (
        <>
         <div className="bg-white w-3/4 h-3/4 p-5 mt-5 rounded md:h-3/4  flex flex-col justify-center overflow-hidden">
            <div className="w-full h-full flex flex-col items-start justify-center">
                <div className="lg:mb-2 ml-20 pl-10 md:mb-1 sm:mb-0 mb-1 flex-nowrap w-3/4">Not a Student? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/signupstaff">Create Staff Account</Link></div> 
                <div className="lg:mb-2 ml-20 pl-10 md:mb-1 mb-1 flex-nowrap w-3/4">Already have an account? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/loginstudent">Log In</Link></div>
            
                <form  onSubmit={signUp} className="w-3/4 ml-20 pl-10">
                    <div className="flex flex-row justify-start overflow-hidden mb-1">
                        <label htmlFor="email">email:</label>
                        <input className="bg-blue-100 w-[40%] ml-[4.5rem]" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-row justify-start overflow-hidden mb-1">
                        <label htmlFor="name">full name:</label>
                        <input className="bg-blue-100 w-[40%] ml-[2.8rem]" type="text" onChange={(e) => setFullName(e.target.value)}/>
                    </div>
                    <div className="flex flex-row justify-start overflow-hidden mb-1">
                        <label htmlFor="number">phone number:</label>
                        <input className="bg-blue-100 w-[40%] ml-[.3rem]" type="text" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                    <div className="flex flex-row justify-start overflow-hidden mb-1">
                        <label htmlFor="password">password:</label>
                        <input className="bg-blue-100 w-[40%] ml-[2.6rem]" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className=" flex flex-row justify-start overflow-hidden mb-1">
                        <label  htmlFor="verifypassword">verify password:</label>
                        <input className="bg-blue-100 h-1/2 w-[40%] ml1" type="password" onChange={(e) => setVerifyPassword(e.target.value)}/>
                    </div>
                    <div className="flex justify-center">
                    <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1 mt-3" type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}