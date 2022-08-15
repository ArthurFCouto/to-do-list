import { useReducer, useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context';
import { AlertError, AlterClass, SaveCookie } from '../../Util';
import Api from '../../Service';
import Config from '../../Config';

export default function SignIn() {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const initialAlertProps = {
    class: 'alert-primary',
    aria: 'Info:',
    icon: '#info-fill',
    message: '',
  };
  const [alertProps, alterAlertProps] = useReducer(AlterClass, initialAlertProps);

  const redirect = async (email: string, password: string) => {
    const response = await Api.init('session').post({ email, password });
    const { data, status } = response;
    if (!response.error) {
      const { user: { id, name }, token } = data;
      alterAlertProps({
        status,
        message: `Bem vindo (a) ${name}!`,
      });
      const user = {
        id,
        email,
        name,
        password,
        token,
      };
      if (loginUser)
        loginUser(user);
      await SaveCookie(Config.token.USER_TOKEN, token);
      await SaveCookie(Config.token.USER_DATA, JSON.stringify(user));
      navigate('/');
    } else {
      AlertError(response, alterAlertProps);
    }
  }

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const name = String(formData.get('name'));
    alterAlertProps({
      status: 100,
      message: 'Aguarde, validando seus dados...',
    })
    setShowAlert(true);
    const response = await Api.init('user').post({
      name,
      email,
      password
    });
    if (!response.error)
      redirect(email, password);
    else
      AlertError(response, alterAlertProps);
  };

  return (
    <div className='container'>
      <div className='col-xxl-8 px-4 py-5'>
        <div className='row flex-lg-row-reverse align-items-center g-5'>
          <div className='col-10 col-sm-8 col-lg-6 mx-auto'>
            <img
              src='images/signin.png'
              className='d-block mx-lg-auto img-fluid'
              alt='Cadastre-se'
              width='700'
              height='500'
              loading='lazy'
            />
          </div>
          <div className='col-lg-6'>
            <form onSubmit={(e) => register(e)}>
              <h1 className='h3 mb-3 fw-normal'>Cadastre-se</h1>
              <div className='row mb-3'>
                <label htmlFor='name' className='col-sm-2 col-form-label'>
                  Nome
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    required
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>
                  Email
                </label>
                <div className='col-sm-10'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    required
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <label htmlFor='password' className='col-sm-2 form-label'>
                  Senha
                </label>
                <div className='col-sm-10'>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    required
                  />
                </div>
              </div>
              <div className='mb-3 form-text' style={{ textAlign: 'end' }}>
                Fique tranquilo, nunca compartilharemos seus dados.
              </div>
              <div
                style={{
                  display: 'flex',
                  columnGap: '10px',
                  justifyContent: 'flex-end',
                }}
              >
                <button type='reset' className='btn btn-light' title='Limpar'>
                  Limpar
                </button>
                <button type='submit' className='btn btn-primary' title='Cadastrar'>
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {
        showAlert && (
          <div
            className={`alert ${alertProps.class} d-flex align-items-center`}
            role='alert'
            style={{ position: 'relative' }}
          >
            <svg
              className='bi flex-shrink-0 me-2'
              width='24'
              height='24'
              role='img'
              aria-label={alertProps.aria}
            >
              <use xlinkHref={alertProps.icon} />
            </svg>
            <div>{alertProps.message}</div>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              title='Close'
              style={{
                right: '10px',
                position: 'absolute',
              }}
              onClick={() => setShowAlert(false)}
            />
          </div>
        )
      }
    </div>
  );
}