const recovery = (
  <>
    <div className="mb-3 row">
      <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
        Email
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          readOnly
          className="form-control-plaintext"
          id="staticEmail"
          value="email@example.com"
        />
      </div>
    </div>
    <div className="mb-3 row">
      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
        Password
      </label>
      <div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword" />
      </div>
    </div>
  </>
);

export default function Modal() {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Esqueci a senha
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Ainda em implementação
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button type="button" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
