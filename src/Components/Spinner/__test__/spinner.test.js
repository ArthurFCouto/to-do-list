import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Spinner from '..';

const PRIMARY = 'text-primary';
const LIGHT = 'text-light';
const COMPONENT = ({color}) => (
    <Spinner color={color}/>
);

describe.skip('Testando o componente Spinner', () => {

    it('Verificando se o componente é renderizado, e verificando sua cor padrão', () => {
        render(<COMPONENT />);
        const element = screen.getByTestId(PRIMARY);
        expect(element).toBeInTheDocument();
    });

    it('Verificando se o componente é renderizado com a cor enviada', () => {
        render(<COMPONENT color={LIGHT}/>);
        const element = screen.getByTestId(LIGHT);
        expect(element).toBeInTheDocument();
    });
})