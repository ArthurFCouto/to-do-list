import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Activities, Breadcumb, CardBody, FormIncludeTask, ModalTask } from './components';
import AlertToast from '../../Components/AlertToast';
import NotificationToast from '../../Components/NotificationToast';
import { AlertError, AlertReducer } from './functions';
import { BodyTask, Task } from './types';
import Api from '../../Service';

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [taskPending, setTaskPending] = useState<Array<Task>>([]);
  const [taskCompleted, setTaskCompleted] = useState<Array<Task>>([]);
  const initialAlertProps = {
    show: true,
    message: 'Aguarde enquanto carregamos as atividades...',
    error: '',
    level: 'info',
  };
  const [alert, alterAlert] = useReducer(AlertReducer, initialAlertProps);

  const taskMap = (
    tasks: Array<Task>,
    status: 'pending' | 'completed',
    limit: number
  ) =>
    tasks
      .slice(0, limit)
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
          setAlert={(error: any, message: string)=> AlertError(error, message, alterAlert)}
        />
      ));

  const fillTasks = async () => {
    const response = await Api.init('task').get();
    if (!response.error) {
      const { data } = response;
      setTaskCompleted(data.filter((task: Task) => task.check));
      setTaskPending(data.filter((task: Task) => !task.check));
      alterAlert({ display: false });
    } else {
      AlertError(response, 'Ops. Houve um erro ao carregar as atividades.', alterAlert);
    }
  }

  const include = async (body: BodyTask) => {
    window.scrollTo(0, 0);
    alterAlert({
      display: true,
      message: 'Aguarde, cadastrando atividade...',
      error: '',
      level: 'info',
    });
    const { task, deadline } = body;
    const response = await Api.init('task').post({ task, deadline });
    if (!response.error) {
      alterAlert({
        display: true,
        message: 'Atividade cadastrada com sucesso!',
        error: '',
        level: 'success',
      });
      fillTasks();
    } else {
      AlertError(response, 'Ops. Houve um erro ao cadastrar atividade.', alterAlert);
    }
  }

  const level = useMemo(() => alert.level, [alert]);
  const taskModal = useMemo(() => taskPending.concat(taskCompleted), [taskPending, taskCompleted]);

  useEffect(() => {
    fillTasks();
  }, []);

  return (
    <div className='container'>
      <Breadcumb
        title='To-do-list'
        subTitle='Since 2022'
        update={() => fillTasks()}
        focus={() => {
          if (formRef.current)
            formRef.current.scrollIntoView();
        }}
      />
      <div className='my-3 p-3 bg-body rounded shadow-sm'>
        <h6 className='border-bottom pb-2 mb-0'>
          Atividades Pendentes ({taskPending.length})
        </h6>
        {
          taskPending.length > 0
            ? taskMap(taskPending, 'pending', 3)
            : <CardBody>Não há atividades para exibir.</CardBody>
        }
        {
          taskPending.length > 3 && (
            <small className='d-block text-end mt-3'>
              <button
                type='button'
                className='btn btn-link btn-sm'
                data-bs-toggle='modal'
                data-bs-target='#customModal'
              >
                Ver todas
              </button>
            </small>
          )
        }
      </div>
      <div className='my-3 p-3 bg-body rounded shadow-sm'>
        <h6 className='border-bottom pb-2 mb-0'>Atividades Concluídas</h6>
        {
          taskCompleted.length > 0
            ? taskMap(taskCompleted, 'completed', 5)
            : <CardBody>Não há atividades para exibir.</CardBody>
        }
      </div>
      <div
        className='my-3 p-3 bg-body rounded shadow-sm'
        id='form'
        ref={formRef}
      >
        <FormIncludeTask include={(body: BodyTask) => include(body)} />
      </div>
      <NotificationToast />
      <AlertToast
        show={alert.show}
        close={() => alterAlert({ display: false })}
        message={`${alert.message} ${alert.error}`}
        level={level}
      />
      <ModalTask
        id={'customModal'}
        tasks={taskModal}
      />
    </div>
  );
}