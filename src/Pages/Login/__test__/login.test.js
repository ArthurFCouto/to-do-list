/* eslint-disable testing-library/no-node-access */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '..';

const TEXT = 'Entre com sua conta';
const EMAIL = 'admin@admin.com';
const PASSWORD = '12345678';
const PAGE = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1 data-testid='Home'>Home</h1>} />
            <Route path='/sign-in' element={<h1 data-testid='Sign-in'>Sign-in</h1>} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
);

describe.skip('Testando a página Login', () => {
    beforeEach(() => {
        const history = createBrowserHistory();
        history.push('/login');
    });

    it('Verificando se o form da página é renderizado', () => {
        render(<PAGE />);
        const textElement = screen.getByText(TEXT);
        expect(textElement).toBeInTheDocument();
    });

    it('Verificando se o link para o cadastro está funcionando', () => {
        render(<PAGE />);
        const button = screen.getByTitle('Cadastre-se');
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/sign-in');
    });

    it('Verificando se o alerta é ocultado por default', async () => {
        render(<PAGE />);
        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();
    });

    it('Verificando se o alerta é alterado ao tentar fazer login', async () => {
        render(<PAGE />);
        const button = screen.getByTitle('Entrar');
        const inputEmail = screen.getByLabelText('Email');
        const inputPassword = screen.getByLabelText('Password');
        fireEvent.change(inputEmail, {
            target: {
                value: EMAIL
            }
        });
        fireEvent.change(inputPassword, {
            target: {
                value: PASSWORD
            }
        });
        fireEvent.click(button);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });

    it.skip('Verificando se o login está funcionando e redirecionando', () => {
        render(<PAGE />);
        const button = screen.getByTitle('Entrar');
        const inputEmail = screen.getByLabelText('Email');
        const inputPassword = screen.getByLabelText('Password');
        fireEvent.change(inputEmail, {
            target: {
                value: 'arthur_788@hotmail.com'
            }
        });
        fireEvent.change(inputPassword, {
            target: {
                value: PASSWORD
            }
        });
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/');
    });
})