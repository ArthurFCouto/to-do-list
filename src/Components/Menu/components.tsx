import { Link } from 'react-router-dom';

interface NavItemProps {
  clickFunction?: () => void;
  text: string;
}

export function NavItemLogin({ clickFunction = () => { }, text }: NavItemProps) {
  return (
    <li className='nav-item' onClick={clickFunction}>
      <Link className='nav-link  active' to='/login'>
        <i className='bi bi-people' />
        &nbsp;{text}
      </Link>
    </li>
  );
}