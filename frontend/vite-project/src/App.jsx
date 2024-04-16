import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [isStaff, setIsStaff] = useState(false)
  const [isStudent, setIsStudent] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
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
          // Check if the "title" field exists in the user object
        if (response.data.hasOwnProperty("title")) {
          // User is a staff member
          setIsStaff(true);
        } else {
          // User is a student
          setIsStudent(true);
        }
        if (lastVisited.current) {
          navigate(lastVisited.current);
        } else {
          navigate("/");
        }
      }
    } else {
      // If no token is found, navigate to the login page
      navigate("/login");
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
      navigate('/login');
    };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
