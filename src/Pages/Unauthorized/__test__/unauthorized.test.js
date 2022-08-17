import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Unauthorized from '..';

const TEXT = 'Você não está logado';
const PAGE = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<h1 data-testid='Login'>Login</h1>} />
            <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
    </BrowserRouter>
);

describe.skip('Testando a página Unauthorized', () => {
    beforeEach(() => {
        const history = createBrowserHistory();
        history.push('/unauthorized');
    });

    it('Verificando se a página é renderizada', () => {
        render(<PAGE />);
        const h4Element = screen.getByText(TEXT);
        expect(h4Element).toBeInTheDocument();
    });

    it('Verificando se o link para redirecionamento é renderizado', () => {
        render(<PAGE />);
        const buttonLogin = screen.getByTitle('Login');
        expect(buttonLogin).toBeInTheDocument();
    });

    it('Verificando se o link para login está funcionando', () => {
        render(<PAGE />);
        const buttonLogin = screen.getByTitle('Login');
        fireEvent.click(buttonLogin);
        expect(window.location.pathname).toBe('/login');
    });
})