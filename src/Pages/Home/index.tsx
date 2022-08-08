import React, {
  useEffect,
  useMemo,
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
import AlertToast from "../../Components/AlertToast";
import NotificationToast from "../../Components/NotificationToast";
import TaskService from "../../Service/TaskService";

interface Task {
  id: number;
  check: boolean;
  createdAt: string;
  deadline: Date;
  task: string;
  updatedAt: string;
};

type BodyTask = Omit<Task, 'id' | 'check' | 'createdAt' | 'updatedAt' >;

export default function Home() {
  const form = useRef<any>(null);
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
      .map((task: Task, index: number) => (
        <Activities
          key={index}
          id={task.id}
          check={task.check}
          create={task.createdAt}
          deadline={task.deadline}
          status={status}
          task={task.task}
          updatedAt={task.updatedAt}
        />
      ));

  const errorCatch = (error: any, message: string) => {
    const { statusText, data } = error;
    dispatchAlert({
      display: true,
      message: message,
      error: `${statusText} - ${data.error}`,
      level: "danger",
    });
  };

  const level = useMemo(()=> alert.level, [alert]);
  const taskModal = useMemo(()=> taskPending.concat(taskCompleted), [taskPending, taskCompleted]);

  async function Include(body: BodyTask) {
    dispatchAlert({
      display: true,
      message: "Aguarde, cadastrando atividade...",
      error: "",
      level: "info",
    });
    window.scrollTo(0, 0);
    const response = await TaskService.save(body.task, body.deadline);
    if(response.status === 200) {
      dispatchAlert({
        display: true,
        message: "Atividade cadastrada com sucesso!",
        error: "",
        level: "success",
      });
      FillTasks();
    } else
      errorCatch(response, "Ops. Houve um erro ao cadastrar atividade.");
  }

  async function FillTasks() {
    const response = await TaskService.getAll();
    if(response.status === 200) {
      const { data } = response;
      setTaskCompleted(data.filter((task: Task) => task.check));
      setTaskPending(data.filter((task: Task) => !task.check));
      dispatchAlert({ display: false });
    } else
      errorCatch(response, "Ops. Houve um erro ao carregar as atividades.");
  }

  useEffect(() => {
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
        {
          taskPending.length > 0
          ? taskMap(taskPending, "pending", 3)
          : <CardBody>Não há atividades para exibir.</CardBody>
        }
        {
          taskPending.length > 0 && (
            <small className="d-block text-end mt-3">
              <button
                type="button"
                className="btn btn-link btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#customeModal"
              >
                Ver todas
              </button>
            </small>
        )}
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Atividades Concluídas</h6>
        {
          taskCompleted.length > 0
            ? taskMap(taskCompleted, "completed", 5)
            : <CardBody>Não há atividades para exibir.</CardBody>
        }
      </div>
      <div
        className="my-3 p-3 bg-body rounded shadow-sm"
        id="form"
        ref={form}
      >
        <FormIncludeTask include={(body: BodyTask) => Include(body)} />
      </div>
      <NotificationToast />
      <AlertToast
        show={alert.show}
        close={() => dispatchAlert({ display: false })}
        message={`${alert.message} ${alert.error}`}
        level={level}
      />
      <ModalTask
        id={"customeModal"}
        tasks={taskModal}
      />
    </div>
  );
}