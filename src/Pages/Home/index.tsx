import React, {
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { SectionStyled } from "../../Components/Commom/styles";
import { Activities, Breadcumb, CardBody, FormIncludeTask } from "./components";
import api from "../../Services/api";
import { UserContext } from "../../Context";

type Task = {
  check: boolean;
  createdAt: string;
  deadline: string;
  id: number;
  task: string;
};

type BodyInclude = {
  task: string;
  deadline: Date;
};

export default function Home() {
  const { user: userContext } = useContext(UserContext);
  const headers = {
    Authorization: `Bearer ${userContext?.token}`,
  };
  const [taskPending, setTaskPending] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [alert, dispatchAlert] = useReducer(Alert, {
    show: true,
    message: "Aguarde enquanto carregamos as atividades...",
    error: "",
  });
  function Alert(state: any, action: any) {
    switch (action.display) {
      case true:
        return {
          show: true,
          message: action.message,
          error: action.error,
        };
      case false:
        return {
          show: false,
          message: "",
          error: "",
        };
      default:
        throw new Error();
    }
  }
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
        });
        FillTasks();
      })
      .catch((error) => {
        dispatchAlert({
          display: true,
          message: "Ops. Houve um erro ao cadastrar atividade.",
          error: String(error.response),
        });
      });
  }
  async function FillTasks() {
    await api
      .get("/task", {
        headers,
      })
      .then((response) => {
        dispatchAlert({ display: false });
        const res = response.data;
        setTaskCompleted(res.filter((task: Task) => task.check));
        setTaskPending(res.filter((task: Task) => !task.check));
      })
      .catch((error) => {
        console.log(error);
        dispatchAlert({
          display: true,
          message: "Ops. Houve um erro ao carregar as atividades.",
          error: String(error),
        });
      });
  }
  useLayoutEffect(() => {
    FillTasks();
  }, []);

  return (
    <>
      <main className="container">
        {alert.show && (
          <SectionStyled>
            <CardBody border="border-danger">
              {alert.message}
              {alert.error != "" && (
                <>
                  <br />
                  {alert.error}
                </>
              )}
            </CardBody>
          </SectionStyled>
        )}
        <Breadcumb
          title="To-do-list"
          subTitle="Since 2022"
          update={() => FillTasks()}
        />
        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">
            Atividades Pendentes ({taskPending.length})
          </h6>
          {taskPending.length > 0
            ? taskPending
                .slice(0, 4)
                .map((task: any) => (
                  <Activities
                    key={task.id}
                    checkTask={task.check}
                    conclude={(id: number) => Conclude(id)}
                    create={task.createdAt}
                    deadline={task.deadline}
                    exclude={(id: number) => Exclude(id)}
                    id={task.id}
                    status="pending"
                    task={task.task}
                    updatedAt={task.updatedAt}
                  />
                ))
            : alert.error === "" && (
                <CardBody>Não há atividades pendentes.</CardBody>
              )}
          <small className="d-block text-end mt-3">
            <a href="#">Todas as Atividades</a>
          </small>
        </div>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-0">Concluidas</h6>
          {taskCompleted.length > 0
            ? taskCompleted
                .slice(0, 5)
                .map((task: any) => (
                  <Activities
                    key={task.id}
                    checkTask={task.check}
                    conclude={(id: number) => Conclude(id)}
                    create={task.createdAt}
                    deadline={task.deadline}
                    exclude={(id: number) => Exclude(id)}
                    id={task.id}
                    status="completed"
                    task={task.task}
                    updatedAt={task.updatedAt}
                  />
                ))
            : alert.error === "" && (
                <CardBody>Não há atividades completas.</CardBody>
              )}
          {taskCompleted.length > 5 && (
            <small className="d-block text-end mt-3">
              <a href="#">Todas as Atividades</a>
            </small>
          )}
        </div>
        <div className="my-3 p-3 bg-body rounded shadow-sm" id="form">
          <FormIncludeTask fnc={(body: BodyInclude) => Include(body)} />
        </div>
      </main>
    </>
  );
}
