import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from '..';

const TEXT = 'Cadastre-se';
const NAME = 'Admin Admin';
const EMAIL = 'admin@admin.com';
const PASSWORD = '12345678';
const PAGE = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1 data-testid='Home'>Home</h1>} />
            <Route path='/sign-in' element={<SignIn />} />
        </Routes>
    </BrowserRouter>
);

describe.skip('Testando a página SignIn', () => {
    beforeEach(() => {
        const history = createBrowserHistory();
        history.push('/sign-in');
    });

    it('Verificando se o form da página é renderizado', () => {
        render(<PAGE />);
        const textElement = screen.getByText(TEXT);
        expect(textElement).toBeInTheDocument();
    });

    it('Verificando se o alerta é ocultado por default', () => {
        render(<PAGE />);
        const alert = screen.queryByRole('alert');
        expect(alert).not.toBeInTheDocument();
    });

    it('Verificando se o alerta é exibido/alterado ao tentar fazer o cadastro', () => {
        render(<PAGE />);
        const button = screen.getByTitle('Cadastrar');
        const inputEmail = screen.getByLabelText('Email');
        const inputName = screen.getByLabelText('Nome');
        const inputPassword = screen.getByLabelText('Senha');
        fireEvent.change(inputEmail, {
            target: {
                value: EMAIL
            }
        });
        fireEvent.change(inputName, {
            target: {
                value: NAME
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

    it.skip('Verificando se é feito o redirecionamento após fazer o cadastro', () => {
        render(<PAGE />);
        const button = screen.getByTitle('Cadastrar');
        const inputEmail = screen.getByLabelText('Email');
        const inputName = screen.getByLabelText('Nome');
        const inputPassword = screen.getByLabelText('Senha');
        fireEvent.change(inputEmail, {
            target: {
                value: 'email@email.com'
            }
        });
        fireEvent.change(inputName, {
            target: {
                value: NAME
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