interface AlertProps {
  show: boolean;
  close: () => void;
  message: string;
  level: 'info' | 'success' | 'warning' | 'danger';
};

export default function AlertToast(props: AlertProps) {
  const { close, level, message, show } = props;
  const bgColorList = {
    'info': 'bg-info',
    'success': 'bg-success text-white',
    'warning': 'bg-warning',
    'danger': 'bg-danger text-white'
  };
  const bgColor = bgColorList[level] || bgColorList['info'];

  return show
    ? <div className='position-fixed bottom-0 start-50 translate-middle-x p-3' style={{ zIndex: 11 }}>
      <div className={`rounded shadow ${bgColor}`}>
        <div className='d-flex'>
          <div className='toast-body'>{message}</div>
          <button
            onClick={() => close()}
            type='button'
            className='btn-close me-2 m-auto'
            title='Close'
          ></button>
        </div>
      </div>
    </div>
    : <></>
    ;
}