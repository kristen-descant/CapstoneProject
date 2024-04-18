import React from "react";
import { Link } from "react-router-dom";

export default function LogInComp({
        setEmail,
        setPassword,
        signIn
}) {

    return (
        <>
         <div className="bg-white w-3/4 h-1/2 p-5 rounded md:h-1/2  flex flex-col justify-center overflow-hidden">
           
           <div className="lg:mb-2 md:mb-1 sm:mb-0 mb-1 flex-nowrap">Not a Student? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/loginstaff">Log In to Staff Account</Link></div> 
           <div className="lg:mb-2 md:mb-1 mb-1 flex-nowrap">Need an account? <Link className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" to="/signupstudent">Create Student Account</Link></div>
     
       <form  onSubmit={signIn}>
           <div className="flex flex-row justify-center overflow-hidden mb-1">
               <label htmlFor="email">email:</label>
               <input className="bg-blue-100 w-[50%]" type="text" onChange={(e) => setEmail(e.target.value)}/>
           </div>
           <div className="flex flex-row justify-center overflow-hidden mb-1">
               <label htmlFor="password">password:</label>
               <input className="bg-blue-100 w-[50%]" type="password" onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="flex justify-center">
           <button className="rounded bg-sky-700 hover:bg-sky-900 text-white pl-1 pr-1" type="submit">Log In</button>
           </div>
       </form>
       </div>
        </>
    )
}