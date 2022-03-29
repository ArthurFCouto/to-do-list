import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Activities,
  Breadcumb,
  CardBody,
  FormIncludeTask,
  ModalTask,
} from "./components";
import api from "../../Services/api";
import { UserContext } from "../../Context";
import AlertToast from "../../Components/AlertToast";
import NotificationToast from "../../Components/NotificationToast";

type Task = {
  check: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  id: number;
  task: string;
};

type BodyInclude = {
  task: string;
  deadline: Date;
};

export default function Home() {
  const form = useRef<any>(null);
  const { user: userContext } = useContext(UserContext);
  const headers = { Authorization: `Bearer ${userContext?.token}` };
  const [taskPending, setTaskPending] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [alert, dispatchAlert] = useReducer(Alert, {
    show: true,
    message: "Aguarde enquanto carregamos as atividades...",
    error: "",
    level: "info",
  });
  function Alert(state: any, action: any) {
    switch (action.display) {
      case true:
        return {
          show: true,
          message: action.message,
          error: action.error,
          level: action.level,
        };
      case false:
        return {
          show: false,
          message: "",
          error: "",
          level: "info",
        };
      default:
        throw new Error();
    }
  }
  const taskMap = (
    tasks: Array<Task>,
    status: "pending" | "completed",
    slice: number
  ) =>
    tasks
      .slice(0, slice)
      .map((task: Task) => (
        <Activities
          key={task.id}
          checkTask={task.check}
          conclude={(id: number) => Conclude(id)}
          create={task.createdAt}
          deadline={task.deadline}
          exclude={(id: number) => Exclude(id)}
          id={task.id}
          status={status}
          task={task.task}
          updatedAt={task.updatedAt}
        />
      ));
  const errorCatch = (error: any, message: string) => {
    const { statusText, data } = error.response;
    dispatchAlert({
      display: true,
      message: message,
      error: `${statusText} - ${data.error}`,
      level: "danger",
    });
  };
  async function Conclude(id: number) {
    return await api
      .put(
        `/task/${id}`,
        {},
        {
          headers,
        }
      )
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        return error;
      });
  }
  async function Exclude(id: number) {
    return await api
      .delete(`/task/${id}`, {
        headers,
      })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        return error;
      });
  }
  async function Include(body: BodyInclude) {
    dispatchAlert({
      display: true,
      message: "Aguarde, cadastrando atividade...",
      error: "",
      level: "info",
    });
    window.scrollTo(0, 0);
    await api
      .post(`/task`, body, {
        headers,
      })
      .then(() => {
        dispatchAlert({
          display: true,
          message: "Atividade cadastrada com sucesso!",
          error: "",
          level: "success",
        });
        FillTasks();
      })
      .catch((error) => {
        errorCatch(error, "Ops. Houve um erro ao cadastrar atividade.");
      });
  }
  async function FillTasks() {
    await api
      .get("/task", {
        headers,
      })
      .then((response) => {
        const res = response.data;
        setTaskCompleted(res.filter((task: Task) => task.check));
        setTaskPending(res.filter((task: Task) => !task.check));
        dispatchAlert({ display: false });
      })
      .catch((error) => {
        errorCatch(error, "Ops. Houve um erro ao carregar as atividades.");
      });
  }
  useLayoutEffect(() => {
    FillTasks();
  }, []);

  return (
    <div className="container">
      <Breadcumb
        title="To-do-list"
        subTitle="Since 2022"
        update={() => FillTasks()}
        focus={() => {
          form.current.scrollIntoView();
        }}
      />
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">
          Atividades Pendentes ({taskPending.length})
        </h6>
        {taskPending.length > 0 ? (
          taskMap(taskPending, "pending", 3)
        ) : (
          <CardBody>Não há atividades para exibir.</CardBody>
        )}
        <small className="d-block text-end mt-3">
          <button
            type="button"
            className="btn btn-link btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Ver todas
          </button>
        </small>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Atividades Concluídas</h6>
        {taskCompleted.length > 0 ? (
          taskMap(taskCompleted, "completed", 5)
        ) : (
          <CardBody>Não há atividades para exibir.</CardBody>
        )}
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm" id="form" ref={form}>
        <FormIncludeTask fnc={(body: BodyInclude) => Include(body)} />
      </div>
      <NotificationToast />
      <AlertToast
        show={alert.show}
        close={() => dispatchAlert({ display: false })}
        message={`${alert.message} ${alert.error}`}
        level={alert.level}
      />
      <ModalTask
        id={"staticBackdrop"}
        tasks={taskPending.concat(taskCompleted)}
      />
    </div>
  );
}
