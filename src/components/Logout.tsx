import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../providers/AuthContext";
import { useContext } from "react";


export default function Logout() {
  const { logout } = useAuth();
  const { auth } = useContext(AuthContext);

  function handelLogout(): void {
    logout();
  }
  return (
    <div>
      {auth && <button className="fixed top-4 left-4 text-2xl" onClick={() => handelLogout()}>
        <FontAwesomeIcon icon={faSignOut} />{""}
      </button>}
    </div>


  )
}
