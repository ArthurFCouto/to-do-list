/*
 * Contém comentários com observações sobre o uso do useContext com typescript
 */

import React, { useState, createContext } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
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
    loginUser: (props: User)=> void;
}

export const UserContext = createContext<Partial<Context>>({}); 

// Criação do tipo Props para receber o children
type Props = {
  children: React.ReactNode
}

const UserProvider = ({children}: Props)=> {
  const [user, setUser] = useState<User>();
  const [logged, setLogged] = useState<boolean>(false);
  const { token } = Config;

  const resetUser = () => {
    setLogged(false);
    setUser(undefined);
  }

  const loginUser = (props: User) => {
    destroyCookie(null, token.USER_DATA);
    destroyCookie(null, token.USER_TOKEN);
    setLogged(true);
    setUser(props);
  }
  
  return (
    <UserContext.Provider value={{ user, logged, resetUser, loginUser }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;