import React from "react";
import { createBrowserRouter, Navigate, BrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/auth/Login";
import RequireAuth from "./RequireAuth";
import Users from "../../features/account/Users";
import Parkings from "../../features/account/Parkings";
import History from "../../features/account/History";

/**
 * @description
 * Este componente define las rutas de la aplicación.
 * @returns {React.Component}
 */

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={"/main/users"} /> },
      { path: "/login", element: <Login /> },
      {
        path: "/main",
        element: <RequireAuth />,
        children: [
          { path: "users", element: <Users /> },
          { path: "parkings", element: <Parkings /> },
          { path: "report", element: <History/> },
          
        ],
      },
    ],
  },
]);

export const AppRouter = () => (
  <BrowserRouter>
    {router}
  </BrowserRouter>
);