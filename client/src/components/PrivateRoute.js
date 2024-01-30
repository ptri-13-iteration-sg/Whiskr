import React from "react";
import { Navigate } from "react-router-dom";
import useLocalState from "../utils/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useLocalState("", "token");
  return token ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
