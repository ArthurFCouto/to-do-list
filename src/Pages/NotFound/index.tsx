import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='container col-xxl-8 px-4 py-5'>
      <div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
        <div className='col-10 col-sm-8 col-lg-6 mx-auto'>
          <img
            src='images/404.png'
            className='d-block mx-lg-auto img-fluid'
            alt='Not found'
            width='700'
            height='500'
            loading='lazy'
          />
        </div>
        <div className='col-lg-6'>
          <h1 className='display-5 fw-bold lh-1 mb-3'>Página não encontrada</h1>
          <p className='lead'>
            O endereço que você digitou não existe. Talvez você queira
            acessar uma das páginas abaixo.
          </p>
          <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
            <button
              type='button'
              className='btn btn-primary btn-lg px-4 me-md-2'
              onClick={() => navigate('/')}
              title='Home'
            >
              <i className='bi bi-house' />&nbsp;Home
            </button>
            <button
              type='button'
              className='btn btn-outline-secondary btn-lg px-4'
              onClick={() => navigate('/dashboard')}
              title='Dashboard'
            >
              <i className='bi bi-speedometer2' />&nbsp;Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}