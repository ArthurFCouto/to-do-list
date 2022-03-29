import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import { UserContext } from "../../Context";
import { NavItemLogin, ToggleIcon } from "./components";

export default function Menu() {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    if (setUser)
      setUser({
        id: null,
        email: null,
        name: null,
        password: null,
        token: null,
      });
    destroyCookie(null, "USER_TOKEN");
  };

  useEffect(() => {
    try {
      const cookies = parseCookies();
      if (cookies.USER_TOKEN && setUser)
        setUser(JSON.parse(cookies.USER_TOKEN));
    } catch (error) {
      console.log(error, logout());
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="images/icon.png"
            alt="X"
            width="30"
            height="30"
            style={{ borderRadius: "5px" }}
          />
        </Link>
        <Link className="navbar-brand" to="/">
          To do List
        </Link>
        <ToggleIcon />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?.token != null && (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
            )}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0" style={{ cursor: "pointer" }}>
            {user?.token == null ? (
              <NavItemLogin text="Login" />
            ) : (
              <NavItemLogin text="Sair" func={() => logout()} />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
