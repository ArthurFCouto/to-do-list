import { Link } from "react-router-dom";

interface NavItemProps {
  func?: () => void;
  text: string;
}

export function NavItemLogin({ func, text }: NavItemProps) {
  return (
    <li className="nav-item" onClick={func}>
      <Link className="nav-link  active" to="/login">
        <i className="bi bi-people" />
        &nbsp;{text}
      </Link>
    </li>
  );
}