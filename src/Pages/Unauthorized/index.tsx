import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="px-4 py-5 text-center">
        <h4 className="display-5 fw-bold">Você não está logado</h4>
        <img
          src="images/unauthorized.png"
          style={{
            maxWidth: "300px",
            maxHeight: "185px",
            height: "auto",
          }}
          alt="Faça login ou cadastre-se"
          className="mx-auto mb-4"
          loading="lazy"
        />
      <div className="alert alert-danger" role="alert">
        <Link to="/login" className="alert-link">
          Clique aqui
        </Link>
        &nbsp;e faça login para continuar.
      </div>
    </div>
  );
}