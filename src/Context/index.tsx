/*
 * Contém comentários com observações sobre o uso do useContext com typescript
 */

import React, { useState, createContext, useLayoutEffect } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import Config from '../Config';

/*
 * Serão variáveis de contexto o user(objeto) e setUser(função)
 *
 * Primeiro é definido a interface do objeto USER
 * Logo após a definição do tipo de contexto, onde é apontado as variáveis/funções que serão acessadas
 * Depois é feita a exportação do contexto, é usado o Partial para criar um contexto nulo/vazio
 * Como foi criado um oontexto nulo, ao acessar as variáveis do contexto é preciso verificar a integridade do conteúdo
 * 
 */

interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  token: string;
};

type Context = {
  user: User;
  logged: boolean;
  resetUser: () => void;
  loginUser: (props: User) => void;
}

export const UserContext = createContext<Partial<Context>>({});

// Criação do tipo Props para receber o children
type Props = {
  children: React.ReactNode
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [logged, setLogged] = useState<boolean>(false);
  const { token } = Config;

  const resetUser = () => {
    setLogged(false);
    setUser(undefined);
    destroyCookie(null, token.USER_DATA);
    destroyCookie(null, token.USER_TOKEN);
  }

  const loginUser = (props: User) => {
    setLogged(true);
    setUser(props);
  }

  /*
   * Como o site foi desenvolvido com o intuito educacional e de aprendizado,
   * a senha está sendo salva no cookie sem criptografia. Em um ambiente profissional
   * seria adotada outra estratégia.
   */
  useLayoutEffect(() => {
    try {
      const cookies = parseCookies();
      if (cookies.USER_DATA)
        loginUser(JSON.parse(cookies.USER_DATA));
      else
        resetUser();
    } catch (error) {
      console.log('Erro ao recuperar dados do User', error);
      resetUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, logged, resetUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;