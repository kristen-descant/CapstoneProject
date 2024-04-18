import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { api } from './utilities';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [isStaff, setIsStaff] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const lastVisited = useRef();
  // const location = useLocation();

  //  Verifies user and token on every rerender
  // const whoAmI = async () => {
  //   // Check if a token is stored in the localStorage
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     // If the token exists, set it in the API headers for authentication
  //     api.defaults.headers.common["Authorization"] = `Token ${token}`;
  //     // Fetch the user data from the server using the API
  //     let response = await api.get("users/");
  //     // Check if the response contains the user data (email field exists)
  //     if (response.data.email) {
  //       setUser(response.data);
  //         // Check if the "title" field exists in the user object
  //       if (response.data.hasOwnProperty("title")) {
  //         // User is a staff member
  //         setIsStaff(true);
  //       } else {
  //         // User is a student
  //         setIsStudent(true);
  //       }
  //       if (lastVisited.current) {
  //         navigate(lastVisited.current);
  //       } else {
  //         navigate("/");
  //       }
  //     }
  //    } else {
  //     // If no token is found, navigate to the login page
  //     //navigate("/login");
  //   }
  // };

  //   useEffect(() => {
  //     whoAmI();
  //   }, []);

    useEffect(() => {
      if (!user) {
        // If the user is not authenticated, update the lastVisited ref with the current location pathname
        lastVisited.current = location.pathname;
      }
    }, [location]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      setUser(null);
      setIsDropdownOpen(false);
      navigate('/loginstudent');
    };

  return (
    <div className='min-h-screen bg-zinc-800'>
    {user ? (
      <div className=''>
        
      </div>
    ) :
     (
      <div className='h-screen flex flex-col justify-center items-center bg-sky-900'>
      
    <Outlet 
        context={{
          user,
          setUser
        }}
      />
      </div>
    )}
  </div>
  );
}

export default App
