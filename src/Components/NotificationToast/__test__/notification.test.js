import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotificationToast from '..';

const PRIMARY = 'New alerts';
const COMPONENT = () => (
        <BrowserRouter>
            <NotificationToast />
            <Routes>
                <Route path='/' element={<h1 data-testid='Home'>Home</h1>} />
                <Route path='/dashboard' element={<h1 data-testid='Dashboard'>Dashboard</h1>} />
            </Routes>
        </BrowserRouter>
);

describe.skip('Testando o componente NotificationToast', () => {

    it('Verificando se o componente é renderizado', () => {
        render(<COMPONENT />);
        const element = screen.getByText(PRIMARY);
        expect(element).toBeInTheDocument();
    });
})