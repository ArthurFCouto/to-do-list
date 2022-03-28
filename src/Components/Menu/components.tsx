import { Link } from "react-router-dom";
type NavItemProps = {
  func?: () => void;
  text: string;
};

export const NavItemLogin = ({ func, text }: NavItemProps) => (
  <li className="nav-item" onClick={func}>
    <Link className="nav-link  active" to="/login">
    <i className="bi bi-people" />&nbsp;{text}
    </Link>
  </li>
);

export const ToggleIcon = ()=> (
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
);
