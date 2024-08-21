import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { useContext } from "react";
export default function PrivateRoutes() {
  const { loggedUser } = useContext(AuthContext);
  return loggedUser?.isAdmin ? <Outlet /> : <Navigate to="/" />;
}
