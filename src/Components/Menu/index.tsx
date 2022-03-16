import React, { useContext, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";
import { baseUrl } from "../../Config/variables";

export default function Menu() {
  const { user, setUser } = useContext(UserContext);

  const notification = new EventSource(`${baseUrl}/realtimenotification/${user?.token}`);
  notification.addEventListener("notification", (data) => console.log(data));

  const logout = () => {
    if (setUser)
      setUser({
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
      if (cookies.USER_TOKEN && setUser) {
        const cookiesJson = JSON.parse(cookies.USER_TOKEN);
        setUser(cookiesJson);
      }
    } catch (error) {
      console.log(error, logout());
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="icon.png"
            alt="X"
            width="30"
            height="30"
            style={{ borderRadius: "5px" }}
          />
        </Link>
        <Link className="navbar-brand" to="/">
          To do List
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?.token != null && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opções
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item disabled" href="#">
                        Adicionar
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item disabled" href="#">
                        Listar
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item disabled" href="#">
                        Perfil
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          {user?.token != null && (
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tarefas..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
          )}
          <ul className="navbar-nav mb-2 mb-lg-0" style={{ cursor: "pointer" }}>
            {user?.token == null ? (
              <li className="nav-item">
                <Link className="nav-link active" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item" onClick={() => logout()}>
                <Link className="nav-link  active" to="/login">
                  Sair
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
