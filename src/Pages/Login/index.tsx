import React, { useReducer, useState, useContext } from "react";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import api from "../../Services/api";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
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

  const Login = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      email: data.get("email"),
      password: data.get("password"),
      remember: data.get("remember"),
    };
    dispatchAlter({ status: "info" });
    setMessage("Aguarde, validando seus dados...");
    setVisible(true);
    await api
      .post("/session", body, {})
      .then((response) => {
        dispatchAlter({ status: response.status });
        const { user, token } = response.data;
        const newUser = {
          id: user.id,
          email: body.email,
          name: user.name,
          password: body.password,
          token,
        };
        if (setUser) setUser(newUser);
        setMessage(`Bem vindo (a) ${user.name}! Redirecionando...`);
        setCookie(null, "USER_TOKEN", token, {
          maxAge: 604800,
          path: "/",
        });
        if (body.remember)
          setCookie(null, "USER_DATA", JSON.stringify(newUser), {
            maxAge: 604800,
            path: "/",
          });
        setTimeout(() => navigate("/"), 1000);
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
              src="images/login.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Login"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <form onSubmit={(e) => Login(e)}>
              <h1 className="h3 mb-3 fw-normal">Entre com sua conta</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  name="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Manter sessão aberta
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => navigate("/sign-in")}
                >
                  Cadastre-se
                </button>
                <button type="submit" className="btn btn-primary">
                  Entrar
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
            style={{ right: "10px", position: "absolute" }}
            onClick={() => setVisible(false)}
          />
        </div>
      )}
    </div>
  );
}