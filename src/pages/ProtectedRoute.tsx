import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { useContext } from "react";
export default function PrivateRoutes() {
  const { auth } = useContext(AuthContext);
  return auth ? <Outlet /> : <Navigate to="/Login" />;
}
