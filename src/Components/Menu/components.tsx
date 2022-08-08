import { Link } from "react-router-dom";

interface NavItemProps {
  clickFunction?: () => void;
  text: string;
}

export function NavItemLogin({ clickFunction = ()=> {}, text }: NavItemProps) {
  return (
    <li className="nav-item" onClick={ clickFunction }>
      <Link className="nav-link  active" to="/login">
        <i className="bi bi-people" />
        &nbsp;{ text }
      </Link>
    </li>
  );
}

export function ToggleIcon() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  )
}