import { useContext, useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { UserContext } from "../../Context";
import Config from "../../Config";
import Api from "../../Service";

interface Notify {
  id: number;
  read: boolean;
  title: string;
}

export default function NotificationToast() {
  const { user } = useContext(UserContext);
  const [countUnread, setCountUnread] = useState(0);
  const [notifications, setNotifications] = useState<Array<Element>>([]);
  const { baseUrl } = Config;
  const headers = {
    Accept: `text/event-stream`,
    Authorization: `Bearer ${user?.token}`,
  };
  const notification = async () => {
    const response = await Api.init('notification').get();
    if (response.status === 200) {
      const { data } = response;
      const unread = data.filter((notify: Notify) => !notify.read);
      setCountUnread(unread.length);
      setNotifications(
        data
          .reverse()
          .slice(0, 5)
          .map((notify: Notify, index: number) => (
            <li key={index}>
              <a
                className="dropdown-item d-flex align-items-center gap-2 py-2"
                href="#"
              >
                <span
                  className={ `d-inline-block rounded-circle ${ !notify.read ? "bg-danger" : "bg-primary" }`}
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
          console.log("Conecção estabelecida", res);
        } else {
          console.log("Erro durante a conexão", res);
        }
      },
      onmessage(event) {
        // const data = JSON.parse(event.data);
        notification();
      },
      /* 
       * onclose() {
       *   console.log("Connection closed by the server");
       * },
       * onerror(err) {
       *   console.log("There was an error from server", err);
       * },
       */
    });
    notification();
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
          <i className="bi bi-bell text-white" title="Notificações" />
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
                  Sem notificações
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