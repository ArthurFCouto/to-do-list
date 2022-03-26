//Contém comentários com observações para o uso do useContext com typescript
import React, { useState, createContext } from "react";

//Serão variáveis de contexto o user(objeto) e setUser(função)

//Definição da interface(modelo) que será o objeto user
interface User {
    id: number | null
    email: string | null;
    name: string | null;
    password: string | null;
    token: string | null;
};

//Definição do tipo do contexto, informando as variáveis/funções que poderão ser acessadas
type Context = {
    user: User;
    setUser: React.Dispatch<any>;
}

//Feita a exportação do contexto com o tipo definido acima (o uso do Partial é para criar um contexto nulo/vazio)
export const UserContext = createContext<Partial<Context>>({}); 

//Criação do tipo props para poder receber o children
type Props = {
  children: React.ReactNode
}

function UserProvider({children}: Props) {
  //Como foi utilizado o Partial, ao acessar as variáveis do contexto é preciso verificar se não são nulas
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;