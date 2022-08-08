import { useReducer, useState, useContext, FormEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import { AlertError, AlterClass, SaveCookie } from "./functions";
import Api from "../../Service";
import { ServiceResponse } from "../../Service/types";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const initialAlertProps = {
    class: "alert-primary",
    aria: "Info:",
    icon: "#info-fill",
    message: "",
  };
  const [alertProps, alterAlertProps] = useReducer(AlterClass, initialAlertProps);
  const alertRef = useRef<HTMLButtonElement>(null);

  const redirect = async (response: ServiceResponse, email: string, password: string, remember: string) => {
    const { user, token } = response.data;
    const newUser = {
      id: user.id,
      email,
      name: user.name,
      password,
      token,
    };
    if (loginUser)
      loginUser(newUser);
    alterAlertProps({
      status: response.status,
      message: `Bem vindo (a) ${user.name}! Redirecionando...`,
    });
    await SaveCookie("USER_TOKEN", token);
    if (remember === "on")
      await SaveCookie("USER_DATA", JSON.stringify(newUser));
    navigate("/");
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      email: String(data.get("email")),
      password: String(data.get("password")),
      remember: String(data.get("remember")),
    };
    alterAlertProps({
      status: 100,
      message: "Aguarde, validando seus dados...",
    });
    setShowAlert(true);
    const response = await Api.init().session().post({
      email: body.email,
      password: body.password
    });
    if (!response.error)
      redirect(response, body.email, body.password, body.remember);
    else
      AlertError(response, alterAlertProps);
  }

  useEffect(() => {
    alertRef.current!.focus();
  }, [alertProps]);

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
            <form onSubmit={(e) => login(e)}>
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
                  defaultChecked={true}
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
      {
        showAlert && (
          <div
            className={`alert ${alertProps.class} d-flex align-items-center`}
            role="alert"
            style={{ position: "relative" }}
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label={alertProps.aria}
            >
              <use xlinkHref={alertProps.icon} />
            </svg>
            <div>{alertProps.message}</div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              style={{ right: "10px", position: "absolute" }}
              onClick={() => setShowAlert(false)}
              ref={alertRef}
            />
          </div>
        )
      }
    </div>
  );
}