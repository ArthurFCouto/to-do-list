import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import Alert from '..';

const SHOW = true;
const MESSAGE = 'Teste';
const LEVEL = 'danger';
const ACTION = jest.fn();

const COMPONENT = ({ show, close, message, level }) => {
    return <Alert
        show={show}
        close={close}
        message={message}
        level={level}
    />
};

describe('Testando o componente Alert', () => {

    it('Verificando se o componente é renderizado', () => {
        render(<COMPONENT show={SHOW} message={MESSAGE} level={LEVEL} close={ACTION} />);
        const element = screen.getByText(MESSAGE);
        expect(element).toBeInTheDocument();
    });

    it('Verificando se a função close é repassada', () => {
        render(<COMPONENT show={SHOW} message={MESSAGE} level={LEVEL} close={ACTION} />);
        const button = screen.getByTitle('Close');
        fireEvent.click(button);
        expect(ACTION).toBeCalled()
    });

    it('Verificando se o alerta é removido ao alterar a propriedade show', async () => {
        render(<COMPONENT show={false} message={MESSAGE} level={LEVEL} close={ACTION} />);
        const element = screen.queryByText(MESSAGE);
        expect(element).not.toBeInTheDocument();
    });

})