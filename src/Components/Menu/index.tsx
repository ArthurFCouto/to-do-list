import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseCookies, destroyCookie } from "nookies";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { UserContext } from "../../Context";
import { NavItemLogin, ToggleIcon } from "./components";
import Config from "../../Config";
import api from "../../Services/api";

export default function Menu() {
  const { user, setUser } = useContext(UserContext);
  const [countUnread, setCountUnread] = useState(0);
  const [notifications, setNotifications] = useState<Array<Element>>();
  const { baseUrl } = Config;
  const headers = {
    Accept: `text/event-stream`,
    Authorization: `Bearer ${user?.token}`,
  };
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

  const Notification = async () => {
    await api
      .get("/notification", { headers })
      .then((response) => {
        const unread = response.data.filter((notify: any) => !notify.read);
        setCountUnread(unread.length);
        setNotifications(
          response.data
            .reverse()
            .slice(0, 5)
            .map((notify: any) => (
              <li>
                <a className="dropdown-item" href="#">
                  {notify.read ? notify.title : <strong>{notify.title}</strong>}
                </a>
              </li>
            ))
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchEventSource(`${baseUrl}/notification/realtime`, {
      method: "GET",
      headers,
      async onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        const data = JSON.parse(event.data);
        Notification();
        console.log(data);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
    Notification();
  }, [user]);

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
        <ToggleIcon />
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
                    style={{ position: "relative" }}
                  >
                    <i className="bi bi-bell"></i>&nbsp;
                    <span
                      className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                        countUnread === 0 ? "bg-secondary" : "bg-danger"
                      }`}
                    >
                      {countUnread}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {notifications}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item disabled" href="#">
                        Ver todas
                      </a>
                    </li>
                  </ul>
                </li>
              </>
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
