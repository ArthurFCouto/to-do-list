import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProvider from '../../../Context';
import Menu from '..';

const ALT = 'X';
const TOHOME = 'To Home';
const LOGIN = 'Login';
const COMPONENT = () => (
    <UserProvider>
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/index' element={<h1 data-testid='Index'>Index</h1>} />
                <Route path='/' element={<h1 data-testid='Home'>Home</h1>} />
                <Route path='/dashboard' element={<h1 data-testid='Dashboard'>Dashboard</h1>} />
            </Routes>
        </BrowserRouter>
    </UserProvider>
);

describe.skip('Testando o componente Menu', () => {

    it('Verificando se o componente é renderizado', () => {
        render(<COMPONENT />);
        const element = screen.getByAltText(ALT);
        expect(element).toBeInTheDocument();
    });

    it('Verificando o link de redirecionamento', () => {
        render(<COMPONENT />);
        const linkToHome = screen.getByTitle(TOHOME);
        fireEvent.click(linkToHome);
        expect(window.location.pathname).toBe('/');
    });

    it('Verificando se é exibida a opção de login por default', () => {
        render(<COMPONENT />);
        const element = screen.getByText(LOGIN);
        expect(element).toBeInTheDocument();
    });
})