import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context';
import { NavItemLogin } from './components';

export default function Menu() {
  const { logged, resetUser } = useContext(UserContext);

  const logout = () => {
    if (resetUser)
      resetUser();
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img
            src='images/icon.png'
            alt='X'
            width='30'
            height='30'
            style={{ borderRadius: '5px' }}
          />
        </Link>
        <Link
          className='navbar-brand'
          to='/'
          title='To Home'
        >
          To do List
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {
              logged && (
                <li className='nav-item'>
                  <Link
                    className='nav-link active'
                    aria-current='page'
                    to='/dashboard'
                    title='To Dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
              )
            }
          </ul>
          <ul className='navbar-nav mb-2 mb-lg-0' style={{ cursor: 'pointer' }}>
            {
              logged
                ? <NavItemLogin text='Sair' clickFunction={() => logout()} />
                : <NavItemLogin text='Login' />
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}