import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  //   faReceipt,
  //   faCoins,
  //   faUser,
  //   faUserTie,
  faTruckField,
  faHouse,
  //   faChartArea,
  //   faEnvelope,
  //   faGear,
  //   faHeadset,
  faBars,
  faReceipt,
  faCoins,
  faStop,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../providers/AuthContext";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
function NavBar() {
  //   const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const { loggedUser, auth } = useContext(AuthContext);
  const { logout } = useAuth();

  function handelLogout(): void {
    logout();
    setOpenNav(false);
  }

  return (
    <>
      {auth ? (
        <>
          <button
            onClick={() => {
              setOpenNav((prev) => !prev);
            }}
            className="self-start text-white bg-blue-500 hover:bg-blue-400 fixed top-5 z-20 left-4 py-2 px-4 border border-transparent  rounded-md  hover:border-[#646cff]"
            type="button"
          >
            <FontAwesomeIcon className="text-2xl" icon={faBars} />
            {""}
          </button>
          <p className="fixed z-20 top-8 left-20">
            Hi: {loggedUser?.name}
          </p>

          <nav
            className={`fixed h-screen w-1/2 lg:w-1/4 top-0 ${openNav ? `left-0` : `-left-1/2`
              } bg-white drop-shadow-2xl pt-20 transition-all z-10`}
          >
            <ul>
              <li className={styles.li}>
                <Link to="/" className={styles.a}>
                  <FontAwesomeIcon icon={faHouse} />
                  <p>Home</p>
                </Link>
              </li>
              {loggedUser?.isAdmin && <li className={styles.li}>
                <Link to="/Dashboard" className={styles.a}>
                  <FontAwesomeIcon icon={faWarehouse} />
                  <p>Store Management</p>
                </Link>
              </li>}
              <li className={styles.li}>
                <button
                  className={styles.a + " w-full"}
                  onClick={() => handelLogout()}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        ""
      )}
    </>
  );
}
const styles = {
  li: "text-center",
  a: "py-3 border border-transparent  rounded-md hover:border-black flex justify-center gap-4 items-center transition-all",
};
export default NavBar;
