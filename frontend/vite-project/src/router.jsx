import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUpStaffPage from "./pages/SignUpStaffPage"
import SignUpStudentPage from "./pages/SignUpStudentPage"
import LogInStudentPage from "./pages/LogInStudentPage"
import LogInStaffPage from "./pages/LogInStaffPage";
import HomePage from "./pages/HomePage";
import HousingRequest from "./pages/HousingRequest.jsx"

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
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
    //     {
    //       path: "lists",
    //       element: <ListsPropertiesPage/>
    //     },
    //     {
    //       path: "lists/:listId",
    //       element: <AListPropertiesPage/>
    //     },
    //     {
    //       path: "purchaseworksheet/:propertyId",
    //       element: <PurchaseWorksheetPage/>
    //     },
    //     {
    //       path: "calculator",
    //       element: <CaclculatorPage/>
    //     },
    //     {
    //       path: "settings",
    //       element: <UserSettingsPage/>
    //     }
      ],
    //   errorElement: <Error404Page />,
    },
  ]);
  
  export default router;