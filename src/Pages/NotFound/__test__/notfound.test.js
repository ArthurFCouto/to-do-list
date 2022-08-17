import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '..';

const TEXT = 'Página não encontrada';
const PAGE = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1 data-testid='Home'>Home</h1>} />
            <Route path='/dashboard' element={<h1 data-testid='Dashboard'>Dashboard</h1>} />
            <Route path='/not-found' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

describe.skip('Testando a página NotFound', () => {
    beforeEach(() => {
        const history = createBrowserHistory();
        history.push('/not-found');
    });

    it('Verificando se a página é renderizada', () => {
        render(<PAGE />);
        const h1Element = screen.getByText(TEXT);
        expect(h1Element).toBeInTheDocument();
    });

    it('Verificando se o botão Home é renderizado', () => {
        render(<PAGE />);
        const buttonHome = screen.getByTitle('Home');
        expect(buttonHome).toBeInTheDocument();
    });

    it('Verificando se o botão Dashboard é renderizado', () => {
        render(<PAGE />);
        const buttonDash = screen.getByTitle('Dashboard');
        expect(buttonDash).toBeInTheDocument();
    });

    it('Verificando se a página é removida ao clicar no botão Home', () => {
        render(<PAGE />);
        const buttonHome = screen.getByTitle('Home');
        fireEvent.click(buttonHome);
        expect(window.location.pathname).toBe('/');
    });

    beforeEach(() => {
        const history = createBrowserHistory();
        history.push('/not-found');
    });

    it('Verificando se a página é removida ao clicar no botão Dashboard', () => {
        render(<PAGE />);
        const buttonDash = screen.getByTitle('Dashboard');
        fireEvent.click(buttonDash);
        expect(window.location.pathname).toBe('/dashboard');
    });
})