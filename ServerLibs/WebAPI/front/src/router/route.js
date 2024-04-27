import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  // if (auth.user.role === "admin") {
  //   return <Navigate to='/admin/dashboard' />;
  // }
    return <Outlet />;
};
export const AdminRoute = () => {
  const auth = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  if (auth.user.role !== "admin") {
    return <Navigate to='/dashboard' />;
  }
    return <Outlet />;
}


export default PrivateRoute;
