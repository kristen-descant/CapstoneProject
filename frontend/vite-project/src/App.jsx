import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { api } from './utilities';
import NavbarComp from './components/NavbarComp';
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [isStaff, setIsStaff] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const lastVisited = useRef();
  const location = useLocation();

  //  Verifies user and token on every rerender
  const whoAmI = async () => {
    // Check if a token is stored in the localStorage
    let token = localStorage.getItem("token");
    if (token) {
      // If the token exists, set it in the API headers for authentication
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Fetch the user data from the server using the API
      let response = await api.get("users/");
      // Check if the response contains the user data (email field exists)
      if (response.data.email) {
        setUser(response.data);
        setName(response.data.fullName);
        setIsStudent(response.data.type == "student");
        setIsStaff(response.data.type == "staff");
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/housingrequest");
        }
      }
     } else {
      // If no token is found, navigate to the login page
      navigate("/loginstudent");
    }
  };

    useEffect(() => {
      whoAmI();
    }, []);

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
    <div className='min-h-full '>
    {user ? (
      <div className=''>
        <header className='container min-w-screen max-w-none flex h-16 justify-between items-center pl-5 pr-5 border-b bg-sky-700 shadow-md'>
              <div className='ml-5 text-white'>
                Daytona State College - Room Reservation System
              </div>
              <div className="dropdown-container">
                {/* Button that can toggle between open and close */}
                
                <button className="dropdown-button w-10 h-10 text-white mb-2 text-lg" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                  |||
                </button>
              </div>
            </header>
            {/* If open show options for logout and settings */}
            {isDropdownOpen && (
                  <div onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} className="dropdown-content container mx-auto flex flex-col h-16 w-16 items-end ml-5 mr-1 pl-5 pr-0 absolute right-0 top-10">
                    <div className="h-15 w-20 shadow-md mb-2 hover:bg-sky-900 bg-sky-700 rounded text-center mt-6">
                      <button onClick={handleLogout}>Logout</button><br />
                    </div>
                  </div>
                )}
            <div className='flex flex-column'>
              <div className='w-[15rem]'>
                <NavbarComp className='col-span-1'
                  isStudent = {isStudent}
                  isStaff = {isStaff}
                />
              </div>
              <div className='w-screen'>
                  <Outlet 
                    context={{
                      user,
                      setUser,
                      isDropdownOpen,
                      setIsDropdownOpen,
                      isStaff,
                      setIsStaff,
                      isStudent,
                      setIsStudent,
                      name,
                      whoAmI
                    }}
                  />
                </div>
            </div>
      </div>
    ) :
     (
      <div className='h-screen flex flex-col justify-center items-center bg-sky-700'>
      
    <Outlet 
        context={{
          user,
          setUser,
          isStaff,
          setIsStaff,
          isStudent,
          setIsStudent,
          whoAmI
        }}
      />
      </div>
    )}
  </div>
  );
}

export default App
