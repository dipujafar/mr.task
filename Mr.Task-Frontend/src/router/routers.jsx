import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../authentication/SignUp/SignUp";
import Root from "../layout/Root";
import Login from "../authentication/login/Login";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Tasks from "../pages/dashboard/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "tasks",
        element: <Tasks></Tasks>,
      },
    ],
  },
]);
