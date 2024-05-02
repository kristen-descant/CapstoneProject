import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUpStaffPage from "./pages/SignUpStaffPage"
import SignUpStudentPage from "./pages/SignUpStudentPage"
import LogInStudentPage from "./pages/LogInStudentPage"
import LogInStaffPage from "./pages/LogInStaffPage";
import HomePage from "./pages/HomePage";
import HousingRequest from "./pages/HousingRequest.jsx"
import IndexPage from "./pages/IndexPage.jsx";
import RoommateRequestPage from "./pages/RoommateRequestPage.jsx";
import ManageRequestsPage from "./pages/ManageRequestsPage.jsx";
import SearchTenantsPage from "./pages/SearchTenantsPage.jsx";
import LegalGuardianPage from "./pages/LegalGuardianPage.jsx";
import RoomAssignmentsPage from "./pages/RoomAssignmentsPage.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <IndexPage/> ,
        },
        {
          path: "signupstaff",
          element: <SignUpStaffPage />,
        },
        {
          path: "signupstudent",
          element: <SignUpStudentPage />,
        },
        {
          path: "loginstudent",
          element: <LogInStudentPage/>
        },
        {
          path: "loginstaff",
          element: <LogInStaffPage/>
        },
        {
          path: "housingrequest",
          element: <HousingRequest/>
        },
        {
          path: "home",
          element: <HomePage/>
        },
        {
          path: "roommaterequest",
          element: <RoommateRequestPage/>
        },
        {
          path: "managerequests",
          element: <ManageRequestsPage/>
        },
        {
          path: "searchtenants",
          element: <SearchTenantsPage/>
        },
        {
          path: "legalguardian",
          element: <LegalGuardianPage/>
        },
        {
          path: "allroomassignments",
          element: <RoomAssignmentsPage/>
        }
      ],
    //   errorElement: <Error404Page />,
    },
  ]);
  
  export default router;