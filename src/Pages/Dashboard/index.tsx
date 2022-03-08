import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

type Task = {
  id: number;
  task: string;
  deadline: Date | string;
  createdAt: Date | string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [list, setList] = useState(
    <tr>
      <th scope="row">0</th>
      <td colSpan={3}>Carregando lista de tarefas...</td>
    </tr>
  );

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
              const created = new Date(task.createdAt).toLocaleDateString(
                "pt-BR",
                { timeZone: "UTC" }
              );
              const deadline = new Date(task.deadline).toLocaleDateString(
                "pt-BR",
                { timeZone: "UTC" }
              );
              return (
                <tr>
                  <th scope="row">{task.id}</th>
                  <td>{task.task}</td>
                  <td>{created}</td>
                  <td>{deadline}</td>
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
  }, []);

  return (
    <div className="container">
      <h2>Seja bem vindo a sua home page {user?.name}!</h2>
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
              Suas tarefas
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
              Usuarios
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">Ainda não implementado.</div>
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
              Seus dados
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
