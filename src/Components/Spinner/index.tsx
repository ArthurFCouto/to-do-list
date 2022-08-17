interface SpinnerProps {
    color?: 'text-primary' | 'text-light' | 'text-success';
};

export default function Spinner(props: SpinnerProps) {
    const { color } = props;
    return (
        <div className='d-flex justify-content-center'>
            <div
                className={'spinner-border spinner-border-sm ' + (color || 'text-primary')}
                role='status'
                data-testid={`${color || 'text-primary'}`}
            >
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    );
};