import React, { FormEvent, useEffect, useReducer, useState } from "react";
import { SpinnerLoading } from "../../Components/Commom/components";
import { FormatDateBR, FormatDateEN } from "../../Components/Commom/functions";

type ActivitiesProps = {
  checkTask?: boolean;
  conclude: Function;
  create: string;
  deadline: string;
  exclude: Function;
  id: number;
  status: "pending" | "completed";
  task: string;
  updatedAt?: string;
};
export function Activities({
  checkTask,
  conclude,
  deadline,
  exclude,
  id,
  status,
  task,
  updatedAt,
}: ActivitiesProps) {
  const [check, setCheck] = useState(checkTask);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alterClass, dispatchAlterClass] = useReducer(Alter, {
    header: "",
    card: "",
    color: "#F8F9FA",
  });
  function Alter(state: any, action: any) {
    switch (action.status) {
      case "success":
        return {
          header: "bg-success",
          card: "border-success",
          color: "#198754",
        };
      case "danger":
        return {
          header: "bg-danger",
          card: "border-danger",
          color: "#DC3545",
        };
      case "primary":
        return {
          header: "bg-primary",
          card: "border-primary",
          color: "#0D6EFD",
        };
      case "warning":
        return {
          header: "bg-warning",
          card: "border-warning",
          color: "#FFC107",
        };
      default:
        throw new Error();
    }
  }
  async function Fnc(mode: "conclude" | "exclude") {
    setLoading(true);
    if (mode == "conclude") {
      if (conclude != null && !check) {
        const response = await conclude(id);
        if (response === 200) {
          dispatchAlterClass({ status: "primary" });
          setCheck(true);
        } else
          alert(
            "Houve um erro ao concluir a tarefa. " +
              response.response.data.error
          );
      }
    } else if (mode == "exclude") {
      if (exclude != null) {
        const response = await exclude(id);
        if (response === 200) {
          dispatchAlterClass({ status: "primary" });
          setCheck(true);
          setDeleted(true);
        } else
          alert(
            "Houve um erro ao excluir a tarefa. " + response.response.data.error
          );
      }
    }
    setLoading(false);
  }
  const pending = (
    <div className="d-flex justify-content-between">
      <strong className="d-block text-gray-dark">
        <i className="bi bi-calendar" />
        {` ${FormatDateBR(deadline)}`}
      </strong>
      {!check ? (
        <a
          className="btn-link"
          style={{ cursor: "pointer" }}
          onClick={() => Fnc("conclude")}
        >
          {loading ? <SpinnerLoading color="text-primary" /> : "Concluir"}
        </a>
      ) : (
        <a title="Já concluída">
          <i className="bi bi-check-square text-primary" />
        </a>
      )}
    </div>
  );
  const completed = (
    <div className="d-flex justify-content-between">
      <strong className="text-gray-dark">
        <i className="bi bi-calendar2-check" />
        &nbsp;{updatedAt && FormatDateBR(updatedAt)}
      </strong>
      {!deleted ? (
        <a
          className="btn-link"
          style={{ cursor: "pointer" }}
          onClick={() => Fnc("exclude")}
        >
          {loading ? <SpinnerLoading color="text-primary" /> : "Excluir"}
        </a>
      ) : (
        <a title="Já excluída">
          <i className="bi bi-trash3 text-danger" />
        </a>
      )}
    </div>
  );
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
    else if (new Date(deadline) < date)
      dispatchAlterClass({ status: "danger" });
    else if (new Date(deadline) > dateCompare)
      dispatchAlterClass({ status: "success" });
    else dispatchAlterClass({ status: "warning" });
  }, []);
  return (
    <div className="d-flex text-muted pt-3">
      <svg
        className="bd-placeholder-img flex-shrink-0 me-2 rounded"
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder: 32x32"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill={alterClass.color}></rect>
        <text x="50%" y="50%" fill={alterClass.color} dy=".3em">
          32x32
        </text>
      </svg>{" "}
      <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
        {status === "completed" ? completed : pending}
        <span className="d-block">{task}</span>
      </div>
    </div>
  );
}

type CardBodyProps = {
  children: React.ReactNode;
  border?: "border-warning" | "border-danger";
};
export function CardBody(props: CardBodyProps) {
  return (
    <div className={"card " + props?.border}>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

type BreadcumbProps = {
  title: string;
  subTitle: string;
  update: Function;
  focus: () => void;
};
export function Breadcumb(props: BreadcumbProps) {
  return (
    <div className="d-flex align-items-center justify-content-between p-3 my-3 rounded shadow-sm bg-body">
      <div className="d-flex">
        <img
          className="me-3"
          src="images/icon.png"
          alt="To-do-list"
          width="48"
          height="38"
        />
        <div className="lh-1">
          <h1 className="h6 mb-0 lh-1">{props.title}</h1>
          <small>{props.subTitle}</small>
        </div>
      </div>
      <div className="btn-group">
        <button
          onClick={() => props.update()}
          type="button"
          className="btn btn-primary btn-sm"
          title="Atualizar lista"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
        <button
          onClick={props.focus}
          type="button"
          className="btn btn-primary btn-sm active"
          title="Adicionar nova tarefa"
        >
          <i className="bi bi-file-earmark-plus"></i>
        </button>
      </div>
    </div>
  );
}

type FormProps = {
  fnc: Function;
};
export function FormIncludeTask(props: FormProps) {
  const [task, setTask] = useState("");
  const [deadline, setDealine] = useState("");
  const include = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      task: task,
      deadline: FormatDateEN(deadline),
    };
    await props.fnc(body);
    return;
  };
  return (
    <form onSubmit={(e) => include(e)}>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Informe o prazo de conclusão
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          onChange={(e) => setDealine(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task" className="form-label">
          Descreva a atividade
        </label>
        <textarea
          className="form-control"
          id="task"
          name="task"
          rows={3}
          onChange={(e) => setTask(e.target.value)}
        ></textarea>
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-plus-square" />
          &nbsp;Cadastrar
        </button>
      </div>
    </form>
  );
}

type ModalProps = {
  tasks: Array<any>;
  id: string;
};
type ModalTask = {
  check: boolean;
  updatedAt: string;
  deadline: string;
  createdAt: string;
  task: string;
}
export function ModalTask(props: ModalProps) {
  const { tasks } = props;
  const [body, setBody] = useState([<></>]);
  useEffect(() => {
    setBody(
      tasks.map((task: ModalTask) => (
        <a
          href="#"
          className="list-group-item list-group-item-action d-flex gap-3 py-3"
          aria-current="true"
        >
          <img
            src="images/task.png"
            alt="twbs"
            width="32"
            height="32"
            className="rounded-circle flex-shrink-0 shadow"
          />
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">
                {task.check ? (
                  <>
                    <span
                      className="d-inline-block bg-primary rounded-circle"
                      style={{ width: ".5em", height: ".5em" }}
                    />
                    &nbsp;{FormatDateBR(task.updatedAt)}
                  </>
                ) : (
                  <>
                    <span
                      className="d-inline-block bg-danger rounded-circle"
                      style={{ width: ".5em", height: ".5em" }}
                    />
                    &nbsp;{FormatDateBR(task.deadline)}
                  </>
                )}
              </h6>
              <p className="mb-0 opacity-75">{task.task}</p>
            </div>
            <small className="opacity-50 text-nowrap">
              <i className="bi bi-info-square" />
              &nbsp;{FormatDateBR(task.createdAt)}
            </small>
          </div>
        </a>
      ))
    );
  }, [props.tasks]);
  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Todas as Atividades
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="list-group">{body}</div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
