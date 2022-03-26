import React, { useReducer, useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import api from "../../Services/api";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alterClass, dispatchAlter] = useReducer(Alter, {
    class: "alert-primary",
    aria: "Info:",
    icon: "#info-fill",
  });

  function Alter(state: any, action: any) {
    switch (action.status) {
      case "info":
        return {
          class: "alert-primary",
          aria: "Info:",
          icon: "#info-fill",
        };
      case 200:
        return {
          class: "alert-success",
          aria: "Success:",
          icon: "#check-circle-fill",
        };
      case 400:
        return {
          class: "alert-warning",
          aria: "Warning:",
          icon: "#exclamation-triangle-fill",
        };
      case 404:
      case 500:
        return {
          class: "alert-danger",
          aria: "Danger:",
          icon: "#exclamation-triangle-fill",
        };
      default:
        throw new Error();
    }
  }

  async function Redirect(body: object) {
    await api
      .post("/session", body, {})
      .then((response) => {
        dispatchAlter({ status: response.status });
        const { user, token } = response.data;
        if (setUser)
          setUser({
            id: user.id,
            email: email,
            name: user.name,
            password: password,
            token,
          });
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        const { status, data } = error.response;
        dispatchAlter({ status });
        setMessage(`Ops! ${data ? data.error : error.response.statusText}`);
      });
  }

  const Register = async (e: FormEvent) => {
    e.preventDefault();
    //window.scrollTo(0, 0);
    setMessage("Aguarde, validando seus dados...");
    dispatchAlter({ status: "info" });
    setVisible(true);
    const body = {
      name: name,
      email: email,
      password: password,
    };
    api
      .post("user", body, {})
      .then((response) => {
        dispatchAlter({ status: response.status });
        setMessage(`Bem vindo (a) ${name}! Redirecionando...`);
        Redirect(body);
      })
      .catch((error) => {
        const { status, data } = error.response;
        dispatchAlter({ status });
        setMessage(`Ops! ${data ? data.error : error.response.statusText}`);
      });
  };

  return (
    <div className="container">
      <div className="col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5">
          <div className="col-10 col-sm-8 col-lg-6 mx-auto">
            <img
              src="images/signin.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Login"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <form onSubmit={(e) => Register(e)}>
              <h1 className="h3 mb-3 fw-normal">Cadastre-se</h1>
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Nome
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="password" className="col-sm-2 form-label">
                  Senha
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 form-text" style={{ textAlign: "end" }}>
                Fique tranquilo, nunca compartilharemos seus dados.
              </div>
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button type="reset" className="btn btn-light">
                  Limpar
                </button>
                <button type="submit" className="btn btn-primary">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {visible && (
        <div
          className={`alert ${alterClass.class} d-flex align-items-center`}
          role="alert"
          style={{ position: "relative" }}
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label={alterClass.aria}
          >
            <use xlinkHref={alterClass.icon} />
          </svg>
          <div>{message}</div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{
              right: "10px",
              position: "absolute",
            }}
            onClick={() => setVisible(false)}
          />
        </div>
      )}
    </div>
  );
}
