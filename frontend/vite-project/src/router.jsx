import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUpStaffPage from "./pages/SignUpStaffPage"
import SignUpStudentPage from "./pages/SignUpStudentPage"
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // {
        //   index: true,
        //   element: <SignUpStaffPage /> ,
        // },
        {
          path: "signupstaff",
          element: <SignUpStaffPage />,
        },
        {
          path: "signupstudent",
          element: <SignUpStudentPage />,
        },
    //     {
    //       path: "portfolio",
    //       element: <PortfolioPage/>
    //     },
    //     {
    //       path: "property/:propertyId",
    //       element: <PropertyOverviewPage/>
    //     },
    //     {
    //       path: "addproperty",
    //       element: <AddPropertyPage/>
    //     },
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