import "./App.css";
import EmployeeDetails from "./pages/EmployeeDetails";
import Employees from "./pages/Employees";
import RootLayout from "./pages/RootLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>Dashboard content goes here!</h1>,
      },
      {
        path: "teams",
        element: <h1>Teams content goes here!</h1>,
      },
      {
        path: "employees",
        children: [
          {index:true,
            element: <Employees />
          },
          {path: ":employeeId",
            element: <EmployeeDetails />
          },
        ]
      },
      {
        path: "settings",
        element: <h1>Settings content goes here!</h1>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
