import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPriority } from "../../features/account/userSlice";

/**
 * RequireAuth
 * @description
 * Este componente se encarga de comprobar si el usuario está logueado o no. 
 * Si lo está, se muestra el componente Outlet, que es el componente que se encarga de renderizar 
 * el componente que se le indique en la ruta. Si no lo está, se redirige al usuario a la página de login.
 * @returns {JSX.Element} Outlet o Navigate
 * @see Outlet
 * @see Navigate
 */

export default function RequireAuth() {
  const userPrio = useSelector(selectPriority);
  if (userPrio === 1) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
