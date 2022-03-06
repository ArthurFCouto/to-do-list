import React, { useReducer, useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import { SectionCenterStyled, SectionStyled } from "../../Components/Commom";
import { ButtonModal } from "../../Components/Commom/components";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
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

  const Alert = () => {
    return (
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
    );
  };

  const Login = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("Aguarde, validando seus dados...");
    dispatchAlter({ status: "info" });
    setVisible(true);
    const body = {
      email: email,
      password: password,
    };
    await fetch(`https://apitasklist.herokuapp.com/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        const res = await response.json();
        dispatchAlter({ status: response.status });
        if (response.status === 200) {
          const { user, token } = res;
          if (setUser)
            setUser({
              email: email,
              password: password,
              token,
            });
          setMessage(`Bem vindo (a) ${user.name}! Redirecionando...`);
          setTimeout(() => navigate("/"), 800);
        } else {
          setMessage(`Error: ${res.error}`);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatchAlter({ status: 500 });
        setMessage("Houve um erro inesperado. Tente novamente.");
      });
  };

  return (
    <div className="container">
      <SectionCenterStyled>
        <img
          src="login.png"
          style={{
            maxWidth: "300px",
            height: "auto",
          }}
          alt="Faça login ou cadastre-se"
        />
      </SectionCenterStyled>
      <SectionStyled>
        <h4>Entre com sua conta</h4>
      </SectionStyled>
      <SectionStyled>
        <form onSubmit={(e) => Login(e)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="row mb-3">
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <ButtonModal text="Esqueci a senha" />
            </div>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              lembrar-me
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
              Enviar
            </button>
          </div>
        </form>
      </SectionStyled>
      {visible && Alert()}
    </div>
  );
}
