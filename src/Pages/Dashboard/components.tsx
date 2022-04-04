import { SpinnerLoading } from "../../Components/Commom/components";

type Props = {
  children: React.ReactNode;
  func?: () => void;
  id: string;
  idParent: string;
  target: string;
  title: string;
};

export function AcordionItem({
  children,
  func,
  id,
  idParent,
  target,
  title,
}: Props) {
  const test = (
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
          Accordion Item #1
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      ></div>
    </div>
  );
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

type OptionProps = {
  status: boolean;
  del: Function;
  up: Function;
};
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
            className="bi bi-check2 m-auto text-success"
            onClick={() => up()}
          />
        )}
      </div>
    </div>
  );
}

type OptionTaskProps = {
  status: boolean;
  del: Function;
  check: Function;
};
export function OptionsTask({ status, del, check }: OptionTaskProps) {
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
            className="bi bi-calendar m-auto text-success"
            onClick={() => check()}
          />
        )}
      </div>
    </div>
  );
}

type LineErrorProps = {
  colSpan: number;
  statusText?: string;
  loadingText?: string;
  option: "loading" | "error";
};
export function LineCustomer(props: LineErrorProps) {
  const statusText = props.statusText ? props.statusText : "Erro inesperado";
  const lineError = (
    <tr key={0}>
      <th scope="row">0</th>
      <td>Houve um erro durante o carregamento.</td>
      <td colSpan={props.colSpan}>
        <div className="row justify-content-center">
          <div className="col-auto">{statusText}</div>
        </div>
      </td>
    </tr>
  );
  const loadingText = props.loadingText
    ? props.loadingText
    : "Aguarde enquanto carregamos a lista...";
  const lineLoading = (
    <tr key={0}>
      <th scope="row">
        <SpinnerLoading />
      </th>
      <td colSpan={props.colSpan}>{loadingText}</td>
    </tr>
  );
  return props.option === "loading" ? lineLoading : lineError;
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
