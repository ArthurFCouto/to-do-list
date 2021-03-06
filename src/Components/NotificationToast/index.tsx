import React, { useContext, useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { UserContext } from "../../Context";
import Config from "../../Config";
import NotificationService from "../../Services/NotificationService";

interface Notify {
  id: number;
  read: boolean;
  title: string;
}

export default function NotificationToast() {
  const { user } = useContext(UserContext);
  const [countUnread, setCountUnread] = useState(0);
  const [notifications, setNotifications] = useState<Array<Element>>();
  const { baseUrl } = Config;
  const headers = {
    Accept: `text/event-stream`,
    Authorization: `Bearer ${user?.token}`,
  };
  const Notification = async () => {
    const response = await NotificationService.getAll();
    if (response.status === 200) {
      const unread = response.data.filter((notify: Notify) => !notify.read);
      setCountUnread(unread.length);
      setNotifications(
        response.data
          .reverse()
          .slice(0, 5)
          .map((notify: Notify, index: number) => (
            <li key={index}>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span
                  className={`d-inline-block rounded-circle ${
                    !notify.read ? "bg-danger" : "bg-primary"
                  }`}
                  style={{ width: ".5em", height: ".5em" }}
                />
                &nbsp;{notify.title}
              </a>
            </li>
          ))
      );
    } else console.log(response.data);
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
        //const data = JSON.parse(event.data);
        Notification();
      },
      onclose() {
        //console.log("Connection closed by the server");
      },
      onerror(err) {
        //console.log("There was an error from server", err);
      },
    });
    Notification();
  }, []);

  return (
    <div
      className="position-absolute top-0 start-0 rounded-circle shadow bg-dark bg-gradient p-2"
      style={{ zIndex: 11 }}
    >
      <div className="dropdown position-relative">
        <span
          className={`position-absolute top-0 start-100 translate-middle p-2 rounded-circle ${
            countUnread === 0
              ? "bg-secondary"
              : "bg-danger border border-light"
          }`}
        >
          <span className="visually-hidden">New alerts</span>
        </span>
        <button
          className="btn btn-link"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-bell text-white" title="Notifica????es" />
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark"
          aria-labelledby="dropdownMenuButton2"
        >
          { notifications }
          {
            notifications?.length === 0 &&
              <li>
                <a className="dropdown-item disabled" href="#">
                  Sem notifica????es
                </a>
              </li>
          }
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item disabled" href="#">
              Ver todas
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}