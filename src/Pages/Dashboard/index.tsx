import React, { useContext, useEffect, useState } from "react";
import { SectionCenterStyled } from "../../Components/Commom";
import { UserContext } from "../../Context";

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
  const { user } = useContext(UserContext);
  const [list, setList] = useState(
    <tr>
      <th scope="row">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </th>
      <td colSpan={3}>Carregando lista de tarefas...</td>
    </tr>
  );
  const [listUser, setListUser] = useState(
    <tr>
      <th scope="row">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </th>
      <td colSpan={4}>Carregando lista de usuários...</td>
    </tr>
  );
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  useEffect(() => {
    fetch(`https://apitasklist.herokuapp.com/task`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.status === 200 && res.length > 0) {
          setList(
            res.map((task: Task) => {
              return (
                <tr key={task.id}>
                  <th scope="row">{task.id}</th>
                  <td>{task.task}</td>
                  <td>{formatDate(task.createdAt)}</td>
                  <td>{formatDate(task.deadline)}</td>
                </tr>
              );
            })
          );
        } else {
          setList(
            <tr>
              <th scope="row">0</th>
              <td>Houve um erro ao carregar as tarefas.</td>
              <td colSpan={2}>{res.error}</td>
            </tr>
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setList(
          <tr>
            <th scope="row">0</th>
            <td>Houve um erro inesperado.</td>
            <td colSpan={2}>{error}</td>
          </tr>
        );
      });
    fetch(`https://apitasklist.herokuapp.com/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.status === 200 && res.length > 0) {
          setListUser(
            res.map((user: User) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>--/--/----</td>
                  <td className="d-flex justify-content-center">
                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              );
            })
          );
        } else {
          setListUser(
            <tr>
              <th scope="row">0</th>
              <td>Houve um erro ao carregar os usuarios.</td>
              <td colSpan={3}>{res.error}</td>
            </tr>
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setListUser(
          <tr>
            <th scope="row">0</th>
            <td>Houve um erro inesperado.</td>
            <td colSpan={3}>{error}</td>
          </tr>
        );
      });
  }, []);

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
        <h5>{user?.name}</h5>
      </SectionCenterStyled>
      <div className="accordion" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Gerenciar Tarefas
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
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
                <tbody>{list}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Gerenciar Usuários
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
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
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Informações Pessoais
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Ainda não implementado.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
