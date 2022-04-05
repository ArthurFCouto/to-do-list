import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { SectionCenterStyled } from "../../Components/Commom/styles";
import { FormatDateBR } from "../../Components/Commom/functions";
import { UserContext } from "../../Context";
import {
  AcordionItem,
  iconEmpty,
  LineCustomer,
  OptionsNotify,
  OptionsTask,
} from "./components";
import NotificationService from "../../Services/NotificationService";
import UserService from "../../Services/UserService";
import TaskService from "../../Services/TaskService";

interface Task {
  id: number;
  task: string;
  check: boolean;
  deadline: string;
  createdAt: string;
};

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export default function Dashboard() {
  const { user: userContext } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [listTasks, setListTasks] = useState<
    Array<ReactElement> | ReactElement
  >(
    <LineCustomer
      colSpan={4}
      option={"loading"}
      loadingText={"Carregando tarefas..."}
    />
  );
  const [user, setUser] = useState([]);
  const [listUser, setListUser] = useState<
    Array<ReactElement> | ReactElement
  >(
    <LineCustomer
      colSpan={4}
      option={"loading"}
      loadingText={"Carregando usuários..."}
    />
  );
  const [notifications, setNotifications] = useState([]);
  const [listNotifications, setListNotifications] = useState<
    Array<ReactElement> | ReactElement
  >(
    <LineCustomer
      colSpan={4}
      option={"loading"}
      loadingText={"Carregando notificações..."}
    />
  );

  const DeleteTask =
    async (id: number) => {
      const response = await TaskService.exclude(id);
      response.status === 200 ? FillTasks() : console.log(response.data);
    };

  const ConcludeTask =
    async (id: number) => {
      const response = await TaskService.update(id);
      response.status === 200
        ? FillTasks()
        : console.log(response.data);
    };

  const DeleteUser = 
    async (id: number) => {
      const response = await UserService.exclude(id);
      response.status === 200
        ? FillUser()
        : console.log(response.data);
    };

  const DeleteNotification =
    async (id: number) => {
      const response = await NotificationService.exclude(id);
      response.status === 200
        ? FillNotifications()
        : console.log(response.data);
    };

  const ReadNotification = 
    async (id: number) => {
      const response = await NotificationService.update(id);
      response.status === 200
        ? FillNotifications()
        : console.log(response.data);
    };

  async function FillTasks() {
    const response = await TaskService.getAll();
    if (response.status === 200) setTasks(response.data);
    else {
      console.log(response.data);
      setListTasks(
        <LineCustomer
          colSpan={3}
          statusText={response.statusText}
          option={"error"}
        />
      );
    }
  }

  async function FillUser() {
    const response = await UserService.getAll();
    if (response.status === 200) setUser(response.data);
    else {
      console.log(response.data);
      setListUser(
        <LineCustomer
          colSpan={3}
          statusText={response.statusText}
          option={"error"}
        />
      );
    }
  }

  async function FillNotifications() {
    const response = await NotificationService.getAll();
    if (response.status === 200) setNotifications(response.data);
    else {
      console.log(response.data);
      setListNotifications(
        <LineCustomer
          colSpan={3}
          statusText={response.statusText}
          option={"error"}
        />
      );
    }
  }

  useEffect(() => {
    tasks.length > 0
      ? setListTasks(
          tasks.map((task: Task, index: number) => (
            <tr key={index}>
              <th scope="row">{task.id}</th>
              <td>{task.task}</td>
              <td>{FormatDateBR(task.createdAt)}</td>
              <td>{FormatDateBR(task.deadline)}</td>
              <td>
                <OptionsTask
                  status={task.check}
                  up={() => ConcludeTask(task.id)}
                  del={() => DeleteTask(task.id)}
                />
              </td>
            </tr>
          ))
        )
      : setListTasks(
          <tr>
            <th scope="row">0</th>
            <td>Não há tarefas para exibir.</td>
            <td colSpan={3}>{iconEmpty}</td>
          </tr>
        );
  }, [tasks]);

  useEffect(() => {
    user.length > 0
      ? setListUser(
          user.map((user: User, index: number) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>--/--/----</td>
              <td>
                <div className="row justify-content-evenly">
                  <div className="col-auto">
                    <i
                      title="Exluir usuário"
                      className="bi bi-trash3 m-auto text-danger"
                      onClick={() => DeleteUser(user.id)}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))
        )
      : setListUser(
          <tr>
            <th scope="row">0</th>
            <td>Não há usuários para exibir.</td>
            <td colSpan={3}>{iconEmpty}</td>
          </tr>
        );
  }, [user]);

  useEffect(() => {
    notifications.length > 0
      ? setListNotifications(
          notifications.map((notify: Notification, index: number) => (
            <tr key={index}>
              <th scope="row">
                {notify.read ? (
                  <i className="bi bi-envelope-open" />
                ) : (
                  <i
                    className="bi bi-envelope-exclamation text-danger"
                    title="Nova notificação"
                  />
                )}
              </th>
              <td>{notify.title}</td>
              <td>{notify.message}</td>
              <td>{FormatDateBR(notify.createdAt)}</td>
              <td>
                <OptionsNotify
                  status={notify.read}
                  del={() => DeleteNotification(notify.id)}
                  up={() => ReadNotification(notify.id)}
                />
              </td>
            </tr>
          ))
        )
      : setListNotifications(
          <tr>
            <th scope="row">0</th>
            <td>Não há notificações para exibir.</td>
            <td colSpan={3}>{iconEmpty}</td>
          </tr>
        );
  }, [notifications]);

  return (
    <div className="container">
      <SectionCenterStyled>
          <img
            src="images/profile.png"
            style={{
              filter: "drop-shadow(rgba(34, 34, 34, 30%) 0px 3px 5px)",
              maxWidth: "300px",
              maxHeight: "185px",
              height: "auto",
            }}
            alt="Imagem de perfil"
          />
      </SectionCenterStyled>
      <SectionCenterStyled>
          <h5>{userContext?.name}</h5>
      </SectionCenterStyled>
      <div className="accordion accordion-flush" id="accordion">
        <AcordionItem
            func={() => FillTasks()}
            id="one"
            idParent="accordion"
            target="-one"
            title="Gerenciar Tarefas"
          >
            <div className="accordion-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Tarefa</th>
                      <th scope="col">Criação</th>
                      <th scope="col">Prazo</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody>{listTasks}</tbody>
                </table>
              </div>
            </div>
        </AcordionItem>
        <AcordionItem
            func={() => FillNotifications()}
            id="two"
            idParent="accordion"
            target="-two"
            title={"Gerenciar notificações"}
          >
            <div className="accordion-body">
              <div className="table-responsive">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#Status</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Detalhes</th>
                      <th scope="col">Criação</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody>{listNotifications}</tbody>
                </table>
              </div>
            </div>
        </AcordionItem>
        <AcordionItem
            func={() => FillUser()}
            id="tree"
            idParent="accordion"
            target="-tree"
            title={"Gerenciar usuários"}
          >
            <div className="accordion-body">
              <div className="table-responsive">
                <table className="table table-hover table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Email</th>
                      <th scope="col">Criação</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody>{listUser}</tbody>
                </table>
              </div>
            </div>
        </AcordionItem>
        <AcordionItem
            id="four"
            idParent="accordion"
            target="-four"
            title="Informações pessoais"
          >
            <div className="accordion-body">Ainda não implementado. No momento o projeto será finalizado para dar continuidade em outros, mas em breve retornaremos.</div>
        </AcordionItem>
      </div>
    </div>
  );
}