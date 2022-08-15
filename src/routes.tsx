import { useContext } from 'react';
import { UserContext } from './Context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import SignIn from './Pages/SignIn';
import Unauthorized from './Pages/Unauthorized';
import Menu from './Components/Menu';

/* Conferir a documentação do react-router-dom
 * https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
 */

const FullRoutes = () => {
  const { logged } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={ logged ? <Home /> : <Unauthorized /> } />
        <Route path='/dashboard' element={ logged ? <Dashboard /> : <Unauthorized /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/sign-in' element={ <SignIn /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default FullRoutes;