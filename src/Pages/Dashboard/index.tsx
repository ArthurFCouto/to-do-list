import React, { useContext, useEffect, useState } from "react";
import { SectionCenterStyled } from "../../Components/Commom/styles";
import { SpinnerLoading } from "../../Components/Commom/components";
import { FormatDateBR } from "../../Components/Commom/functions";
import { UserContext } from "../../Context";
import { AcordionItem } from "./components";
import api from "../../Services/api";

type Task = {
  id: number;
  task: string;
  deadline: string;
  createdAt: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function Dashboard() {
  const { user: userContext } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${userContext?.token}`,
  };
  const [tasks, setTasks] = useState([]);
  const [listTasks, setListTasks] = useState([
    <tr key={0}>
      <th scope="row">
        <SpinnerLoading />
      </th>
      <td colSpan={3}>Carregando lista de tarefas...</td>
    </tr>,
  ]);
  const [user, setUser] = useState([]);
  const [listUser, setListUser] = useState([
    <tr key={0}>
      <th scope="row">
        <SpinnerLoading />
      </th>
      <td colSpan={4}>Carregando lista de usuários...</td>
    </tr>,
  ]);

  async function FillTasks() {
    await api
      .get(`/task`, {
        headers,
      })
      .then((response) => {
        const res = response.data;
        setTasks(res);
      })
      .catch((error) => {
        setListTasks([
          <tr key={0}>
            <th scope="row">0</th>
            <td>Houve um erro ao carregar as tarefas.</td>
            <td colSpan={2}>{error.response}</td>
          </tr>,
        ]);
      });
  }

  async function FillUser() {
    await api
      .get(`/user`, {
        headers,
      })
      .then((response) => {
        const res = response.data;
        setUser(res);
      })
      .catch((error) => {
        console.log(error.response);
        setListUser([
          <tr key={0}>
            <th scope="row">0</th>
            <td>Houve um erro inesperado.</td>
            <td colSpan={3}></td>
          </tr>,
        ]);
      });
  }

  useEffect(() => {
    tasks.length > 0
      ? setListTasks(
          tasks.map((task: Task) => (
            <tr key={task.id}>
              <th scope="row">{task.id}</th>
              <td>{task.task}</td>
              <td>{FormatDateBR(task.createdAt)}</td>
              <td>{FormatDateBR(task.deadline)}</td>
            </tr>
          ))
        )
      : setListTasks([
          <tr key={0}>
            <th scope="row">0</th>
            <td>Não há tarefas para exibir.</td>
            <td colSpan={2}>
              <SpinnerLoading />
            </td>
          </tr>,
        ]);
  }, [tasks]);

  useEffect(() => {
    user.length > 0
      ? setListUser(
          user.map((user: User) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>--/--/----</td>
              <td>
                <SpinnerLoading />
              </td>
            </tr>
          ))
        )
      : setListUser([
          <tr key={0}>
            <th scope="row">0</th>
            <td>Não há usuários para exibir.</td>
            <td colSpan={3}>
              <SpinnerLoading />
            </td>
          </tr>,
        ]);
  }, [user]);

  return (
    <div className="container">
      <SectionCenterStyled>
        <img
          src="profile.png"
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Tarefa</th>
                  <th scope="col">Criação</th>
                  <th scope="col">Prazo</th>
                </tr>
              </thead>
              <tbody>{listTasks}</tbody>
            </table>
          </div>
        </AcordionItem>
        <AcordionItem
          func={() => FillUser()}
          id="two"
          idParent="accordion"
          target="-two"
          title={"Gerenciar usuários"}
        >
          <div className="accordion-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Email</th>
                  <th scope="col">Criação</th>
                  <th scope="col">Atualização</th>
                </tr>
              </thead>
              <tbody>{listUser}</tbody>
            </table>
          </div>
        </AcordionItem>
        <AcordionItem
          id="tree"
          idParent="accordion"
          target="-tree"
          title="Informações pessoais"
        >
          <div className="accordion-body">Ainda não implementado.</div>
        </AcordionItem>
      </div>
    </div>
  );
}
