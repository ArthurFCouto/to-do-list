import { SpinnerLoading } from "../../Components/Commom/components";

interface Props {
  children: React.ReactNode;
  func?: () => void;
  id: string;
  idParent: string;
  target: string;
  title: string;
}

interface LineErrorProps {
  colSpan: number;
  statusText?: string;
  loadingText?: string;
  option: "loading" | "error";
};

interface OptionProps {
  status: boolean;
  del: Function;
  up: Function;
};

export function AcordionItem({
  children,
  func,
  id,
  idParent,
  target,
  title,
}: Props) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`${id}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${target}`}
          aria-expanded="false"
          aria-controls={`${target}`}
          onClick={func}
        >
          {title}
        </button>
      </h2>
      <div
        id={`${target}`}
        className="accordion-collapse collapse"
        aria-labelledby={`${id}`}
        data-bs-parent={`#${idParent}`}
      >
        {children}
      </div>
    </div>
  );
}

export function OptionsNotify({ status, del, up }: OptionProps) {
  return (
    <div className="row justify-content-evenly">
      <div className="col-sm">
        <i
          title="Exluir notificação"
          className="bi bi-trash3 m-auto text-danger"
          onClick={() => del()}
        />
      </div>
      <div className="col-sm">
        {status ? (
          <i className="bi bi-check2-all m-auto text-primary" />
        ) : (
          <i
            title="Marcar como lida"
            className="bi bi-check2 m-auto text-danger"
            onClick={() => up()}
          />
        )}
      </div>
    </div>
  );
}

export function OptionsTask({ status, del, up }: OptionProps) {
  return (
    <div className="row justify-content-evenly">
      <div className="col-sm">
        <i
          title="Exluir Tarefa"
          className="bi bi-trash3 m-auto text-danger"
          onClick={() => del()}
        />
      </div>
      <div className="col-sm">
        {status ? (
          <i
            title="Concluída"
            className="bi bi-calendar-check m-auto text-primary"
          />
        ) : (
          <i
            title="Marcar como concluída"
            className="bi bi-calendar m-auto text-danger"
            onClick={() => up()}
          />
        )}
      </div>
    </div>
  );
}

export function LineCustomer(props: LineErrorProps) {
  const statusText = props.statusText
    ? props.statusText
    : "Erro inesperado";
  const loadingText = props.loadingText
    ? props.loadingText
    : "Aguarde enquanto carregamos a lista...";
  const lineError = (
    <tr>
      <th scope="row">0</th>
      <td>Houve um erro durante o carregamento.</td>
      <td colSpan={props.colSpan}>
        <div className="row justify-content-center">
          <div className="col-auto">{statusText}</div>
        </div>
      </td>
    </tr>
  );
  const lineLoading = (
    <tr>
      <th scope="row">
        <SpinnerLoading />
      </th>
      <td colSpan={props.colSpan}>{loadingText}</td>
    </tr>
  );
  return props.option === "loading"
    ? lineLoading
    : lineError;
}

export const iconEmpty = (
  <div className="row justify-content-center">
    <div className="col-auto">
      <i
        title="Sem dados para exibir"
        className="bi bi-exclamation-square m-auto text-danger"
      />
    </div>
  </div>
);