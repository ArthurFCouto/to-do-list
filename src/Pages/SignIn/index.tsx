import React, { useReducer, useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import { SectionCenterStyled, SectionStyled } from "../../Components/Commom";

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
          const { token } = res;
          if (setUser)
            setUser({
              email: email,
              password: password,
              token,
            });
          setTimeout(()=>navigate("/"), 800);
        } else {
          setMessage(`Error: ${res.error}`);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatchAlter({ status: 500 });
        setMessage("Houve um erro inesperado, tente mais tarde.");
      });
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
          style={{ 
            right: "10px",
            position: "absolute"
          }}
          onClick={() => setVisible(false)}
        />
      </div>
    );
  };

  const Register = async (e: FormEvent) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setMessage("Aguarde, validando seus dados...");
    dispatchAlter({ status: "info" });
    setVisible(true);
    const body = {
      name: name,
      email: email,
      password: password,
    };
    await fetch(`https://apitasklist.herokuapp.com/user`, {
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
          setMessage(`Bem vindo (a) ${name}! Redirecionando...`);
          Redirect(body);
        } else {
          setMessage(`Error: ${res.error}`);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatchAlter({ status: 500 });
        setMessage("Houve um erro inesperado, tente mais tarde.");
      });
  };

  return (
      <div className="container">
        <SectionCenterStyled>
          <img
            src="signin.png"
            style={{
              maxWidth: "300px",
              height: "auto",
            }}
            alt="Cadastre-se"
          />
        </SectionCenterStyled>
        {
          visible && Alert()
        }
        <SectionStyled>
          <h4>Cadastre-se</h4>
        </SectionStyled>
        <SectionStyled>
          <form onSubmit={(e) => Register(e)}>
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
        </SectionStyled>
      </div>
  );
}
