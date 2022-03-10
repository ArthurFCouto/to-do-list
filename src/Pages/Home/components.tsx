import React, { useEffect, useReducer, useState } from "react";
import { SpinnerLoading } from "../../Components/Commom/components";
import { FormatDateBR } from "../../Components/Commom/functions";

type CardProps = {
  checkTask?: boolean;
  create: string;
  deadline: string;
  func?: Function;
  id: number;
  task: string;
};

export function Card({
  checkTask,
  create,
  deadline,
  func,
  id,
  task,
}: CardProps) {
  const [check, setCheck] = useState(checkTask);
  const [loading, setLoading] = useState(false);
  const [alterClass, dispatchAlterClass] = useReducer(Alter, {
    header: "",
    card: "",
  });
  function Alter(state: any, action: any) {
    switch (action.status) {
      case "success":
        return {
          header: "bg-success",
          card: "border-success",
        };
      case "danger":
        return {
          header: "bg-danger",
          card: "border-danger",
        };
      case "primary":
        return {
          header: "bg-primary",
          card: "border-primary",
        };
      case "warning":
        return {
          header: "bg-warning",
          card: "border-warning",
        };
      default:
        throw new Error();
    }
  }
  const conclude = async () => {
    setLoading(true);
    if (func != null && !check) {
      const response = await func(id);
      if (response === 200) {
        dispatchAlterClass({ status: "primary" });
        setCheck(true);
      } else alert("Houve um erro ao concluir a tarefa. "+response);
    }
    setLoading(false);
  };
  useEffect(() => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    );
    const dateCompare = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 3
    );
    if (check) dispatchAlterClass({ status: "primary" });
    else if (new Date(deadline) < date) dispatchAlterClass({ status: "danger" });
    else if (new Date(deadline) > dateCompare) dispatchAlterClass({ status: "success" });
    else dispatchAlterClass({ status: "warning" });
  }, []);
  return (
    <div className={`card ${alterClass.card}`}>
      <div className={`card-header ${alterClass.header} text-white`} >
        {`[${id}] Criada em ${FormatDateBR(create)}`}
      </div>
      <div className="card-body">
        <h5 className="card-title">{`Concluir até ${FormatDateBR(deadline)}`}</h5>
        <p className="card-text">{task}</p>
        {!check ? (
          <div className="text-end">
            <a className="btn btn-primary btn-sm" onClick={() => conclude()}>
              {loading ? <SpinnerLoading color="text-light" /> : "Concluir Tarefa"}
            </a>
          </div>
        ) : (
          <div className="text-end">
            <a
              className="btn btn-primary btn-sm disabled"
              aria-disabled="true"
              role="button"
              data-bs-toggle="button"
            >
              Concluida
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

type CardBodyProps = {
  body: "..." | string;
  border?: "border-warning" | "border-danger";
}

export function CardBody(props: CardBodyProps) {
  return (
    <div className={"card "+props?.border}>
      <div className="card-body">{props.body}</div>
    </div>
  );
}
