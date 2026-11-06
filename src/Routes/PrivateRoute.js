import React from "react";
import { Navigate } from "react-router";

// Guards everything under App's "/NBA/*" route. Only checks that a token
// exists; the role/route check that was commented out here under react-router
// v5 is not enabled yet.
const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? children : <Navigate to="/404" replace />;
};
export default PrivateRoute;
