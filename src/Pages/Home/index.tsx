import React, { useContext, useLayoutEffect, useState } from "react";
import { SectionCenterStyled, SectionStyled } from "../../Components/Commom";
import { UserContext } from "../../Context";
import { Card, CardBody } from "./components";

type Task = {
  check: boolean;
  createdAt: string;
  deadline: string;
  id: number;
  task: string;
};

export default function Home() {
  const { user } = useContext(UserContext);
  const [listTask, setListTask] = useState([<CardBody body="Verificando tarefas..." border="border-warning" />]);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };

  function Conclude(id: number) {
    return fetch(`https://apitasklist.herokuapp.com/task/${id}`, {
      method: "PUT",
      headers,
    })
      .then((response) => response.status)
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function FillTasks() {
    fetch(`https://apitasklist.herokuapp.com/task`, {
      method: "GET",
      headers,
    })
      .then(async (response) => {
        const res = await response.json();
        if (response.status === 200) {
          res.length > 0
            ? setListTask(
                res.map((task: Task) => (
                  <Card
                    key={task.id}
                    checkTask={task.check}
                    create={task.createdAt}
                    func={(id: number) => Conclude(id)}
                    deadline={task.deadline}
                    id={task.id}
                    task={task.task}
                  />
                ))
              )
            : setListTask([
                <CardBody body="Hhmmm Parece que você não tem tarefas cadastradas." />
              ]);
        }
      })
      .catch((error) => {
        setListTask([
          <CardBody body={`Ops! Houve um erro inesperado, tente mais tarde.${<br/>}${error}`} border="border-danger" />
        ]);
      });
  }

  useLayoutEffect(() => {
    FillTasks();
  }, []);

  return (
    <div className="container">
      <SectionCenterStyled>
        <img
          src="icon.png"
          style={{
            maxWidth: "300px",
            maxHeight: "185px",
            height: "auto",
          }}
          alt="Bem vindo a sua lista de tarefas!"
        />
      </SectionCenterStyled>
      {listTask.map((card) => (
        <SectionStyled>{card}</SectionStyled>
      ))}
    </div>
  );
}
